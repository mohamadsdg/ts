/**
 * lodash is a simple javascript library it's built with vanilla javascript and it's built for vanilla javascript
 * We can verify this if we go to node modules package lodash we see there are a bunch of JavaScript files
 * and all of lodash Source Code bunch of javascript code but certainly no typescript code
 * Now what's the problem with that ?
 * The problem is typescript doesn't understand what's in this package it doesn't understand which methods lodash exports
 * code is correct but unfortunately typescript does not understand it and it can't because lodash uses javascript not typescript
 * use any javascript library in a type of project just have to ** translate it to typescript(translation types packages) and thankfully is possible
 * ** declaration files which means they don't contain any actual logic but they contain instructions to typescript
 * they basically tell typescript how something works and what's included in this package
 */
import _ from "lodash";

console.log(_.shuffle([1, 2, 3]));

/**
 * use case : some other javascript code without types package !!
 * variables added to the global
 * declare certain variables
 * This basically tells typescript don't worry it will exist
 */

// declare var GLOBAL: string;
console.log(GLOBAL);

/**
 * class-transformers
 * convert data to class
 */
import "reflect-metadata";
import { plainToClass } from "class-transformer";

import { Product } from "./product_model";

// const p1 = new Product("A book", 12.99);
// console.log(p1);

// pure
const product = [
  { title: "A carper", price: 15.99 },
  { title: "A book", price: 11.99 }
];

// const loadedProduct = product.map(prod => {
//   return new Product(prod.title, prod.price);
// });
const loadedProduct = plainToClass(Product, product);

for (const prod of loadedProduct) {
  console.log(prod.getInformation());
}
