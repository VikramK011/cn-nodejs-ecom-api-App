import express from 'express';

import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middlware.js';


//2. Initialize product router.

const userRouter= express.Router();

const userController = new UserController();

//all the paths to controller method


userRouter.post('/signup', (req, res, next)=>{
  userController.signUp(req, res, next)
});

userRouter.post('/signin', (req, res)=>{
  userController.signIn(req, res)
});

userRouter.put('/resetPassword',jwtAuth, (req, res)=>{
  userController.resetPassword(req, res)
});


export default userRouter;