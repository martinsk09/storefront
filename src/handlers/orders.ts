import express, { Request, Response } from 'express';
import { Order, OrderT, OrderProductT } from './../models/order';
import jwt from 'jsonwebtoken';

const store = new Order();

const index = async (req: Request, res: Response) => {
  const orders = await store.orderIndex(req.params.userID);
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const orders = await store.showActive(req.params.userID);
  res.json(orders);
};

const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization; // @ts-ignore
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(
      token,
      // @ts-ignore
      process.env.TOKEN_SECRET
    );
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }

  try {

    const order: OrderT = {
      user_id: req.body.userID,
      status: 'active'
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProducts = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization; // @ts-ignore
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(
      token,
      // @ts-ignore
      process.env.TOKEN_SECRET
    );
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }

  try {
    const orderProduct: OrderProductT = {
      quantity: req.body.quantity,
      orderId: req.params.orderID,
      productId: req.body.productId
    };

    const newOrderProduct = await store.addProduct(orderProduct);
    res.json(newOrderProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:userID/all', index);
  app.get('/orders/:userID', show);
  app.post('/orders/create', create);
  app.post('/users/:userID/orders/:orderID/products', addProducts);
};

export default orderRoutes;
