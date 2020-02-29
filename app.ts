const person: {
  name: string;
  age: number;
  hobbies: string[];
} = {
  name: "sdg",
  age: 26,
  hobbies: ["sport", "game"]
};

let favoritActivites: string[];
favoritActivites = ["sport"];

for (const hobby of person.hobbies) {
  console.log(hobby);
}
