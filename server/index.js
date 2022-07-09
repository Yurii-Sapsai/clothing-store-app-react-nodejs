import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';


import * as UserController from './controllers/UserController.js';
import * as ProductController from './controllers/ProductController.js';
import * as CartController from './controllers/CartController.js';
import * as OrderController from './controllers/OrderController.js';

import {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} from "./services/verifyToken.js";


const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.post('/api/auth/register', UserController.register);
app.post('/api/auth/login', UserController.login);
app.put('/api/auth/:id', verifyTokenAndAuthorization, UserController.updateUser);
app.delete('/api/auth/:id', verifyTokenAndAuthorization, UserController.deleteUser);

app.get('/api/users/:id', verifyTokenAndAdmin, UserController.getUser);
app.get('/api/users', verifyTokenAndAdmin, UserController.getAllUsers);
app.get('/api/stats', verifyTokenAndAdmin, UserController.getUsersStats);

app.post('/api/products', verifyTokenAndAdmin, ProductController.createProduct);
app.put('/api/products/:id', ProductController.updateProduct);
app.delete('/api/products/:id', verifyTokenAndAdmin, ProductController.deleteProduct);
app.get('/api/products/:id',  ProductController.getProduct);
app.get('/api/products',  ProductController.getAllProducts);

app.post('/api/cart', verifyToken, CartController.createCart);
app.put('/api/cart/:id', verifyTokenAndAuthorization, CartController.updateCart);
app.delete('/api/cart/:id', verifyTokenAndAuthorization, CartController.deleteCart);
app.get('/api/cart/:id', verifyTokenAndAuthorization, CartController.getUserCart);
app.get('/api/cart', verifyTokenAndAdmin, CartController.getAllCarts);

app.post('/api/order', verifyToken, OrderController.createOrder);
app.put('/api/order/:id', verifyTokenAndAdmin, OrderController.updateOrder);
app.delete('/api/order/:id', verifyTokenAndAdmin, OrderController.deleteOrder);
app.get('/api/order/:id', verifyTokenAndAuthorization, OrderController.getUserOrders);
app.get('/api/order', verifyTokenAndAdmin, OrderController.getAllOrders);
app.get('/api/income', verifyTokenAndAdmin, OrderController.getMonthlyIncome);











mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('db OK!'))
    .catch((err) => console.log('db ERROR!', err))



app.listen(4444, (error) => {
    if (error) {
        return console.log(error);
    }
    console.log("Server start!");
})
