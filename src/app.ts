// Intersection Type (Admin & Employee)
// Tip : simple way of combining two types
// #######################################

type Admin = {
  name: string;
  privilages: string[];
};
// interface Admin {
//   name: string;
//   privilages: string[];
// }
type Employee = {
  name: string;
  startDate: Date;
};
// interface Employee {
//   name: string;
//   startDate: Date;
// }
// interface EvalatedEmployee extends Admin, Employee {}
type EvalatedEmployee = Admin & Employee;

const e1: EvalatedEmployee = {
  name: "Mohamad",
  privilages: ["create-server"],
  startDate: new Date()
};

type Combinable = string | number;
type Numeric = Number | boolean;

type Universal = Combinable & Numeric;

// Type Guards (check which type when using Intersection)
// Tip : 3 kind of Guard:
//      1- check Typeof
//      2- in (check key in object)
//      3- instenceOf ( check class type)
// #######################################

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknowEmployee = Admin | Employee;
function printEmployeeInformation(emp: UnknowEmployee) {
  console.log("name : " + emp.name);
  if ("startDate" in emp) {
    console.log("startDate : " + emp.startDate);
  }
  if ("privilages" in emp) {
    console.log("startDate : " + emp.privilages);
  }
}
// printEmployeeInformation({ name: "Mamrez", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving ....");
  }
}
class Truck {
  drive() {
    console.log("Driving a truck ....");
  }
  loadCargo(amount: number) {
    console.log("Loading Cargo " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  vehicle instanceof Truck && vehicle.loadCargo(1000);
}

// useVehicle(v1);
// useVehicle(v2);

// discriminated union (one common property in every object that makes up our union which describes Stat object)
// Tip : understand which properties are available for such an object and which properties are not
// useful pattern | working with objects and with union types
// #######################################
interface Bird {
  type: "Bird";
  flyingSpeed: number;
}
interface Horse {
  type: "Horse";
  runningSpedd: number;
}
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "Horse":
      speed = animal.runningSpedd;
      break;
    case "Bird":
      speed = animal.flyingSpeed;
      break;
  }
  console.log("Moving With Speed : " + speed);
}

// moveAnimal({ type: "Horse", runningSpedd: 100 });

// typecasting (helps you tell typescript that some value is office specific type where typescript is not able to detect but you as a developer know)
// Tip : two ways of type cost : angle brackets<> , as
// best practice : get access to something in the dorm
//  ignore the or null case for now | fix by adding an exclamation mark (!) otherwise check it with if
// #######################################

// const userInputElm = <HTMLInputElement>document.querySelector("#input-elm")!;
// const userInputElm = document.querySelector("#input-elm")! as HTMLInputElement;
// userInputElm.value = " hey there !";

const userInputElm = document.querySelector("#input-elm");
userInputElm && (userInputElm as HTMLInputElement).value = " hey there !";
