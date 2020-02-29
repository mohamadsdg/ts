var person = {
    name: "sdg",
    age: 26,
    hobbies: ["sport", "game"],
    role: [1, "author"]
};
person.role.push("sdsds");
// person.role[0] = "admin";
person.role = [2, "admin", "super_admin"];
console.log(person.role);
var favoritActivites;
favoritActivites = ["sport"];
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby);
}
