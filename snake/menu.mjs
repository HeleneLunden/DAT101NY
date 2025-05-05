"use strict";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import {  } from "./snake.mjs";
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
  constructor (aSpriteCanvas) {
   this.#spcvs = aSpriteCanvas; 

  // kode for jukse litt og starte spillet direkte i en annen status enn EGameStatus.idle
  GameProps.status = EGameStatus.Idle;

 //Play
  const playPos = new lib2D.TPosition(350,220);
  this.#spPlay = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Play, playPos);
  this.#spPlay.animateSpeed = 15; // Start blinkingen 
  this.#spPlay.onClick = () => {
    console.log("Play button clicked");}
//Startgame?^

  //Resume
  const resumePos = new lib2D.TPosition(350,220);
  this.#spResume = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Resume, resumePos);
  this.#spResume.animateSpeed = 15; // Start blinkingen 
  
  /*
  //home button
  const homePos = new lib2D.TPosition (700,500);
  this.#spHome = new libSprite.TSpriteButton (aSpriteCanvas, SheetData.Home, homePos);

  //restart button
  const restartPos = new lib2D.TPosition (100,500);
  this.#spRestart = new libSprite.TSpriteButton (aSpriteCanvas, SheetData.Retry, restartPos);
  */

  //menu board
  const menuBoardPos = new lib2D.TPosition (25,50);
  this.#spMenuBoard = new libSprite.TSprite(aSpriteCanvas, SheetData.GameOver, menuBoardPos);
   
    //home button
    const homePos = new lib2D.TPoint (90,400);
    const homeShapeSize = {width: 169, height: 167}
    this.#buttonHome = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Home, homePos);
    this.#buttonHome.shape.width = homeShapeSize.width;
    this.#buttonHome.shape.height = homeShapeSize.height;

    //restart button
    const restartPos = new lib2D.TPoint (640,400);
    const restartShapeSize = {width: 169, height: 167}
    this.#buttonRestart = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Home, restartPos);
    this.#buttonRestart.shape.width = restartShapeSize.width;
    this.#buttonRestart.shape.height = restartShapeSize.height;
    }

draw() {
  switch (GameProps.status) {
    case EGameStatus.Idle:
      //skjulte knapper
      this.#buttonHome.visible = false;
      this.#buttonRestart.visible = false;
      this.#spResume.visible = false;
      //tegner knapper
      this.#spPlay.draw();
      break;
    case EGameStatus.Playing:
      break;
    case EGameStatus.Pause:
      //skjulte knapper
      this.#spPlay.visible = false;
      //tegner knapper
      this.#spResume.draw();
      break;
    case EGameStatus.GameOver:
      this.#spPlay.visible = false;
      this.#spResume.visible = false;
      //tegner knapper
      this.#spMenuBoard.draw();
      break;
    }
  }
}

/*
  #onClick = () => {
    if (this.#activeSprite === this.#spPlay) {
      GameProps.status = EGameStatus.Playing;
      this.#spcvs.style.cursor = "default";
    }
  */