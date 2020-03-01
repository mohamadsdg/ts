function combine(input1, input2, conversion) {
    var result;
    if ((typeof input1 == "number" && typeof input2 == "number") ||
        conversion == "as-number") {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + " " + input2 + toString();
    }
    return result;
}
var combineNumber = combine(20, 30, "as-number");
console.log(combineNumber);
var combineString = combine("Mamrez", "sometimes he work's in office", "as-text");
console.log(combineString);
var combineNumberString = combine("30", "50", "as-number");
console.log(combineNumberString);
