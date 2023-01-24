import express, { Request, Response } from 'express';
import userRoutes from './handlers/users';
import bodyParser from 'body-parser';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';

const app: express.Application = express();
const address: string = '0.0.0.0:3200';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Api for Store Front.');
});

app.listen(3200, function () {
  console.log(`starting app on: ${address}`);
});
userRoutes(app);
productRoutes(app);
orderRoutes(app);

export default app;
