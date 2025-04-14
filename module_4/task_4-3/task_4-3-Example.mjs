"use strict";

const CarTypes = [
  { value: 1, caption: "Aston Martin" },
  { value: 2, caption: "Bentley" },
  { value: 3, caption: "Alfa Romeo" },
  { value: 4, caption: "Ferrari" },
  { value: 5, caption: "Subaru" },
  { value: 6, caption: "Porsche" },
  { value: 7, caption: "Tesla" },
  { value: 8, caption: "Toyota" },
  { value: 9, caption: "Renault" },
  { value: 10, caption: "Peugeot" },
  { value: 11, caption: "Suzuki" },
  { value: 12, caption: "Mitsubishi" },
  { value: 13, caption: "Nissan" },
];

const GirlsNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

const MovieGenre = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

//--- Part 1 ----------------------------------------------------------------------------------------------
/*
Part 1: Rectangle Calculations (10 points)
Create code in cmbTask1CalculateClick to calculate the perimeter and area of the given rectangle.
Use the values from the textboxes and display the results in the labels.
*/
const cmbTask1Calculate = document.getElementById("cmbTask1Calculate");
cmbTask1Calculate.addEventListener("click", cmbTask1CalculateClick);
function cmbTask1CalculateClick() {
 //TODO: Hent verdier fra input-feltene, prøv å finne ut riktige id'er
 const txtRectHeight = document.getElementById("txtRectHeight");
  const txtRectWidth = document.getElementById("txtRectWidth");
  const height = Number(txtRectHeight.value);
  const width = Number(txtRectWidth.value);
  //TODO: Beregn omkrets og areal
  const perimeter = (height + width + height + width);
  const area = (height * width);
  const txtTask1Output = document.getElementById("txtTask1Output");
  txtTask1Output.innerHTML = "Omkrets: " + perimeter + "&nbsp; Areal: " + area;
}


//--- Part 2 ----------------------------------------------------------------------------------------------
/*
Create an event function that is triggered if you press a key while txtTask2Word has keyboard focus.
Every time the user presses "return" or "enter",
add the word to the task2Words array and print how many words and all the words in txtTask2Output.
Clear the input field every time the user presses "enter" or "return".

 * Tip: txtTask2Word.addEventListener("keypress", txtTask2WordKeyPress)
*/

const txtTask2Word = document.getElementById("txtTask2Word");
txtTask2Word.addEventListener("keypress", txtTask2WordKeyPress);
let task2Words = [];
const txtTask2Output = document.getElementById("txtTask2Output");
//TODO: Lage callback-funksjonen txtTask2WordKeyPress
function txtTask2WordKeyPress(aEvent) {
  const key = aEvent.key;
  switch(key) {
    case "Enter":
      const words = txtTask2Word.value.split(" ");
      txtTask2Word.value = "";
      task2Words = task2Words.concat(words);
      txtTask2Output.innerHTML = "Number of words: " + task2Words.length + "<br>" + task2Words.join(" ");
      console.log(task2Words);
      break;
  }
}




//--- Part 3 ----------------------------------------------------------------------------------------------
/*
Part 3: Checkbox Evaluation (15 points)
Create a click event function to check which of the checkboxes are selected.
And print the result in txtTask3Output.
*/
const cmbTask3CheckAnswer = document.getElementById("cmbTask3CheckAnswer");
cmbTask3CheckAnswer.addEventListener("click", cmbTask3CheckAnswerClick);
const txtTask3Output = document.getElementById("txtTask3Output");

let text = ""; //Tømmer teksten, gjør klar til ny utskrift.
function cmbTask3CheckAnswerClick() {
  const chkTask3 = document.getElementsByName("chkTask3");
  for(let i = 0; i < chkTask3.length; i++) {
    /*
    TODO: Sjekk om checkboxen er huket av. og skriv ut resultatet i txtTask3Output
          Skriv også ut hvilken checkbox som er huket av, og hva verdien er.
          Det er også mulig å skrivet hele teksten til hver checkbox i txtTask3Output.
    */
   const checkBox = chkTask3[i];
   if(checkBox.checked){
    const value = checkBox.value;
    if(value === "4"){
      text += "Du har valgt nummer " + value + ". Dette kan du ikke mene!!???<br />"

    }else{
      text += "Du har valgt nummer " + value + ".<br />"
    }
   }

  }
  txtTask3Output.innerHTML = text;
  text = ""; //Rømmer teksten, klargjør til neste klikk!
}

//--- Part 4 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

//--- Part 5 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

//--- Part 6 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

//--- Part 7 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
