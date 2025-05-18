"use strict";

//-----------------------------------------------------------------------------------------
//----------- Import modules, mjs files  ---------------------------------------------------
//-----------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { TGameBoard, GameBoardSize, TBoardCell } from "./gameBoard.mjs";
import { TSnake, EDirection } from "./snake.mjs";
import { TBait } from "./bait.mjs";
import { TMenu } from "./menu.mjs";

//-----------------------------------------------------------------------------------------
//----------- variables and object --------------------------------------------------------
//-----------------------------------------------------------------------------------------
const eatFoodSound = new Audio("./Media/eatFood.mp3"); //Lyd spilt inn selv
const crashSound = new Audio("./Media/crash.mp3"); //Hentet lyd fra: https://pixabay.com/sound-effects/falled-sound-effect-278635/
const backgroundMusic = new Audio("./Media/backgroundMusic.mp3")//Hentet lyd fra: https://pixabay.com/sound-effects/2018-04-23-17816/
const buttonSound = new Audio("./Media/buttonSound.mp3") //Hentet lyd fra: https://pixabay.com/sound-effects/select-sound-121244/
const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);
let gameSpeed = 4; // Game speed multiplier;
let hndUpdateGame = null;
export const EGameStatus = { Idle: 0, Playing: 1, Pause: 2, GameOver: 3 };

// prettier-ignore
export const SheetData = {
  Head:     { x:   0, y:   0, width:  38, height:  38, count:  4 },
  Body:     { x:   0, y:  38, width:  38, height:  38, count:  6 },
  Tail:     { x:   0, y:  76, width:  38, height:  38, count:  4 },
  Bait:     { x:   0, y: 114, width:  38, height:  38, count:  1 },
  Play:     { x:   0, y: 155, width: 202, height: 202, count: 10 }, 
  GameOver: { x:   0, y: 647, width: 856, height: 580, count:  1 },
  Home:     { x:  65, y: 995, width: 169, height: 167, count:  1 },
  Retry:    { x: 614, y: 995, width: 169, height: 167, count:  1 },
  Resume:   { x:   0, y: 357, width: 202, height: 202, count: 10 },
  Number:   { x:   0, y: 560, width:  81, height:  86, count: 10 },
};

export const GameProps = {
  gameBoard: null,
  gameStatus: EGameStatus.Idle,
  snake: null,
  bait: null,
  menu: null,
  totalScore: 0,
  baitSpawnTime: null,
};

//------------------------------------------------------------------------------------------
//----------- Exported functions -----------------------------------------------------------
//------------------------------------------------------------------------------------------

export function newGame() {
  if (hndUpdateGame) clearInterval(hndUpdateGame); 
  GameProps.gameBoard = new TGameBoard();
  GameProps.snake = new TSnake(spcvs, new TBoardCell(5, 5)); // Initialize snake with a starting position
  GameProps.bait = new TBait(spcvs); // Initialize bait with a starting position
  gameSpeed = 4; // Reset game speed
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Oppdaterer spillet hvert 1000ms
  GameProps.totalScore = 0; // Resetter total score
  GameProps.menu.updateTotalScore(0);
}

export function baitIsEaten() {
  console.log("Bait eaten!");
  eatFoodSound.playbackRate = 2; 
  eatFoodSound.play(); 
  /* Logic to increase the snake size and score when bait is eaten */
  const timeUsed = Date.now() - GameProps.baitSpawnTime; // Kalkulerer tid brukt på å spise eplet
  const timeUsedInSec = Math.floor(timeUsed / 1000); 
  const score = Math.max (0,10 - timeUsedInSec); // Kalkulerer score basert på tid brukt
  GameProps.menu.updateTotalScore(score); // Oppdater scoren i menyen

  //Bonuspoeng ut fra tid brukt
  const bonus = GameProps.menu.addRemainingSeconds();
  GameProps.totalScore += bonus;
  GameProps.menu.updateTotalScore(GameProps.totalScore); // Oppdater scoren i menyen
  
  GameProps.snake.addSnakePart(); 
  GameProps.bait.update(); // Flytt bait til ny posisjon
  increaseGameSpeed();  // Increase game speed
}


//------------------------------------------------------------------------------------------
//----------- functions -------------------------------------------------------------------
//------------------------------------------------------------------------------------------

function loadGame() {
  cvs.width = GameBoardSize.Cols * SheetData.Head.width;
  cvs.height = GameBoardSize.Rows * SheetData.Head.height;

  GameProps.gameStatus = EGameStatus.Idle; // change game status to Idle

  /* Create the game menu here */ 
  GameProps.menu = new TMenu(spcvs);
  GameProps.menu.setPlayTrigger(() => {
    buttonSound.volume = 0.05; 
    buttonSound.play();
    newGame(); // Call this function from the menu to start a new game, remove this line when the menu is ready
    GameProps.gameStatus = EGameStatus.Playing; 
    backgroundMusic.volume = 0.5;
    backgroundMusic.play(); 
  })
  GameProps.menu.setHomeTrigger(() => {
    buttonSound.volume = 0.05;
    buttonSound.play();
    GameProps.gameBoard = null; 
    GameProps.snake = null; 
    GameProps.bait = null; 
    GameProps.gameStatus = EGameStatus.Idle; 
    backgroundMusic.volume = 0.5;
    backgroundMusic.pause(); 
  });
  GameProps.menu.setRestartTrigger(() => {
    buttonSound.volume = 0.05;
    buttonSound.play();
    backgroundMusic.volume = 0.5;
    backgroundMusic.play();
    newGame(); 
    GameProps.gameStatus = EGameStatus.Playing; 
  });
  GameProps.menu.setResumeTrigger(() => {
    buttonSound.volume = 0.05;
    buttonSound.play();
    backgroundMusic.volume = 0.5;
    backgroundMusic.play(); 
    GameProps.gameStatus = EGameStatus.Playing; 
    hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Oppdater spillintervall, restart
  });
  
  requestAnimationFrame(drawGame); // Start the game loop
  console.log("Game canvas is rendering!");
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Update game every 1000ms / gameSpeed
  console.log("Game canvas is updating!");
}


function drawGame() {
  // Clear the canvas
  spcvs.clearCanvas();
  switch (GameProps.gameStatus) {
    case EGameStatus.Idle:
      GameProps.menu.draw();
      break;
    case EGameStatus.Playing:
      GameProps.bait.draw();
      GameProps.snake.draw();
      GameProps.menu.draw();
      break;
    case EGameStatus.Pause:
      GameProps.bait.draw();
      GameProps.snake.draw();
      GameProps.menu.draw();
      break;
    case EGameStatus.GameOver:
      GameProps.menu.draw();
  }
  // Request the next frame
  requestAnimationFrame(drawGame);
}
  


function updateGame() {
  // Update game logic here
  switch (GameProps.gameStatus) {
    case EGameStatus.Playing:
      if (!GameProps.snake.update()) {
        backgroundMusic.pause();
        GameProps.gameStatus = EGameStatus.GameOver;
        crashSound.volume = 0.02;
        crashSound.play(); 
        console.log("Game over!");
      }
      break;
  }
}

function increaseGameSpeed() {
  /* Increase game speed logic here */
  gameSpeed += 0.5;
  clearInterval(hndUpdateGame); 
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Oppdater spillet hvert 1000 ms / gameSpeed
    console.log("Increase game speed!");
 }


//-----------------------------------------------------------------------------------------
//----------- Event handlers --------------------------------------------------------------
//-----------------------------------------------------------------------------------------

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      GameProps.snake.setDirection(EDirection.Up);
      break;
    case "ArrowDown":
      GameProps.snake.setDirection(EDirection.Down);
      break;
    case "ArrowLeft":
      GameProps.snake.setDirection(EDirection.Left);
      break;
    case "ArrowRight":
      GameProps.snake.setDirection(EDirection.Right);
      break;
    case " ":
      console.log("Space key pressed!");
      /* Pause the game logic here */
      if (GameProps.gameStatus === EGameStatus.Playing) {
        backgroundMusic.volume = 0.07;
        GameProps.gameStatus = EGameStatus.Pause;
        clearInterval(hndUpdateGame); // Oppdater spillintervall, pause
        buttonSound.volume = 0.05;
        buttonSound.play();
        console.log("Game paused!");
      } else if (GameProps.gameStatus === EGameStatus.Pause) {
        backgroundMusic.volume = 0.5;
        GameProps.gameStatus = EGameStatus.Playing;
        hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Oppdater spillintervall, restart
        buttonSound.volume = 0.05;
        buttonSound.play();
        console.log("Game resumed!");
      }
      break;
    default:
      console.log(`Key pressed: "${event.key}"`);
  }
}
//-----------------------------------------------------------------------------------------
//----------- main -----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

spcvs.loadSpriteSheet("./Media/spriteSheet.png", loadGame);
document.addEventListener("keydown", onKeyDown);




