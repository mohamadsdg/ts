interface Greetable {
  name: string;
  greet(phrase: string): void;
}

class person implements Greetable {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}
// let person_1: Greetable;
const person_1 = new person("ALi");
console.log(person_1);

// interface Person {
//   name: string;
//   age: number;
//   greet(phrase: string): void;
// }
// let person1: Person;
// person1 = {
//   name: "Mohamad",
//   age: 25,
//   greet(phrase) {
//     console.log(phrase + this.name);
//   }
// };
// person1.greet("Hello ");
// console.log(person1.age);
