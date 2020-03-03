abstract class Department {
  //TIP: Cannot create an instance of an abstract class

  // private readonly id: string;
  // public name: string;
  // private employees: string[] = [];
  protected employees: string[] = [];

  static employes = { name: "Jared" };
  static PI = Math.PI;
  static createEmployee(name: string) {
    return { name };
  }

  constructor(protected readonly id: string, public name: string) {
    this.id = id;
    this.name = name;
  }
  // describe(this: Department) {
  //   console.log(`Department (${this.id}) : ${this.name}`);
  //   console.log(
  //     Department.employes,
  //     Department.PI,
  //     Department.createEmployee("hey YOU ....!")
  //   );
  // }
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    //this.id = "C2";
    this.employees.push(employee);
  }
  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT-Department");
    this.admins = admins;
  }

  describe() {
    console.log(`IT Department - ID : (${this.id})`);
  }
}
class AccountingDepartment extends Department {
  private lastReport: string;

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting-Department");
    this.lastReport = reports[reports.length];
  }
  get mostLastRepost() {
    if (this.lastReport) return this.lastReport;
    throw new Error("no last Repost");
  }
  set mostLastRepost(name: string) {
    this.addReport(name);
  }

  addEmployee(name: string) {
    if (name === "sdg") {
      return;
    } else {
      this.employees.push(name);
    }
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReport() {
    console.log(this.reports);
  }
  describe() {
    console.log(`IT AccountingDepartment - ID : ( ${this.id} )`);
  }
}

// const department = new Department("c1", "Accounting");
const IT = new ITDepartment("IT", ["SADEGHI"]);
const accounting = new AccountingDepartment("ACCOUNTIN", []);

// const departmentCopy = {
//   describe: accounting.describe,
//   name: "Accounting_copy",
//   id: "C1_copy"
// };
// departmentCopy.describe();

// department.addEmployee("jo");
// department.addEmployee("morthy");
// department.employees[2] = "rose";

// department.describe();
// department.printEmployeeInfo();

// console.log(IT);
// IT.addEmployee("Rick");
// IT.addEmployee("Morthy");

IT.describe();
// IT.printEmployeeInfo();

// console.log(accounting);

// console.log(accounting.getLastRepost); // throw Error
// accounting.addReport("somthings went wrong ....");
// accounting.mostLastRepost = "dummy report"; //set last repost
// console.log("lastReport :", accounting.mostLastRepost); // get last report

// accounting.addEmployee("Rick");
// accounting.addEmployee("sdg");

accounting.describe();
// accounting.printReport();
// accounting.printEmployeeInfo();
