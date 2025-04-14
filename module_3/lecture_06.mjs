"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

let myText = ""; // Dette er en global variable og kan brukes inne i funksjonen!

function addText(newText){
  myText += newText;
  const myVar = "Hei på deg"; // Dette er en lokal variabel kun synlig for funksjonen
}

addText("Hello World");
addText(newLine + "Dette er test 1");
addText(newLine + "Dette er test 2");

printOut(myText);