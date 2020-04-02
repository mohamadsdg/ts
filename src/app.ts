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
