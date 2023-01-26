import { Order, OrderT, OrderProductT } from './../order';
// const Order = require( './../order');

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

    it('create an order', async () => {
      const order: OrderT = {
        "user_id":2,
        "status":"active"
      };
      await storeo.create(order)
      const orders = await storeo.showActive(order.user_id.toString())

    expect(orders).toBeInstanceOf(Object);
      //done();
    });

    it('add a product to an order', async () => {
      const order_new: OrderProductT = {
        "productId":"1",
        "orderId":"1",
        "quantity":4
      };
      const new_order = await storeo.addProduct(order_new)
      expect(new_order).toBeInstanceOf(Object);
      //done();
    });

    it('show orders for a user', async () => {
      const orders = await storeo.orderIndex("2")

    expect(orders).toBeInstanceOf(Object);
      //done();
    });

});
