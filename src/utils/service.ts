export enum ResponseStatus {
    BAD_REQUEST = 'BAD_REQUEST',
    NOT_FOUND = 'NOT_FOUND',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
    OK = 'OK',
  }
  
  export interface IResponse {
    status: ResponseStatus
    data?: any[] | any
    message?: string
    errors?: { message: string }[]
    auditorship?: { operation: string; detail: string }
    totalRegisters?: number
  }
  
  const responseStatusMap = new Map()
  
  responseStatusMap.set(403, ResponseStatus.UNAUTHORIZED)
  responseStatusMap.set(404, ResponseStatus.NOT_FOUND)
  responseStatusMap.set(400, ResponseStatus.BAD_REQUEST)
  responseStatusMap.set(500, ResponseStatus.INTERNAL_SERVER_ERROR)
  
  function getErrorMessages(errors: { message: string }[]) {
    if (!errors || !Array.isArray(errors)) return null
    return errors.map((error) => error.message)
  }
  
  function getResponse({
    status,
    data = [],
    message = '',
    errors = [],
    auditorship,
    totalRegisters,
  }: IResponse) {
    return {
      status,
      message,
      data,
      errors: getErrorMessages(errors),
      auditorship,
      totalRegisters,
    }
  }
  
  export { responseStatusMap }
  
  export default {
    ResponseStatus,
    getResponse,
  }
  