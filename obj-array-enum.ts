// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "sdg",
//   age: 26,
//   hobbies: ["sport", "game"],
//   role: [1, "author"]
// };
enum Role {
  ADMIN,
  AUTHOR,
  READ_ONLY
}
const person = {
  name: "sdg",
  age: 26,
  hobbies: ["sport", "game"],
  role: Role[0]
};
// person.role.push("sdsds");
// person.role[0] = "admin";
console.log(person.role, Role);

let favoritActivites: string[];
favoritActivites = ["sport"];

for (const hobby of person.hobbies) {
  console.log(hobby);
}
