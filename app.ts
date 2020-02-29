const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: "sdg",
  age: 26,
  hobbies: ["sport", "game"],
  role: [1, "author"]
};
// person.role.push("sdsds");
// person.role[0] = "admin";
// person.role = [2, "admin", "super_admin"];
console.log(person.role);

let favoritActivites: string[];
favoritActivites = ["sport"];

for (const hobby of person.hobbies) {
  console.log(hobby);
}
