// const Order = require( './../order');
import {Order} from './../order';

const storeo = new Order();
//test index show create authenticate

describe("Order Model", () => {
    it('should have an orderIndex method', () => {
      expect(storeo.orderIndex).toBeDefined();
    });
  
    it('should have a showActive method', () => {
      expect(storeo.showActive).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(storeo.create).toBeDefined();
    });
  
    it('should have an addProduct method', () => {
      expect(storeo.addProduct).toBeDefined();
    });

});
