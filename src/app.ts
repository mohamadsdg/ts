let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "sdg";

if (typeof userInput === "string") {
  userName = userInput;
}

function error(message: string): never {
  throw { message, errorCode: 500 };
}
function fail() {
  return error("Something failed");
}

// console.log(userName);
fail();
