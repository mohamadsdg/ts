function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log(num);
}
var combineValue;
printResult(add(5, 12));
// combineValue = add;
combineValue = add;
console.log(combineValue(8, 8));
