import express from 'express';
// import  CartController  from './cart.controller.js';
import { CartController } from './cart.controller.js';

const cartRouter = express.Router();

const CartItemController= new CartController();

cartRouter.delete('/:id', (req, res, next)=>{
  CartItemController.delete(req, res , next) });

cartRouter.post('/',  (req, res)=>{
  CartItemController.add(req, res) });

cartRouter.get('/', (req, res)=>{
  CartItemController.get(req, res) })

export default cartRouter;