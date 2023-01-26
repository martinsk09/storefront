import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { User, UserT } from '../../models/user';
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
      const token = await generateToken("3users","pwdtest2");
      const response = await request.post("/products")
      .set("Authorization", "Bearer "+token)
      .send({
        "name":"Vacuum Cleaner",
        "price":"1300",
        "category":"appliances"
      });
      expect(response.status).toBe(200);
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