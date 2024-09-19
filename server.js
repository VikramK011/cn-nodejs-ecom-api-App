import './env.js'
//1. Import Express
import express from 'express';
import swagger from 'swagger-ui-express'
import { connectToMongoDB } from './src/config/mongoDb.js';

import cors from 'cors';
// import bodyParser from 'body-parser'
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middlware.js';
import cartRouter from './src/features/cart/cart.routes.js';
import apiDocs from './swagger.json' assert {type:'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './error-handler/applicationError.js';
import {connectUsingMongoose} from './src/config/mongooseConfig.js';
import orderRouter from './src/features/order/order.routes.js';
import mongoose from 'mongoose';
import likeRouter from './src/features/Like/like.routes.js';

//2. Create Server


const server= express();



//load all the environment variables in application

// var corsOptions= {
//   origin:'*', 
//   allowedHeaders: 'Content-Type,Authorization',
//   credential: true
// }

server.use(cors());

// CORS policy configuration

// server.use((req, res, next)=>{
//   res.header('Access-Control-Allow-Origin','http://localhost:5500');
//   res.header('Access-Control-Allow-Headers', '*');
//   res.header('Access-Control-Allow-Methods', '*');
//   // return ok for preflight request.
//   if(req.method=="OPTIONS"){
//     return res.sendStatus(200);
//   }
//   next();
// })


server.use(express.json());

//for all request related to product. redirect to product routes

server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
server.use(loggerMiddleware);
server.use('/api/orders', jwtAuth, orderRouter);
server.use('/api/products', productRouter);
server.use('/api/cart', jwtAuth, cartRouter)
server.use('/api/users', userRouter );
server.use('/api/likes', jwtAuth, likeRouter);

//3. Default request handler

server.get('/', (req, res)=>{
  res.send('Welcome to Ecommerce APIs')
})

//error handler middleware

server.use((err, req, res, next)=>{
  console.log(err)

if(err instanceof mongoose.Error.ValidationError){
  return res.status(400).send(err.message);
}

if(err instanceof ApplicationError){
  res.status(err.code).send(err.message);
}
  res.status(500).send('Something went wrong, please try again later')
})

// 4. Middleware to handle 404 request


server.use((req, res)=>{
  res.status(404).send('API Not Found, Please check our documentation for more information at localhost:3550/api-docs')
})

//5. Specify port

server.listen(3550);

console.log('Server is listening at 3550');
connectToMongoDB();
connectUsingMongoose();

