class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }
  describe(this: Department) {
    console.log(`Department ${this.name}`);
  }
}
const accounting = new Department("Accounting");
const accountingCopy = {
  describe: accounting.describe,
  name: "Accounting_copy"
};
// console.log("accountingCopy", accountingCopy);
accounting.describe();
accountingCopy.describe();
