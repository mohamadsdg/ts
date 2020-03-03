class Department {
  // private readonly id: string;
  // public name: string;
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    this.id = id;
    this.name = name;
  }
  describe(this: Department) {
    console.log(`Department (${this.id}) : ${this.name}`);
  }
  addEmployee(employee: string) {
    //this.id = "C2";
    this.employees.push(employee);
  }
  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
const accounting = new Department("c1", "Accounting");

// const accountingCopy = {
//   describe: accounting.describe,
//   name: "Accounting_copy",
//   id: "C1_copy"
// };
// accountingCopy.describe();

accounting.addEmployee("jo");
accounting.addEmployee("morthy");
// accounting.employees[2] = "rose";

accounting.describe();
accounting.printEmployeeInfo();
