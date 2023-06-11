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
    const countItems = {}; 
    let arrMathingObjects = [];
    let arrMathingStrings = [];
    let arrResultMathingStrings = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.indexOf(searchString) != -1){
            arrMathingObjects.push(products[i]);  
        };
    }
    for (i = 0; i < arrMathingObjects.length; i++ ){
      arrMathingStrings[i] = arrMathingObjects[i].name;
    }
    for (const item of arrMathingStrings) {
      countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
    }
    const result = Object.keys(countItems).filter((item) => countItems[item] > 1);
    // console.log(result);
    for (let i = 0; i <arrMathingStrings.length; i++){
      for (let j = 0; j < result.length; j++){
        if (arrMathingStrings[i] == result[j]){
          arrMathingStrings[i] =  arrMathingObjects[i].producer + " - " + arrMathingStrings[i];
        }
      }
    }
    if (arrMathingStrings.length > 10){
      for (let i = 0; i < 10; i++){
        arrResultMathingStrings.push(arrMathingStrings[i]);
      }
      // console.log(arrResultMathingStrings);
      return arrResultMathingStrings;
    }
    // console.log(arrMathingStrings);
    return [...arrMathingStrings];
  };

  /**
    - Returns: 10 product names whose producer contains the specified string, ordered by producers.
   */
  ShopImpl.prototype.listProductsByProducer = function (searchString) {
    let arrMathingObjects = [];
    let arrMathingNames = [];
    let arrMathingProducers = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].producer.indexOf(searchString) != -1){
        arrMathingObjects.push(products[i]);  
      };
    }
   
    let cuttingObject = [];
    if (arrMathingObjects.length > 10) {
      for (i = 0; i < 10; i++){
        cuttingObject.push(arrMathingObjects[i]);
      }
    } else {
      for (i = 0; i < arrMathingObjects.length; i++){
        cuttingObject.push(arrMathingObjects[i]);
      }
    }

    // for (let i = 0; i < cuttingObject.length; i++){
    //   arrMathingNames.push(cuttingObject[i].name);
    // }

    // for (let i = 0; i < cuttingObject.length; i++){
    //   arrMathingProducers.push(cuttingObject[i].producer);
    // }

    // const ruCollator = new Intl.Collator('ru-RU');
    // const sortArr = [...arrMathingProducers].sort((a, b) => ruCollator.compare(a, b));
    
    function SortArray(x, y){
      if (x.producer < y.producer) {return -1;}
      if (x.producer > y.producer) {return 1;}
      return 0;
  }
  let re = [];
  var s = cuttingObject.sort(SortArray);
  for (i = 0; i < s.length; i++){
    re.push(s[i].name);
  }
  // console.log(re);
    return [...re];
  };

  return ShopImpl;
}());

function test(shop) {
  assert(!shop.deleteProduct("1"));
  assert(shop.addNewProduct({ id: "1", name: "1", producer: "Lex" }));
  assert(!shop.addNewProduct({ id: "1", name: "any name because we check id only", producer: "any producer" }));
  assert(shop.deleteProduct("1"));
  assert(shop.addNewProduct({ id: "3", name: "Some Product3", producer: "Some Producer2" }));
  assert(shop.addNewProduct({ id: "4", name: "Some Product1", producer: "Some Producer3" }));
  assert(shop.addNewProduct({ id: "2", name: "Some Product2", producer: "Some Producer2" }));
  assert(shop.addNewProduct({ id: "1", name: "Some Product1", producer: "Some Producer1" }));
  assert(shop.addNewProduct({ id: "5", name: "Other Product5", producer: "Other Producer4" }));
  assert(shop.addNewProduct({ id: "6", name: "Other Product6", producer: "Other Producer4" }));
  assert(shop.addNewProduct({ id: "7", name: "Other Product7", producer: "Other Producer4" }));
  assert(shop.addNewProduct({ id: "8", name: "Other Product8", producer: "Other Producer4" }));
  assert(shop.addNewProduct({ id: "9", name: "Other Product9", producer: "Other Producer4" }));
  assert(shop.addNewProduct({ id: "10", name: "Other Product10", producer: "Other Producer4" }));
  assert(shop.addNewProduct({ id: "11", name: "Other Product11", producer: "Other Producer4" }));
  var byNames = shop.listProductsByName("Product");
  assert(byNames.length == 10);
  byNames = shop.listProductsByName("Some Product");
  assert(byNames.length == 4);
  assert(byNames.indexOf("Some Producer3 - Some Product1") >= 0);
  assert(byNames.indexOf("Some Product2") >= 0);
  assert(byNames.indexOf("Some Product3") >= 0);
  assert(byNames.indexOf("Some Product1") < 0);
  assert(byNames.indexOf("Some Producer1 - Some Product1") >= 0);
  var byProducer = shop.listProductsByProducer("Producer");
  assert(byProducer.length == 10);
  byProducer = shop.listProductsByProducer("Some Producer");
  assert(byProducer.length == 4);
  assert(byProducer[0] == "Some Product1");
  assert(byProducer[1] == "Some Product2" || byProducer[1] == "Some Product3");
  assert(byProducer[2] == "Some Product2" || byProducer[2] == "Some Product3");
  assert(byProducer[3] == "Some Product1");
}

function assert(condition) {
  if (!condition) {
    throw new Error("Assertion failed");
  }
}

test(new ShopImpl());
