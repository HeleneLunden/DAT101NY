"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));


function sum(number1, number2){
  const result = number1 + number2;
  return result;
}

const sum1 = sum(10, 10);
printOut("sum1 = " + sum1.toString());
const sum2 = sum(10, 30);
printOut("sum2 = " + sum2.toString());
const sum3 = sum(sum1, sum2);
printOut( "sum3 = " + sum3.toString())
