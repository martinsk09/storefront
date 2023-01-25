import supertest from 'supertest';
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
      const response = await request.get('/users');
      expect(response.status).toBe(401);
      //done();
    });
    it('protected route shows message that token is required', async () => {
      const response = await request.get('/users/1');
      expect(response.status).toBe(401);
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