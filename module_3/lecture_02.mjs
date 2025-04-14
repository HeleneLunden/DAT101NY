"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

/*
Create a program that can guess a number between 1 and 60. Declare a variable and assign it a value, for
example, 45. Let the computer "guess" by generating a random number. Use a "while" loop and the
"random" function. Keep the "while" loop running as long as the "guessed number" is incorrect.
Print the number once the "while" loop has completed. 
You do not need to print anything while the "while" loop is in progress
*/

const answerNumber = 45;
let guessNumber = 0;
while(answerNumber !== guessNumber){
  guessNumber = Math.ceil(Math.random() * 60);
}
printOut("Guess Number = " + guessNumber.toString());
printOut(" ");

/*
Take the program from part 2 and expand it to guess a number between 1 and one million. Print the
number of guesses as well as the number of milliseconds it took to guess the number. HINT: Use the
Date.now() function to measure time.
*/
guessNumber = 0;
let guessCount = 0;
const startTime = Date.now();
while(answerNumber !== guessNumber){
  guessCount++;
  guessNumber = Math.ceil(Math.random() * 1000000);
}
const endTime = Date.now();
const timeUsed = endTime - startTime;
printOut("Antall gjetninger " + guessCount.toString() + " tok " + timeUsed.toString() + " ms");
