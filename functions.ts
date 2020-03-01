function add(n1: number, n2: number): number {
  return n1 + n2;
}
function printResult(num: number): void {
  console.log(num);
}
function addAndHandle(n1: number, n2: number, cb: (r1: number) => void) {
  const result = n1 + n2;
  cb(result);
}

// let combineValue: (a: number, b: number) => number;
// printResult(add(5, 12));
// combineValue = add;
// combineValue = printResult;
// console.log(combineValue(8, 8));

addAndHandle(6, 8, result => {
  console.log(result);
});
