import supertest from 'supertest';
import app from '../../server';

/*
GET /products
GET /products/:id
POST /products
GET /products/category/:id
*/
const request = supertest(app);
describe('Test product endpoint responses', () => {
    it('create a product link requires a token', async () => {
      const response = await request.post("/products").send({
        "name":"Vacuum Cleaner",
        "price":"1300",
        "category":"appliances"
      });
      expect(response.status).toBe(401);
      //done();
    });
    it('gets the list of products', async () => {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
      //done();
    });
    it('gets a single product', async () => {
      const response = await request.get('/products/1');
      expect(response.status).toBe(200);
      //done();
    });
    it('gets the products in a category', async () => {
      const response = await request.get('/products/category/appliances');
      expect(response.status).toBe(200);
      //done();
    });
});