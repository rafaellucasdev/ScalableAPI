import { Router } from 'express';
import { createCustomer, showCustomers, updateCustomer, deleteCustomer } from './app/controllers/CustomerController';

const router = Router();

router.post('/customers', createCustomer);
router.get('/customers', showCustomers);
router.put('/customers', updateCustomer);
router.delete('/customers', deleteCustomer);

export default router;