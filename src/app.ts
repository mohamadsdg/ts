// Generics Type (type which is connected to another)
// Tip : between these angled brackets you specify the type of data which should go into the array for example below
// #######################################
// const names: any[] = [1, 5, "hello"];
// const names: Array<string> = ["hello", "Hi"]; //string[]
// names[0].split(" ");
// console.log(names[0].split(" "));

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   return setTimeout(() => {
//     return resolve("Resolved It");
//   }, 500);
// });

// promise
//   .then(data => {
//     console.log(data.split(" "));
//   })
//   .catch(err => {
//     throw err;
//   });

// Generics Functions ()
// Tip :
// #######################################

// function merge(objectA: Object, objectB: Object) {
//   return Object.assign(objectA, objectB);
// }

// const mergedObj = merge({ name: "sdg", hobbies: ["Sports"] }, { age: 30 });

// whay dos not exist => typescript doesn't know this types we can't know this
//                       because we are just telling it(mergedObj) you getting an object
//                       that in their type infers that we return an object
//                       which is correct but which doesn't carry all the information we could use here.
// solution1 : using typecasting ( as {name:string,hobbies:string[],age:number} ) bad way :/
// solution2 : generics help us = > We turned it into a generic function
// tip : typescript infers that this function returns the intersection of T and U
// tip : we tell typescript that we got two different types here but dead these types are not set in stone
//       when we define this function but they are set dynamically when we called the function.
//  exp : T it basically fills in an object type with an object with a name property which holds a string and a Hobbes property hich holds a array
//  **typescript simply infers the types of the values we're passing as arguments**

function merge<T, U>(objectA: T, objectB: U) {
  return Object.assign(objectA, objectB);
}
const mergedObj = merge({ name: "sdg", hobbies: ["Sports"] }, { age: 30 });

console.log(mergedObj);
