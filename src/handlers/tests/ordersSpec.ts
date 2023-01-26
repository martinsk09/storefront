import { User,UserT } from './../../models/user';
import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';


/*
GET /orders/:userID/all
GET /orders/:userID
POST /orders/create
POST /users/:userID/orders/:orderID/products
*/

const request = supertest(app);
describe('Test order endpoint responses', () => {
    it('token is required to create an order ', async () => {
       const token = await generateToken("user1","pwdtest");
      const response = await request.post("/orders/create").set("Authorization", "Bearer "+token).send({
        "userID":"2",
        "status":"active"
      });
      //console.log("s "+JSON.stringify(token));
      expect(response.status).toBe(200);
      //done();
    });
    it('token is required to add a product to an order', async () => {

       const token = await generateToken("user2","pwdtest2");
      const response = await request.post("/users/1/orders/1/products")
      .set("Authorization", "Bearer "+token)
      .send({
        "quantity": "3",
        "orderId": "1",
        "productId": "1"
      });
      expect(response.status).toBe(200);
      //done();
    });
    it('gets the list of orders for the userID', async () => {

       const token = await generateToken("user3","pwdtest2");
      const response = await request.get('/orders/2/all')
      .set("Authorization", "Bearer "+token);
      expect(response.status).toBe(200);
      //done();
    });
    it('gets the list of active orders for the userID', async () => {
        const token = await generateToken("user4","pwdtest2");
      const response = await request.get('/orders/1')
      .set("Authorization", "Bearer "+token);
      expect(response.status).toBe(200);
      //done();
    });
});
const store = new User();
async function generateToken (usern:string,pwd:string){
    const user: UserT = {
        "firstname":"Simon",
        "lastname":"Trauts",
        "username":usern,
        "password_digest":pwd
      }; 
      
      await store.create(user);
     await store.authenticate(usern,pwd)
      var token = jwt.sign(
        { user },
        // @ts-ignore
        process.env.TOKEN_SECRET
      );
      return token;
}