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
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["AUTHOR"] = 1] = "AUTHOR";
    Role[Role["READ_ONLY"] = 2] = "READ_ONLY";
})(Role || (Role = {}));
var person = {
    name: "sdg",
    age: 26,
    hobbies: ["sport", "game"],
    role: Role[0]
};
// person.role.push("sdsds");
// person.role[0] = "admin";
console.log(person.role, Role);
var favoritActivites;
favoritActivites = ["sport"];
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby);
}
