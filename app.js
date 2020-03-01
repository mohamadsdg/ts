function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log(num);
}
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    return cb(result);
}
// let combineValue: (a: number, b: number) => number;
// printResult(add(5, 12));
// combineValue = add;
// combineValue = printResult;
// console.log(combineValue(8, 8));
addAndHandle(6, 8, function (result) {
    console.log(result);
});
