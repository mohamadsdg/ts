interface Greetable {
  readonly name: string;
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
class human extends person {
  age: number;
  constructor(n: string, age: number) {
    super(n);
    this.age = age;
  }
}
// let person_1: Greetable;
const person_1 = new person("ALi");
const human_1 = new human("Mohamad", 26);
person_1.name = "Mohamad";
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
