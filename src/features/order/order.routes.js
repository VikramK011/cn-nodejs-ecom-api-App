import express from 'express';
import OrderController from './order.controller.js';
import jwtAuth from '../../middlewares/jwt.middlware.js';

//2. Initialize product router.

const orderRouter= express.Router();

const orderController = new OrderController();

orderRouter.post('/', (req, res, next)=>{
  orderController.placeOrder(req, res, next) 
});

export default orderRouter;