// @ts-ignore
import Client from '../database';

export type OrderT = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderProductT = {
    id?:number;
    quantity: number;
    orderId: string;
    productId: string;
};

export class Order {
  async showActive(id: string): Promise<OrderT> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='active'";
      // @ts-ignore
      const ctn = await Client.connect();
      const result = await ctn.query(sql, [id]);
      ctn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order for user ${id}. Error: ${err}`);
    }
  }

  async orderIndex(id: string): Promise<OrderT> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      // @ts-ignore
      const ctn = await Client.connect();

      const result = await ctn.query(sql, [id]);

      ctn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order for user ${id}. Error: ${err}`);
    }
  }

  async create(o: OrderT): Promise<OrderT> {
    try {

      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const ctns = await Client.connect();
      const result = await ctns.query(sql, [o.user_id, o.status]);
      ctns.release();
      const product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(
        `Could not add new order for ${o.user_id}. Error: ${err}`
      );
    }
  }

  async addProduct(a: OrderProductT): Promise<Order> {
    // get order to see if it is open
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)';
      //@ts-ignore
      const ctn = await Client.connect();

      const result = await ctn.query(ordersql, [a.orderId]);

      const order = result.rows[0];

      if (order.status != 'active') {
        throw new Error(
          `Product ${a.productId} cannot be added to order ${a.orderId} with order status ${order.status}`
        );
      }

      ctn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql ='INSERT INTO orders_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
        // @ts-ignore
      const ctn = await Client.connect();
      const result = await ctn.query(sql, [a.quantity, a.orderId, a.productId]);
      const order = result.rows[0];

      ctn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${a.productId} to order ${a.orderId}: ${err}`
      );
    }
  }
}
