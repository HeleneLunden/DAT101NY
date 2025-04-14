import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));
("use strict");

let op1 = 0;
op1 = op1 + 1;
op1 += 1;
op1++;
op1--;

op1 = 10;
op1 = op1 * 2;
op1 *= 2;
op1 = 4;
op1 = op1**2; //Opphøyd i 2.

for(let i = 0; i <= 16; i++) {
  op1 = i % 10; //Resten av i delt på 4.
  printOut(`${i} % 10 = ${op1}`);
}
printOut("Programmet er ferdig!");
