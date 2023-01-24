import express, { Request, Response } from 'express';
import { User, UserT } from '../models/user';
import jwt from 'jsonwebtoken';

const store = new User();

const index = async (req: Request, res: Response) => {
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
  const users = await store.index();
  res.json(users);
};

const create = async (req: Request, res: Response) => {
  const user: UserT = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password_digest: req.body.password
  };
  try {
    console.log('User Obj ' + req.body + JSON.stringify(req.body.firstname));
    const newUser = await store.create(user);

    // @ts-ignore
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(
      // @ts-ignore
      err + ' b ' + JSON.stringify(user)
    );
  }
};
const show = async (req: Request, res: Response) => {
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
  const user = await store.show(req.params.id);
  res.json(user);
};
const authenticate = async (req: Request, res: Response) => {
  // @ts-ignore
  const user: UserT = {
    username: req.body.username,
    password_digest: req.body.password
  };
  try {
    const u = await store.authenticate(user.username, user.password_digest);
    var token = jwt.sign(
      { user: u },
      // @ts-ignore
      process.env.TOKEN_SECRET
    );
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.post('/users/authenticate', authenticate);
};

export default userRoutes;
