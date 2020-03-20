// Decorators (there now exist certain scenarios that require additional features to support annotating or modifying classes and class members)
// Tip : decorators in general are all about classes
// #######################################
function Logger(constructor: Function) {
  console.log("Logging ...", constructor);
}

@Logger
class Person {
  name = "Mohamad";
  constructor() {
    console.log("Create Person Object");
  }
}
// const pers = new Person();
// console.log(pers);

// Decorator function ()
// Tip : Any argument of your choice and as many arguments as you want and pass a value
// #######################################
function Logger2(logString: string) {
  return function(constructor: Function) {
    console.log(logString, constructor);
  };
}

@Logger2("LoGGING  - PERSON")
class Person2 {
  name = "Mohamad";
  constructor() {
    console.log("Create Person Object");
  }
  dummyLog() {
    console.log("Dummy Log");
  }
}
const pers2 = new Person();
console.log(pers2);
