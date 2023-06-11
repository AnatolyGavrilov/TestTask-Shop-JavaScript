/**
The task is to implement the Shop protocol (you can do that in this file directly).
- No database or any other storage is required, just store data in memory
- No any smart search, use String method contains (case sensitive/insensitive - does not matter)
–   Performance optimizations are optional
*/
var ShopImpl = (function () {
  function ShopImpl() {}
    let products = [];
  /**
    Adds a new product object to the Shop.
    - Parameter product: product to add to the Shop
    - Returns: false if the product with same id already exists in the Shop, true – otherwise.
   */
  ShopImpl.prototype.addNewProduct = function (product) {
    if (products.length == 0){
      products.push(product);
      // console.log('Я вхожу суда 1 раз');
      return true;
    } else {
      for (let i = 0; i < products.length; i++){
        if (products[i].id == product.id){
          return false;
        }
      }
      products.push(product);
      // console.log('-----')
      // console.log(products);
      return true;
    }
  };

  /**
    Deletes the product with the specified id from the Shop.
    - Returns: true if the product with same id existed in the Shop, false – otherwise.
   */
  ShopImpl.prototype.deleteProduct = function (id) {
    for (let i = 0; i < products.length; i++){
      if (products[i].id == id){
        products.splice(i,1);
        return true;
      } 
    }
    return false;
  };

  /**
    - Returns: 10 product names containing the specified string. If there are several products with the same name, producer's name is appended to product's name.
   */
  ShopImpl.prototype.listProductsByName = function (searchString) {
    let arrMathingObjects = [];
    const countItems = {}; 
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.indexOf(searchString) != -1){
            arrMathingObjects.push(products[i]);  
        };
    }
    let arrMathingStrings = [];
    for (i = 0; i < arrMathingObjects.length; i++ ){
      arrMathingStrings[i] = arrMathingObjects[i].name;
    }
    for (const item of arrMathingStrings) {
      countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
    }
    const result = Object.keys(countItems).filter((item) => countItems[item] > 1);
    for (let i = 0; i <arrMathingStrings.length; i++){
      if (arrMathingStrings[i] == result[0]){
        arrMathingStrings[i] = arrMathingStrings[i] + arrMathingObjects[i].producer;
      }
    }
    console.log(arrMathingStrings);
    return arrMathingStrings;
  };

  /**
    - Returns: 10 product names whose producer contains the specified string, ordered by producers.
   */
  ShopImpl.prototype.listProductsByProducer = function (searchString) {
    // TODO: your implementation goes here
    return [];
  };

  return ShopImpl;
}());

function test(shop) {
    assert(shop.addNewProduct({ id: "1", name: "11", producer: "Lexx" }));
    assert(shop.addNewProduct({ id: "2", name: "1", producer: "KKK" }));
    assert(shop.addNewProduct({ id: "3", name: "1Some Product3", producer: "Some Producer2" }));
    assert(shop.addNewProduct({ id: "5", name: "Other Product5", producer: "Other Producer41" }));
    assert(shop.addNewProduct({ id: "6", name: "1", producer: "Lex" }));
    // assert(shop.deleteProduct("1"));
    // assert(shop.deleteProduct("3"));
    // assert(shop.deleteProduct("5"));
    assert(shop.addNewProduct({ id: "65", name: "Other Product5", producer: "Other Producer411" }));
    // assert(shop.addNewProduct({ id: "65", name: "Other Product5", producer: "Other Producer4" }));
    assert(shop.addNewProduct({ id: "511", name: "1Other Product5", producer: "Other Produce" }));
    // assert(shop.deleteProduct("2"));
    assert(shop.addNewProduct({ id: "522", name: "Other Product5", producer: "Other Producer14" }));
    assert(shop.addNewProduct({ id: "523", name: "Other Pro2duct5", producer: "Other Producer14" }));
    var byNames = shop.listProductsByName("1");
    var byNamess = shop.listProductsByName("5");
    assert(byNames.length == 5);
    assert(byNamess.length == 5);
}

function assert(condition) {
  if (!condition) {
    throw new Error("Assertion failed");
  }
}

test(new ShopImpl());
