"use strict";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import {} from "./snake.mjs";
import { EGameStatus, GameProps, SheetData } from "./game.mjs";

/* Use this file to create the menu for the snake game. */
export class TMenu {
  #spMenuBoard;
  #spcvs;
  #spPlay;
  #spPause;
  #buttonHome;
  #buttonRestart;
  #spResume;
  #playTrigger = null;
  #homeTrigger = null;
  #restartTrigger = null;
  #resumeTrigger = null;
  constructor(aSpriteCanvas) {
    this.#spcvs = aSpriteCanvas;

    // kode for å jukse litt og starte spillet direkte i en annen status enn EGameStatus.idle
    GameProps.gameStatus = EGameStatus.Idle;

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
  }


  
  draw() {
    switch (GameProps.gameStatus) {
      case EGameStatus.Idle:
        //skjulte knapper
        this.#buttonHome.visible = false;
        this.#buttonRestart.visible = false;
        this.#spResume.visible = false;
        //tegner knapper
        this.#spPlay.visible = true;
        this.#spPlay.draw();
        break;
      case EGameStatus.Playing:
        //skjulte knapper
        this.#spPlay.visible = false;
        this.#spResume.visible = false;
        break;
      case EGameStatus.Pause:
        //skjulte knapper
        this.#spPlay.visible = false;
        //tegner knapper
        this.#spResume.visible = true;
        this.#spResume.draw();
        break;
      case EGameStatus.GameOver: 
        this.#spPlay.visible = false;
        this.#spResume.visible = false;
        //tegner knapper
        this.#spMenuBoard.draw();
        this.#buttonHome.draw();
        this.#buttonHome.visible = true;
        this.#buttonRestart.visible = true;
        this.#buttonRestart.draw();
        break;
    }
    
  //
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
} //slutt på TMenu
