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
  // console.log("Propery Decorator", propertyName);
}
function Log2(
  target: any,
  accessorName: string,
  descriptor: PropertyDescriptor
) {
  // (instance Propery (portotype), name Accessor , descriptor)
  // console.log(new target.constructor("Book", 20));
  // console.log("prototype", target);
  // console.log("Accessor Decorator", accessorName);
  // console.log("Accessor descriptor", descriptor);
}
function Log3(
  target: any,
  methodName: string | symbol,
  descriptor: PropertyDescriptor
) {
  // (instance Propery (portotype), name Method , descriptor)
  // console.log("prototype", target);
  // console.log("Method Decorator", methodName);
  // console.log("Method descriptor", descriptor);
}
function Log4(target: any, propertyName: string | symbol, position: number) {
  // (instance Propery (portotype), name Method , position of his argument)
  // console.log(new target.constructor("Book", 20));
  // console.log("prototype", target);
  // console.log("Parameter Decorator", propertyName);
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

// Returnin Class Decorators ()
// Tip : turn our decorator function into a generic function where we get a type and set this as the type of original constructor
// Tip2 : by assigning special type an object type where we set a new property(This is a reserved name: tells typescript that in the end this will be an object)
//  original constructor function will not just produce any object({}) but actually will produce an object with a name property{name ,...} which will be of type String
// #######################################
function WithThemplate2(template: string, hookId: string) {
  return function<T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      family = "sadeghi";
      constructor(..._: any[]) {
        // any argument pass to constructor
        // also need here in the original constructor function
        super(); // previus logic
        // below extera logic
        const hookElm = document.getElementById(hookId)!;
        if (hookElm) {
          // person.dummyLog()
          hookElm.querySelector("h1")!.textContent =
            this.name + " " + this.family;
        }
      }
    };
  };
}
@WithThemplate2("<h1>From Themplate</h1>", "app")
class Person4 {
  name = "Mohamad";
  constructor() {
    console.log("Create Person Object");
  }
  dummyLog() {
    console.log("Dummy Log");
  }
}
// const _p = new Person4();
// console.log(_p);

// return Types(can return values in our decorators too but not all of them or not in all of them)
// Tip : sample Autobinding
// Tip : event listener if we point at a function it should be executed
//    The this keyword inside of that function will not have the same context or reference as it has if we call just p dot show message
//    the scenario here where we use an event listener this will refer to the target of the event because event listener in the end
//    binds this in the function which is to be executed to the target of the event
//  would be to use the bind method and bind show message to p or bind this in show message to p so that when does
//  executes this is not referring to what ad event listener wants it to refer to but instead this instead of show
//  message will refer to this P to this object here again
// #######################################

function Autobinding(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  // console.log(descriptor);
  const adjdescriptor = {
    enumerable: false,
    configurable: true,
    get() {
      //getter is like an extra layer between our function that's being executed and the object to which it belongs and the event listener
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  // console.log(adjdescriptor);
  return adjdescriptor;
}
class Print {
  message = "I clicked !";

  @Autobinding
  showMessage() {
    // console.log(e); trick for undrestand target of the event
    console.log(this.message);
  }
}
const p = new Print();
// p.showMessage(); // this case refer to printer

const button = document.querySelector("button")!;
// button.addEventListener("click", p.showMessage.bind(p));
button.addEventListener("click", p.showMessage);
