import supertest from 'supertest';
import app from '../../server';


/*
GET /orders/:userID/all
GET /orders/:userID
POST /orders/create
POST /users/:userID/orders/:orderID/products
*/

const request = supertest(app);
describe('Test order endpoint responses', () => {
    it('token is required to create an order ', async () => {
      const response = await request.post("/orders/create").send({
        "userID":"1",
        "status":"active"
      });
      expect(response.status).toBe(401);
      //done();
    });
    it('token is required to add a product to an order', async () => {
      const response = await request.post("/users/1/orders/1/products").send({
        "quantity": "3",
        "orderId": "1",
        "productId": "1"
      });
      expect(response.status).toBe(401);
      //done();
    });
    it('gets the list of orders for the userID', async () => {
      const response = await request.get('/orders/1/all');
      expect(response.status).toBe(200);
      //done();
    });
    it('gets the list of active orders for the userID', async () => {
      const response = await request.get('/orders/1');
      expect(response.status).toBe(200);
      //done();
    });
});