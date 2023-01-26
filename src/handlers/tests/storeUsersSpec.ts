import jwt  from 'jsonwebtoken';
import supertest from 'supertest';
import { User, UserT } from '../../models/user';
import app from '../../server';

/*
GET /users
GET /users/:id
POST /users
POST /users/authenticate
*/
const request = supertest(app);
describe('Test user endpoint responses', () => {
    it('create a user', async () => {
      const response = await request.post("/users").send({
        "firstname":"Simon",
        "lastname":"Trauts",
        "username":"trausi",
        "password":"mktelunopa"
      });
      expect(response.status).toBe(200);
      //done();
    });
    it('token required to get the list of users', async () => {

      const token = await generateToken("3user3","pwdtest2");
      const response = await request.get('/users')
      .set("Authorization", "Bearer "+token);
      expect(response.status).toBe(200);
      //done();
    });
    it('protected route shows message that token is required', async () => {
      const token = await generateToken("3users","pwdtest2");
      const response = await request.get('/users/1')
      .set("Authorization", "Bearer "+token);
      expect(response.status).toBe(200);
      //done();
    });
    it('authenticates a user', async () => {
      const response = await request.post('/users/authenticate').send({
        "username":"trausi",
        "password":"mktelunopa"
    });
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