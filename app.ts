function combine(
  input1: number | string,
  input2: number | string,
  conversion: "as-number" | "as-text"
) {
  let result;
  if (
    (typeof input1 == "number" && typeof input2 == "number") ||
    conversion == "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + " " + input2 + toString();
  }
  return result;
}

let combineNumber = combine(20, 30, "as-number");
console.log(combineNumber);

let combineString = combine(
  "Mamrez",
  "sometimes he work's in office",
  "as-text"
);
console.log(combineString);

let combineNumberString = combine("30", "50", "as-number");
console.log(combineNumberString);
