"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

const CurrencyTypes = {
  NOK: { value: 1.0000, name: "Norske kroner", denomination: "kr" },
  EUR: { value: 0.0985, name: "Europeiske euro", denomination: "€" },
  USD: { value: 0.1891, name: "United States dollar", denomination: "$" },
  GBP: { value: 0.0847, name: "Pound sterling", denomination: "£" },
  INR: { value: 7.8389, name: "Indiske rupee", denomination: "₹" },
  AUD: { value: 0.1581, name: "Australske dollar", denomination: "A$" },
  PHP: { value: 6.5189, name: "Filippinske peso", denomination: "₱" },
  SEK: { value: 1.0580, name: "Svenske kroner", denomination: "kr" },
  CAD: { value: 0.1435, name: "Canadiske dollar", denomination: "C$" },
  THB: { value: 3.3289, name: "Thai baht", denomination: "฿" }
};

const AccountType = {
  Normal: "Brukskonto",
  Savings: "Sparekonto",
  Credit: "Kredittkonto",
  Pension: "Pensjonskonto",
};

class TAccount {
  #type;
  #balance;
  #withdrawCount;
  #currencyType;

  constructor(aType) {
    this.#type = aType;
    this.#balance = 0;
    this.#withdrawCount = 0;
    this.#currencyType = CurrencyTypes.NOK;
  }

  toString() {
    return this.#type;
  }

  setType(aType) {
    let text = "Account type has been changed from " + this.#type;
    this.#type = aType;
    this.#withdrawCount = 0;
    text += " to " + this.#type;
    printOut(text);
  }

  getBalance() {
    return this.#balance;
  }

  deposit(aAmount, aType = CurrencyTypes.NOK) {
    const newAmount = aAmount / this.#currencyConvert(aType);
    this.#balance += newAmount;
    this.#withdrawCount = 0;
    let text = "Deposit of " + aAmount + " " + aType.name;
    text += ", new balance is ";
    text += this.#balance.toFixed(2) + this.#currencyType.denomination;
    printOut(text);
  }

  withdraw(aAmount, aType = CurrencyTypes.NOK) {
    let canWithdraw = true;
    let text = "";
    const newAmount = aAmount / this.#currencyConvert(aType);
    switch (this.#type) {
      case AccountType.Savings:
        if (this.#withdrawCount < 3) {
          this.#withdrawCount++;
          canWithdraw = true;
        } else {
          canWithdraw = false;
          text = "Cannot withdraw more than 3 times from a " + this.#type + " account.";
        }
        break;
      case AccountType.Pension:
        canWithdraw = false;
        text = "Cannot withdraw from a " + this.#type + " account.";
        break;
    }

    if (canWithdraw) {
      this.#balance -= newAmount;
      text = "Withdraw of " + aAmount + " " + aType.name + ", new balance is ";
      text += this.#balance.toFixed(2) + this.#currencyType.denomination;
    }
    printOut(text);
  }// End of function withdraw

  setCurrencyType(aNewCurrencyType) {
    if(this.#currencyType === aNewCurrencyType){
      return;
    }
    this.#balance = this.#balance * this.#currencyConvert(aNewCurrencyType);
    let text = "The account currency has been changed from ";
    text += this.#currencyType.name + " to " + aNewCurrencyType.name;
    text += newLine + "New balance is ";
    text += this.#balance.toFixed(2) + aNewCurrencyType.denomination;
    this.#currencyType = aNewCurrencyType;
    printOut(text);
  }

  #currencyConvert(aType){
    return CurrencyTypes.NOK.value / this.#currencyType.value * aType.value;
  }

}// End of class TAccount
printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(AccountType.Normal + ", " + AccountType.Savings + ", " + AccountType.Credit + ", " + AccountType.Pension);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let myAccount = new TAccount(AccountType.Normal);
printOut("myAccount: " + myAccount.toString());
myAccount.setType(AccountType.Savings);
printOut("myAccount: " + myAccount.toString());
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.deposit(100);
myAccount.withdraw(25);
printOut("My account balance is: " + myAccount.getBalance());
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.deposit(25);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.setType(AccountType.Pension);
myAccount.withdraw(10);
myAccount.setType(AccountType.Savings);
myAccount.withdraw(10);

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.deposit(150);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.setCurrencyType(CurrencyTypes.SEK);
myAccount.setCurrencyType(CurrencyTypes.USD);
myAccount.setCurrencyType(CurrencyTypes.NOK);
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.deposit(12, CurrencyTypes.USD);
myAccount.withdraw(10, CurrencyTypes.GBP);
myAccount.setCurrencyType(CurrencyTypes.CAD);
myAccount.setCurrencyType(CurrencyTypes.INR);
myAccount.withdraw(100.927, CurrencyTypes.SEK);
printOut(newLine);
