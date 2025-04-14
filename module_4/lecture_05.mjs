import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

const girlsName = ["Alice", "Betty", "Cathy", "Diana", "Eve", "Fiona", "Gina", "Helen", "Irene", "Jane"];

const newGirlsName = girlsName.splice(1,4);
printOut(girlsName.join(", "));
printOut("");
printOut(newGirlsName.join(", "));