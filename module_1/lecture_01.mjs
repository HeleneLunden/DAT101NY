"use strict"
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

const inputAge = document.getElementById("inputAge");
const inputSetAge = document.getElementById("inputSetAge");
inputSetAge.addEventListener("click", inputSetAgeClick);

printOut("Test");

const A = 3;
const B = 2;


let x = A+B;
printOut("verdien av x er " + x);

x = A*B;
printOut("verdien av x er " + x);


function inputSetAgeClick(){
    const age = parseInt(inputAge.value);
    if(age >= 18){
        printOut("Du kan gå på kino");
    }else{
        printOut("Beklager, spill heller et spill!");
    }
}