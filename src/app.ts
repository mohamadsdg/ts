// Decorators (there now exist certain scenarios that require additional features to support annotating or modifying classes and class members)
// Tip : decorators in general are all about classes
// #######################################
function Logger(constructor: Function) {
  console.log("Logging ...", constructor);
}

// @Logger
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
//  I can add an underscore as a name which basically signals to typescript (I know I get this argument but I don't need it)
// #######################################
function Logger2(logString: string) {
  //   console.log("functions first for order ");
  return function(_: Function) {
    console.log(logString);
  };
}

// @Logger2("LoGGING  - PERSON")
class Person2 {
  name = "Mohamad";
  constructor() {
    console.log("Create Person Object");
  }
  dummyLog() {
    console.log("Dummy Log");
  }
}
// const pers2 = new Person2();
// console.log(pers2);

// Useful Decorators and multiple Decorators()
// Tip : We add some logic Decorators which we could expose if this would be a third party library we share with our USERS
// We could expose as part of the library and anyone who uses our library can import this decorator function and add it
// to a class to then magically render some content all of a sudden
// Tip2: order do these decorators execute bottom to top for Decorators
//  for decorators functions first function and then according to order bottom to top execute decorators

// #######################################
function WithThemplate(template: string, hookId: string) {
  //   console.log("functions second for order ");
  return function(constructor: any) {
    const hookElm = document.getElementById(hookId)!;
    const person = new constructor();
    if (hookElm) {
      // person.dummyLog()
      console.log(person);
      hookElm.querySelector("h1")!.textContent = person.name;
    }
  };
}
@Logger2("LoGGING  - PERSON")
@WithThemplate("<h1>From Themplate</h1>", "app")
class Person3 {
  name = "Mohamad";
  constructor() {
    console.log("Create Person Object");
  }
  dummyLog() {
    console.log("Dummy Log");
  }
}
// const pers3 = new Person3();
