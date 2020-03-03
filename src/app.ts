class Department {
  public name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }
  describe(this: Department) {
    console.log(`Department ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
const accounting = new Department("Accounting");

// const accountingCopy = {
//   describe: accounting.describe,
//   name: "Accounting_copy"
// };
// console.log("accountingCopy", accountingCopy);
// accountingCopy.describe();

accounting.addEmployee("jo");
accounting.addEmployee("morthy");
accounting.name = "Math";
accounting.employees[2] = "rose";

accounting.describe();
accounting.printEmployeeInfo();
