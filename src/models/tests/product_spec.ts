import { Product,ProductT } from './../product';
const store = new Product();
//test index show create authenticate

describe("Product Model", () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });
  
    it('should have an categoryIndex method', () => {
      expect(store.categoryIndex).toBeDefined();
    });

});
