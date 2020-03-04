interface Person {
  name: string;
  age: number;
  greet(phrase: string): void;
}
let person1: Person;
person1 = {
  name: "Mohamad",
  age: 25,
  greet(phrase) {
    console.log(phrase + this.name);
  }
};
person1.greet("Hello ");
console.log(person1.age);
