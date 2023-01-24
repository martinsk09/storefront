import { Order,OrderT } from './../order';
const store = new Order();
//test index show create authenticate

describe("Order Model", () => {
    it('should have an orderIndex method', () => {
      expect(store.orderIndex).toBeDefined();
    });
  
    it('should have a showActive method', () => {
      expect(store.showActive).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });
  
    it('should have an addProduct method', () => {
      expect(store.addProduct).toBeDefined();
    });

});
