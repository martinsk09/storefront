import { User,UserT } from './../user';
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

});
