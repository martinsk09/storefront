import express, { Request, Response } from 'express';
import { Product, ProductT } from '../models/product';
import jwt from 'jsonwebtoken';

const store = new Product();

const index = async (req: Request, res: Response) => {
  try { 
    const products = await store.index();
  res.json(products);
  }
  catch (err) {
    res.status(500);
    res.json('An error occured. '+err);
    return;
  }
};

const show = async (req: Request, res: Response) => {
  try { 
    const product = await store.show(req.params.id);
  res.json(product);
  }
  catch (err) {
    res.status(500);
    res.json('An error occured. '+err);
    return;
  }
};

const categoryIndex = async (req: Request, res: Response) => {
  try {
    const products = await store.categoryIndex(req.params.id);
  res.json(products);
  }
  catch (err) {
    res.status(500);
    res.json('An error occured. '+err);
    return;
  }
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
    let cats = req.body.category;
    cats.toLowerCase();
    const product: ProductT = {
      name: req.body.name,
      price: req.body.price,
      category: cats
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
  app.get('/products/category/:id', categoryIndex);
};

export default productRoutes;
