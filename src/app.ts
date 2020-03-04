// # interface as function types
// type addFn = (a: number, b: number) => number;
interface addFn {
  (a: number, b: number): number;
}

let add: addFn;
add = (n1: number, n2: number) => n1 + n2;
// console.log(add(6, 3));

interface Name {
  readonly name: string;
}
interface Greetable extends Name {
  greet(phrase: string): void;
  optionalGreet?(phrase: string): void;
}

class person implements Greetable {
  //Greetable, AnotherInerface
  name: string;
  constructor(n: string) {
    this.name = n;
  }
  greet(phrase: string) {
    console.log(phrase + " ");
  }
}
class human extends person {
  age: number;
  constructor(n: string, age: number) {
    super(n);
    this.age = age;
  }
  optionalGreet(phrase?: string) {
    phrase
      ? console.log(phrase + " optionalGreet")
      : console.log("optionalGreet");
  }
}
// let person_1: Greetable;
const person_1 = new person("ALi");
const human_1 = new human("Mohamad", 26);
console.log(person_1);
human_1.optionalGreet();

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
