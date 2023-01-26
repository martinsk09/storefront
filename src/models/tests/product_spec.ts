//const { Product,ProductT } = require( './../product');
import { Product,ProductT } from "../product";
const storep = new Product();
//test index show create categoryIndex

describe("Test for the Product Model Methods", () => {
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


  it('create and fetch all products', async function () {
      const product: ProductT = {
          name: "HP Laptop",
          price: 900,
          category: "laptop"
      }
      await storep.create(product)
      const products = await storep.index()

    expect(products.length).toBeGreaterThan(0);
  });


  it('should show an object product', async function () {

    const product = await storep.show('1');
    //console.log("check "+typeof product);
    expect(product).toBeInstanceOf(Object);
  });

  it('should show a list of products in a category', async function () {

    const product: ProductT = {
      name: "Dell xps Laptop",
      price: 1800,
      category: "laptop"
  }
    await storep.create(product);
    const products = await storep.categoryIndex('laptop');
    expect(products).toBeInstanceOf(Object);  
  
  });

});


