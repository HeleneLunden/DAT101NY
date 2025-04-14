import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));
("use strict");

const op1 = 2;
const op2 = 2;
let res = op1 === op2;
for (let i = 0; i < 10; i++) {
  printOut(res.toString());
  res = !res;
}

printOut("Programmet er ferdig!");
