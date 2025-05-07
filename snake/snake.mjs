"use strict";
//------------------------------------------------------------------------------------------
//----------- Import modules, mjs files  ---------------------------------------------------
//------------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import { GameProps, SheetData, baitIsEaten } from "./game.mjs"
import { TBoardCell, EBoardCellInfoType } from "./gameBoard.mjs";
import { TMenu } from "./menu.mjs";

//------------------------------------------------------------------------------------------
//----------- variables and object ---------------------------------------------------------
//------------------------------------------------------------------------------------------
const ESpriteIndex = {UR: 0, LD: 0, RU: 1, DR: 1, DL: 2, LU: 2, RD: 3, UL: 3, RL: 4, UD: 5}; //Kroppsdeler og sving
export const EDirection = { Up: 0, Right: 1, Left: 2, Down: 3 }; // Retninger


//-----------------------------------------------------------------------------------------
//----------- Classes ---------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
class TSnakePart extends libSprite.TSprite { //Klasse for alle slangedelene
  constructor(aSpriteCanvas, aSpriteInfo, aBoardCell) {
    const pos = new lib2D.TPoint(aBoardCell.col * aSpriteInfo.width, aBoardCell.row * aSpriteInfo.height);
    super(aSpriteCanvas, aSpriteInfo, pos);
    this.boardCell = aBoardCell;
    let boardCellInfo = GameProps.gameBoard.getCell(aBoardCell.row, aBoardCell.col);
    this.direction = boardCellInfo.direction;
    boardCellInfo.infoType = EBoardCellInfoType.Snake;
    this.index = this.direction;

    this.spcvs = aSpriteCanvas;
  }

  update() {
    this.x = this.boardCell.col * this.spi.width;
    this.y = this.boardCell.row * this.spi.height;
  }

} // class TSnakePart


class TSnakeHead extends TSnakePart { //Klasse for slangehodet
  constructor(aSpriteCanvas, aBoardCell) {
    super(aSpriteCanvas, SheetData.Head, aBoardCell);
    this.newDirection = this.direction;
  }

 setDirection(aDirection) { //Retning
    if ((this.direction === EDirection.Right || this.direction === EDirection.Left) && (aDirection === EDirection.Up || aDirection === EDirection.Down)) {
      this.newDirection = aDirection;
    } else if ((this.direction === EDirection.Up || this.direction === EDirection.Down) && (aDirection === EDirection.Right || aDirection === EDirection.Left)) {
      this.newDirection = aDirection;
    }
  }

  update() { //Flytter hodet + sjekker for eple eller kollisjon
    GameProps.gameBoard.getCell(this.boardCell.row,this.boardCell.col).direction = this.newDirection;
    
    switch (this.newDirection) {
      case EDirection.Up:
        this.boardCell.row--;
        break;
      case EDirection.Right:
        this.boardCell.col++;
        break;
      case EDirection.Left:
        this.boardCell.col--;
        break;
      case EDirection.Down:
        this.boardCell.row++;
        break;
    }

    this.direction = this.newDirection;
    this.index = this.direction;

    if (this.checkCollision()) {
      return false; // Kollisjon, ikke fortsett
    }
    // Oppdater posisjonen til slangeelementet
    super.update();
    //Check if the snake head is on a bait cell
    const boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    if(boardCellInfo.infoType === EBoardCellInfoType.Bait) {
      baitIsEaten();
    }else{
      /* Decrease the score if the snake head is not on a bait cell */
    }
    boardCellInfo.infoType = EBoardCellInfoType.Snake; // Set the cell to Snake
    return true; // No collision, continue
    }

  checkCollision() {
    let collision = this.boardCell.row < 0 || this.boardCell.row >= GameProps.gameBoard.rows || this.boardCell.col < 0 || this.boardCell.col >= GameProps.gameBoard.cols;
    if(!collision) {
      const boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
      collision = boardCellInfo.infoType === EBoardCellInfoType.Snake;
    }
    return collision; // Collision detected
    }
}

class TSnakeBody extends TSnakePart {
  constructor(aSpriteCanvas, aBoardCell ) {
    super(aSpriteCanvas, SheetData.Body, aBoardCell);
    this.index = ESpriteIndex.RL;    
  }

  update() {
    let spriteIndex = ESpriteIndex.RL;
    let boardCellInfo;
    
    switch (this.direction) {
      case EDirection.Up:
        this.boardCell.row--;
        boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
        if (boardCellInfo.direction !== this.direction) {
          switch (boardCellInfo.direction) {
            case EDirection.Left:
              spriteIndex = ESpriteIndex.UL;
              break;
            case EDirection.Right:
              spriteIndex = ESpriteIndex.UR;
              break;
          }
        } else {
          spriteIndex = ESpriteIndex.UD;
        }
        break;
      
      case EDirection.Right:
        this.boardCell.col++;
        boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
        if (boardCellInfo.direction !== this.direction) {
          switch (boardCellInfo.direction) {
            case EDirection.Up:
              spriteIndex = ESpriteIndex.RU;
              break;
            case EDirection.Down:
              spriteIndex = ESpriteIndex.RD;
              break;
          }
        } else {
          spriteIndex = ESpriteIndex.RL;
        }
        break;
      
      case EDirection.Left:
        this.boardCell.col--;
        boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
        if (boardCellInfo.direction !== this.direction) {
          switch (boardCellInfo.direction) {
            case EDirection.Up:
              spriteIndex = ESpriteIndex.LU;
              break;
            case EDirection.Down:
              spriteIndex = ESpriteIndex.LD;
              break;
          }
        } else {
          spriteIndex = ESpriteIndex.RL;
        }
        break;
      
      case EDirection.Down:
        this.boardCell.row++;
        boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
        if (boardCellInfo.direction !== this.direction) {
          switch (boardCellInfo.direction) {
            case EDirection.Left:
              spriteIndex = ESpriteIndex.DR;
              break;
            case EDirection.Right:
              spriteIndex = ESpriteIndex.DL;
              break;
          }
        } else {
          spriteIndex = ESpriteIndex.UD;
        }
        break;
    }
    
    this.direction = boardCellInfo.direction;
    this.index = spriteIndex;
    super.update();
  }

  clone(){
    const newBody = new TSnakeBody(this.spcvs, new TBoardCell(this.boardCell.col, this.boardCell.row));
    newBody.index = this.index;
    newBody.direction = this.direction;
    return newBody;
  }

} // class TSnakeBody


class TSnakeTail extends TSnakePart {
  constructor(aSpriteCanvas, aCol, aRow) {
    super(aSpriteCanvas, SheetData.Tail, aCol, aRow);
  }

  update() {

    const currentCell = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    if (currentCell) {
      currentCell.infoType = EBoardCellInfoType.Empty;
    }
    switch (this.direction) {
      case EDirection.Up:
        this.boardCell.row--;
        break;
      case EDirection.Right:
        this.boardCell.col++;
        break;
      case EDirection.Left:
        this.boardCell.col--;
        break;
      case EDirection.Down:
        this.boardCell.row++;
        break;
    }
    const newCell = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    this.direction = newCell.direction;
    this.index = this.direction;
    super.update();
  }

} // class TSnakeTail


export class TSnake {
  #isDead = false;
  #head = null;
  #body = null;
  #tail = null;
  #spcvs = null;
  constructor(aSpriteCanvas, aBoardCell) {
    this.#head = new TSnakeHead(aSpriteCanvas, aBoardCell);
    let col = aBoardCell.col - 1;
    this.#body = [new TSnakeBody(aSpriteCanvas, new TBoardCell(col, aBoardCell.row))];
    col--;
    this.#tail = new TSnakeTail(aSpriteCanvas, new TBoardCell(col, aBoardCell.row));
    this.#spcvs = aSpriteCanvas;
  } // constructor

  draw() {
    this.#head.draw();
    for (let i = 0; i < this.#body.length; i++) {
      this.#body[i].draw();
    }
    this.#tail.draw();
  } // draw


  //Oppdaterer slangen og gjør at den blir lengre
  //Returnerer true hvis slangen lever
  update() {
    if (this.#isDead) {
      return false; // Slangen er død, ikke fortsett
    }  
    
      let lastBodyPart = null; //lag kopi av siste kroppsdel før den flytter seg
      if (this.#body.length > 0 && this.#body[this.#body.length - 1].wasGrown) {
        lastBodyPart = this.#body[this.#body.length - 1].clone();
      }
  
    if (this.#head.update()) { //oppdater:sjekk for kollisjon
      for (let i = 0; i < this.#body.length; i++) {
        this.#body[i].update(); 
      }
       
      
      if (lastBodyPart) { //Når slangen vokser, legg til kopi av siste kroppsdel
        this.#body.push(lastBodyPart);
        delete this.#body[this.#body.length - 1].wasGrown;
      } else { //Slangen vokser ikke, flytt halen videre
        this.#tail.update(); 
      }
    return true; // Slangen lever
    }else {
      this.#isDead = true;
      return false; // Kollisjon, ikke fortsett
    }
    return true; // Ingen kollisjon, fortsett
    }

  //Sier at slangen skal vokse i neste oppdatering
  addSnakePart () {
    if(this.#body.length > 0) {
      this.#body[this.#body.length - 1].wasGrown = true;
    }
  }

  //Setter ny retning på hodet
  setDirection(aDirection) {
    this.#head.setDirection(aDirection);
  } 
}




  