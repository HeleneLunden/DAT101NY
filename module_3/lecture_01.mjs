"use strict"
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));
printOut("Start");

const movieLimit = 16;
const ageLimit = 18;
let personAge1 = 18;
let personAge2 = 13;

if(personAge2 < personAge1){
    const age = personAge1;
    personAge1 = personAge2;
    personAge2 = age;
}

if(personAge1 < movieLimit){
    if(personAge2 > ageLimit){
        printOut("Du kan ikke gå, men du har med deg en som kan!");
    }else if(personAge2 >= movieLimit){
        printOut("Beklager, bare person 2 kan gå på kino!");
    }else{
        printOut("Beklager dere kan ikke gå på kino!");
    }
}else{
    printOut("Du kan gå på kino alene!");
}


printOut("Ferdig!");