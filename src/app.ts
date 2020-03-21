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
// @Logger2("LoGGING  - PERSON")
// @WithThemplate("<h1>From Themplate</h1>", "app")
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

// Property Decorators and Accessor and parameter Decorators()
// Tip : which arguments decorator gets depends on where you add it
// (Property(2 argument) | Accessor(3 argument) | parameter (3 argument) | Parameter (3 argument))
// Tip2 : they all Decorators executed when you defined this class not the instantiation that's important to understand.
// Tip3 : decorators allow you to do additional behind the scenes setup work When a class is defined(meta programming concept) That's the idea behind decorators
// Tip4 : decorator itself really is just a function that executes when your classes defined
//        use the decorator to do some behind the scenes work to then set up some code that should run whatever it is called to add extra metadata or store some data somewhere
// Tip5 : adding extra functionality behind the scenes which then sometimes can execute when you do something (Themplate useCase)
// #######################################

function Log(target: any, propertyName: string | Symbol) {
  // (instance Propery (portotype), name Property )
  // console.log(new target.constructor("Book", 20));
  // console.log("prototype", target);
  console.log("Propery Decorator", propertyName);
}
function Log2(
  target: any,
  accessorName: string,
  descriptor: PropertyDescriptor
) {
  // (instance Propery (portotype), name Accessor , descriptor)
  // console.log(new target.constructor("Book", 20));
  // console.log("prototype", target);
  console.log("Accessor Decorator", accessorName);
  console.log("Accessor descriptor", descriptor);
}
function Log3(
  target: any,
  methodName: string | symbol,
  descriptor: PropertyDescriptor
) {
  // (instance Propery (portotype), name Method , descriptor)
  // console.log("prototype", target);
  console.log("Method Decorator", methodName);
  console.log("Method descriptor", descriptor);
}
function Log4(target: any, propertyName: string | symbol, position: number) {
  // (instance Propery (portotype), name Method , position of his argument)
  // console.log(new target.constructor("Book", 20));
  // console.log("prototype", target);
  console.log("Parameter Decorator", propertyName);
  // console.log("Parameter position", position);
}
class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid Price ");
    }
  }
  // get price() {
  //   return this._price;
  // }
  constructor(a: string, b: number) {
    this.title = a;
    this._price = b;
  }
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}
