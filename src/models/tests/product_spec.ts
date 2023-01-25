const { Product,ProductT } = require( './../product');
const storep = new Product();
//test index show create authenticate

describe("Product Model", () => {
    it('should have an index method', () => {
      expect(storep.index).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(storep.show).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(storep.create).toBeDefined();
    });
  
    it('should have an categoryIndex method', () => {
      expect(storep.categoryIndex).toBeDefined();
    });

});
