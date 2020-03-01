function add(n1: number, n2: number): number {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log(num);
}

let combineValue: (a: number, b: number) => number;

printResult(add(5, 12));

// combineValue = add;
combineValue = add;

console.log(combineValue(8, 8));
