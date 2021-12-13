import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { IResponse, ResponseStatus } from '../../../src/utils/service';
import Customer from '../models/customer';

import * as yup from 'yup';

export const createCustomer = async (
  req: Request,
  res: Response<IResponse>,
): Promise<Response<IResponse>> => {
    const schema = yup.object().shape({
      name: yup.string().required('Necessário preencher o campo nome!'),
      code: yup.string().required('Necessário preencher o campo code!').length(4, 'O código de cliente deve conter 4 números'),
    })
    try {
      await schema.validate(req.body);
      const newCustomer = getRepository(Customer).create(req.body);
      const results = await getRepository(Customer).save(newCustomer);
      return res.json({
        status: ResponseStatus.OK,
        data: results,
        message: 'Cliente criado com sucesso!',
      })
    } catch (err) {
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: String(err),
      })
    }
}

export const showCustomers = async (
  req: Request,
  res: Response<IResponse>,
): Promise<Response<IResponse>> => {
  try {
    const customers = await getRepository(Customer).find()
    return res.json({
      status: ResponseStatus.OK,
      data: customers,
      message: 'Clientes listados com sucesso!',
    })
  } catch (err) {
    return res.status(500).json({
      status: ResponseStatus.INTERNAL_SERVER_ERROR,
      message: String(err),
    })
  }
}

export const updateCustomer = async (
  req: Request,
  res: Response<IResponse>
): Promise<Response<IResponse>> => {
  const schema = yup.object().shape({
    name: yup.string().required('Erro: Necessário preencher o campo nome!'),
    code: yup.string().required('Necessário preencher o campo code!').length(4, 'O código de cliente deve conter 4 números'),
  })

  try {
    await schema.validate(req.body)
    const updatedCustomer = await getRepository(Customer).findOne(
      req.params.id
    )
    if (updatedCustomer) {
      getRepository(Customer).merge(updatedCustomer, req.body)
      const results = await getRepository(Customer).save(updatedCustomer)
      return res.json({
        status: ResponseStatus.OK,
        data: results,
        message: 'Cliente atualizado com sucesso!',
      })
    }

    return res.status(404).json({
      status: ResponseStatus.NOT_FOUND,
      message: 'Cliente não encontrado!',
    })
  } catch (err) {
    return res.status(500).json({
      status: ResponseStatus.INTERNAL_SERVER_ERROR,
      message: String(err),
    })
  }
}

export const deleteCustomer = async (
  req: Request,
  res: Response<IResponse>
): Promise<Response<IResponse>> => {
  try {
    const results = await getRepository(Customer).delete(req.params.id)
    return res.json({
      status: ResponseStatus.OK,
      data: results,
      message: 'Cliente excluído!',
    })
  } catch (err) {
    return res.status(500).json({
      status: ResponseStatus.INTERNAL_SERVER_ERROR,
      message: String(err),
    })
  }
}