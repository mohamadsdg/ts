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

useVehicle(v1);
useVehicle(v2);
