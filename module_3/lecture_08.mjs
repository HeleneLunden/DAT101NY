"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

/*
Create a function that handles the conversion between Celsius, Fahrenheit, and Kelvin. Use three different
numbers and print all three combinations as integers (no decimals). Design the function to take two
parameters: first the temperature, then the temperature type/id. Use these parameters to convert to the
other two temperature types and print them. Formula:
      //Fahrenheit = (Kevin - 237.15)*9/5 + 32;
      //Celsius = Kelvin - 237.15
      //Celsius = (Fahrenheit - 32) * 5/9;

*/

const ETemperaturType = { Celsius: 1, Fahrenheit: 2, Kelvin: 3 };

function convertTemperature(aTemperature, aType) {
  let Fahrenheit = 0;
  let Celsius = 0;
  let Kelvin = 0;
  switch (aType) {
    case ETemperaturType.Celsius:
      printOut("Convert from Celsius");
      //convert to Fahrenheit
      //Fahrenheit = (Kevin - 237.15)*9/5 + 32;
      Celsius = aTemperature;
      Fahrenheit = (Celsius * 9) / 5 + 32;
      Kelvin = Celsius + 237.15;
      break;
    case ETemperaturType.Fahrenheit:
      printOut("Convert from Fahrenheit");
      break;
    case ETemperaturType.Kelvin:
      printOut("Convert from Kelvin");
      break;
  } // End switch

  printOut("Celsius = " + Celsius.toFixed(0));
  printOut("Fahrenheit = " + Fahrenheit.toFixed(0));
  printOut("Kelvin = " + Kelvin.toFixed(0));
} // End function

convertTemperature(37.5, ETemperaturType.Celsius);

/*
Create a function that calculates the price without VAT (sales tax). The function needs two arguments, one
for the price including VAT (gross amount) and one for the tax group in text (normal = 25%, food = 15%,
hotel, transport, and cinema = 10%). The text argument should not be case-sensitive. If the VAT group is
not correct, the text "Unknown VAT group!" should be printed. The function must return the price without
tax, i.e., the net price. Call the function four times with different gross amounts. One for each of the VAT
groups (25, 15, and 10) and one with an unknown group for example “goblins”. Tip: Use "NaN" to identify
that an unknown VAT group is returned from the function. Formula: net = (100 * gross) / (vat + 100)
*/

printOut("");

function calculateNetPrice(aPrice, aTaxGroup) {
  let net = NaN;
  let taxGroup = aTaxGroup.toUpperCase();
  let vat = NaN;

  printOut("taxGroup = " + taxGroup);

  switch (taxGroup) {
    case "NORMAL":
      vat = 25;
  }

  if (!Number.isNaN(vat)) {
    net = (100 * aPrice) / (vat + 100);
  }

  return net;
}

const netPrice1 = calculateNetPrice(100, "normal");
if (Number.isNaN(netPrice1)) {
  printOut("Unknown VAT group!");
} else {
  printOut("netPrice1 = " + netPrice1.toFixed(2));
}

const netPrice2 = calculateNetPrice(100, "goblins");
if (Number.isNaN(netPrice1)) {
  printOut("Unknown VAT group!");
} else {
  printOut("netPrice2 = " + netPrice2.toFixed(2));
}

printOut("");

/*
From mathematics, we have the following expression:
1 + 2 = 3
4 + 5 + 6 = 7 + 8
9 + 10 + 11 + 12 = 13 + 14 + 15
16 + 17 + 18 + 19 + 20 = 21 + 22 + 23 + 24
25 + 26 + 27 + 28 + 29 + 30 = 31 + 32 + 33 + 34 + 35
Create a function or functions that can test this expression for 200 lines. If the test fails, print out where the
two sides are not equal and stop the loop. If all 200 lines are OK, print "Maths fun!"
*/

function testIfMathIsFun() {
  let op = 1;
  let line = 1;
  // Left side
  let ok = false;
  do {
    let sumLeft = 0;
    for (let left = 0; left < line + 1; left++) {
      sumLeft += op;
      op++;
    }

    let sumRight = 0;
    for (let right = 0; right < line; right++) {
      sumRight += op;
      op++;
    }

    if (sumLeft !== sumRight) {
      ok = false;
      printOut("Error in line " + line.toString());
    }else{
      ok = true;
    }
    line++;

    if(line > 200){
      printOut("Math is Fun!");
      break;
    }
    
  } while (ok);
}

testIfMathIsFun();


printOut(" ");
/*
  Use recursion to count from 1 to 10 and then back to 1 again. 
*/
const countTo = 10;
function count(aNumber) {
  if (aNumber <= countTo) {
    printOut(aNumber.toString());
    count(aNumber + 1);
    printOut(aNumber.toString());
  }
}

count(1);