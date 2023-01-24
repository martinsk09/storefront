// @ts-ignore
import Client from '../database';

export type ProductT = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class Product {
  async index(): Promise<ProductT[]|string> {
    try {
      // @ts-ignore
      const ctn = await Client.connect();
      const sql = 'SELECT * FROM products';

      const result = await ctn.query(sql);

      ctn.release();

      if(result.rows.length>0){
        return result.rows;
        }else{
          return 'No product found';
        }
    } catch (err) {
      throw new Error(`Could not retrieve products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<ProductT|string> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      // @ts-ignore
      const ctn = await Client.connect();

      const result = await ctn.query(sql, [id]);

      ctn.release();

      if(result.rows.length>0){
      return result.rows[0];
      }else{
        return 'No product found';
      }
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }
  async categoryIndex(category: string): Promise<ProductT> {
    try {
      const sql = 'SELECT * FROM products WHERE category=($1)';
      // @ts-ignore
      const ctn = await Client.connect();

      const result = await ctn.query(sql, [category]);

      ctn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find products in ${category}. Error: ${err}`);
    }
  }

  async create(p: ProductT): Promise<ProductT> {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const ctn = await Client.connect();

      const result = await ctn.query(sql, [p.name, p.price, p.category]);

      const product = result.rows[0];

      ctn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }
}
