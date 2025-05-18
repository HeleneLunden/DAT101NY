"use strict";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
// import {} from "./snake.mjs"; FJERNES
import { EGameStatus, GameProps, SheetData } from "./game.mjs";

/* Use this file to create the menu for the snake game. */
export class TMenu {
  #spMenuBoard;
 // #spcvs; FJERNES
  #spPlay;
  //#spPause; FJERNES
  #buttonHome;
  #buttonRestart;
  #spResume;
  #playTrigger = null;
  #homeTrigger = null;
  #restartTrigger = null;
  #resumeTrigger = null;
  #totalScoreNumber;
  #timeScoreNumber;
  #currentCountdown = false;
  #gameOverScoreNumber
  constructor(aSpriteCanvas) {
    //this.#spcvs = aSpriteCanvas; FJERNES

    /* 
    Denne ble brukt til å starte spillet i en annen EGameStatus underveis i programmeringen. 
    GameProps.gameStatus = EGameStatus.Idle; 
    */

    //Play
    const playPos = new lib2D.TPosition(350, 220);
    this.#spPlay = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Play, playPos);
    this.#spPlay.animateSpeed = 15; // Start blinkingen
    this.#spPlay.onClick = () => {
     if (this.#playTrigger) this.#playTrigger();
      console.log("Play button clicked");
    };

    //Resume
    const resumePos = new lib2D.TPosition(350, 220);
    this.#spResume = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Resume, resumePos);
    this.#spResume.animateSpeed = 15; // Start blinkingen
    this.#spResume.onClick = () => {
     if (this.#resumeTrigger) this.#resumeTrigger();
      console.log("Resume button clicked");
    };

    //menu board
    const menuBoardPos = new lib2D.TPosition(25, 50);
    this.#spMenuBoard = new libSprite.TSprite(aSpriteCanvas, SheetData.GameOver, menuBoardPos);

    //home button
    const homePos = new lib2D.TPoint(90, 400);
    const homeShapeSize = { width: 169, height: 167 };
    this.#buttonHome = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Home, homePos);
    this.#buttonHome.shape.width = homeShapeSize.width;
    this.#buttonHome.shape.height = homeShapeSize.height;
    this.#buttonHome.onClick = () => {
      if (this.#homeTrigger) this.#homeTrigger();
      console.log("Home button clicked");
    };

    //restart button
    const restartPos = new lib2D.TPoint(640, 400);
    const restartShapeSize = { width: 169, height: 167 };
    this.#buttonRestart = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Retry, restartPos);
    this.#buttonRestart.shape.width = restartShapeSize.width;
    this.#buttonRestart.shape.height = restartShapeSize.height;
    this.#buttonRestart.onClick = () => {
      if (this.#restartTrigger) this.#restartTrigger();
      console.log("Restart button clicked");
    };

    //Total score - Brukt kode fra Arne Thomas / Foreleser (Total Score)
    const totalScorePos = new lib2D.TPoint(10, 80);
    this.#totalScoreNumber = new libSprite.TSpriteNumber(aSpriteCanvas, SheetData.Number, totalScorePos);
    this.#totalScoreNumber.scale = 0.9;
    this.#totalScoreNumber.visible = true; 
    this.#totalScoreNumber.alpha = 0.5; //gjennomsiktighet
    this.#totalScoreNumber.value = 0; // Startverdi

    //time score - Brukt kode fra Arne Thomas / Foreleser (Time Score)
    const timeScorePos = new lib2D.TPoint(14, 10);
    this.#timeScoreNumber = new libSprite.TSpriteNumber(aSpriteCanvas, SheetData.Number, timeScorePos);
    this.#timeScoreNumber.scale = 0.6;
    this.#timeScoreNumber.visible = true;
    this.#timeScoreNumber.alpha = 0.5; //gjennomsiktighet
    this.#timeScoreNumber.value = 0; // Startverdi

    //Score posisjon i GameOver
    let GameOverScoreNumber = new lib2D.TPoint(530, 260);
    this.#gameOverScoreNumber = new libSprite.TSpriteNumber(aSpriteCanvas, SheetData.Number, GameOverScoreNumber);
    this.#gameOverScoreNumber.scale = 0.9;
    this.#gameOverScoreNumber.visible = false;
    this.#gameOverScoreNumber.value = GameProps.totalScore; 
  }

  draw() {
    switch (GameProps.gameStatus) {
      case EGameStatus.Idle:
        //skjule
        this.#buttonHome.visible = false;
        this.#buttonRestart.visible = false;
        this.#spResume.visible = false;
        //tegne
        this.#spPlay.visible = true;
        this.#spPlay.draw();
        break;
      case EGameStatus.Playing:
        //skjule
        this.#spPlay.visible = false;
        this.#spResume.visible = false;
        //Tegne
        this.#totalScoreNumber.visible = true;
        this.#totalScoreNumber.draw();
        this.#timeScoreNumber.visible = true;
        this.#timeScoreNumber.draw();
       break;
      case EGameStatus.Pause:
        //skjule
        this.#spPlay.visible = false;
        //tegne
        this.#spResume.visible = true;
        this.#spResume.draw();
        this.#totalScoreNumber.visible = true;
        this.#totalScoreNumber.draw();
        this.#timeScoreNumber.visible = true;
        this.#timeScoreNumber.draw();
        break;
      case EGameStatus.GameOver: 
        //skjule
        this.#spPlay.visible = false;
        this.#spResume.visible = false;
        //tegne resten av meny
        this.#spMenuBoard.draw();
        this.#buttonHome.draw();
        this.#buttonHome.visible = true;
        this.#buttonRestart.visible = true;
        this.#buttonRestart.draw();
        //Score i GameOver
        this.#gameOverScoreNumber.value = GameProps.totalScore;
        this.#gameOverScoreNumber.visible = true;
        this.#gameOverScoreNumber.draw();
        break;
    }
    
  
  }
  setPlayTrigger(callBack) {
    this.#playTrigger = callBack;
  }
  setHomeTrigger(callBack) {
    this.#homeTrigger = callBack;
  }
  setRestartTrigger(callBack) {
    this.#restartTrigger = callBack;
  }
  setResumeTrigger(callBack) {
    this.#resumeTrigger = callBack;
  }
  updateTotalScore (value) { 
    this.#totalScoreNumber.value = value;
  }
  reduceTotalScore () {  //Brukt kode fra Arne Thomas / Foreleser
    if (this.#totalScoreNumber.value > 1) {
      this.#totalScoreNumber.value--;
      console.log ("ReduceTotalScore")
    } //Slutt på brukt kode
  } 
  startBaitCountdown () {
    this.#timeScoreNumber.value = 20;
    if (this.#currentCountdown) 
      return;
    
    this.#currentCountdown = true;
    let lastTick = Date.now();

    const countdown = () => {
      const now = Date.now();
      const elapsed = now - lastTick;

      if (elapsed >= 1000) {
        lastTick = now;
        if (this.#timeScoreNumber.value > 0) {
          this.#timeScoreNumber.value--;
        }
      }
    if (this.#timeScoreNumber.value > 0 && GameProps.gameStatus === EGameStatus.Playing) {
      requestAnimationFrame(countdown);
      } else {
        this.#currentCountdown = false;
      }
    };
      requestAnimationFrame(countdown);
  }

  updateTimeScore (score) {
    this.#timeScoreNumber.value += score;
  }

  addRemainingSeconds () {
    return this.#timeScoreNumber.value;
  }

} //slutt på TMenu