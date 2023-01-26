import { User, UserT } from "../user";
const store = new User();
//test index show create authenticate

describe("User Model", () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });
  
    it('should have an authenticate method', () => {
      expect(store.authenticate).toBeDefined();
    });

    it('create a user', async () => {
      const user: UserT = {
        "firstname":"Simon",
        "lastname":"Trauts",
        "username":"trausi",
        "password_digest":"mktelunopa"
      };
      await store.create(user)
      const users = await store.index()

    expect(users.length).toBeGreaterThan(0);
      //done();
    });
    it('show a user', async () => {

      const userb: UserT = {
        "firstname":"Simonb",
        "lastname":"bTrauts",
        "username":"brtrausi",
        "password_digest":"mktelunopa"
      };
      await store.create(userb)
      const user = await store.show('2')
    expect(user).toBeInstanceOf(Object); 
      //done();
    });
    it('authenticate a user', async () => {

      const user = "brtrausi"
      const password ="mktelunopa"
      
      const auth = await store.authenticate(user,password)

      //console.log('s '+JSON.stringify(auth))
    expect(auth).toBeInstanceOf(Object); 
      //done();
    });

});
