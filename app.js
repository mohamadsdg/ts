var userInput;
var userName;
userInput = 5;
userInput = "sdg";
if (typeof userInput === "string") {
    userName = userInput;
}
function error(message) {
    throw { message: message, errorCode: 500 };
    while (true) {
        console.log(message);
    }
}
function fail() {
    return error("Something failed");
}
// console.log(userName);
fail();
