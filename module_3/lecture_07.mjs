"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

function canGoToTheMovies(personAge){
  if(personAge >= 16){
    return true;
  }
  /*
  masse kode som skal kjøres hvis ikke personen kan gå på kino
  */
  return false;
}

let canGo = canGoToTheMovies(18);
printOut("canGo = " + canGo.toString());