"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

/*
Create two loops that print 9 columns and 7 rows with the text "K1, R1" for the first cell, "K2, R1" for the
second cell, and so on.
○ Hint: Use what we call nested loops.
This is a "for" loop within another "for" loop.
Use the provided printOut function to print each row with its sets of columns; remember to place this in
the right level of the nested for loops. The output should look like this:
K1R1 K2R1 K3R1 K4R1 K5R1 K6R1 K7R1 K8R1 K9R1
K1R2 K2R2 K3R2 K4R2 K5R2 K6R2 K7R2 K8R2 K9R2
K1R3 K2R3 K3R3 K4R3 K5R3 K6R3 K7R3 K8R3 K9R3
K1R4 K2R4 K3R4 K4R4 K5R4 K6R4 K7R4 K8R4 K9R4
K1R5 K2R5 K3R5 K4R5 K5R5 K6R5 K7R5 K8R5 K9R5
K1R6 K2R6 K3R6 K4R6 K5R6 K6R6 K7R6 K8R6 K9R6
K1R7 K2R7 K3R7 K4R7 K5R7 K6R7 K7R7 K8R7 K9R7
*/

for (let row = 1; row <= 7; row++) {
  let rowText = "";
    for (let column = 1; column <= 9; column++) {
      rowText += "K" + column + "R" + row + " ";
    }
    printOut(rowText);
}

/*
Use a "for" loop and a "while" loop to find all prime numbers greater than 1 and less than 200.
*/
for (let number = 2; number < 200; number++) {
  let isPrime = true;
  let divider = 2;
  while (divider < number) {
    if (number % divider === 0) {
      isPrime = false;
      break;
    }
    divider++;
  }
  if (isPrime) {
    printOut(number + " ");
  }
}