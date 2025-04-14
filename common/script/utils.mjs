"use strict";

let DOMTextOut = null;
export const newLine = "<br/>";
export const NEWLine = newLine;

export function initPrintOut(aDomElement) {
  DOMTextOut = aDomElement;
}

export function printOut(aText) {
  try{
    if(typeof aText !== "string") aText = aText.toString();
    //aText = aText.replace(newLine, "");
    if (DOMTextOut.innerHTML.length !== 0) {
      DOMTextOut.innerHTML += newLine;
    }
    DOMTextOut.innerHTML += aText;  
  }catch(e){
    console.error(DOMTextOut.innerHTML += newLine + "Error in printOut: " + e);
  }
}
