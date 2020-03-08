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
