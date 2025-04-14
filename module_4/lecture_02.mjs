import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

/* This is a lecture about modules and how to use classes in JavaScript. The students see your code :) */

//Enum account type
const EAccountType = { Saving: 1, Checking: 2, Credit: 3, Loan: 4 };

// TBankAccount class with protected balance

class TBankAccount {
    #balance;
    #accountType;
    constructor(aAccountType) {
        // Initialize the balance to 100
        this.#balance = 100;
        this.#accountType = aAccountType;
    }
    //Use getter to access the private field
    get balance(){
        return this.#balance;
    }

    withdraw(aAmount){
        //Test if the amount is less than the balance
        if(aAmount <= this.#balance){
            this.#balance -= aAmount;
        } else {
            printOut("Insufficient funds");
        }
    }

    get accountType(){
        return this.#accountType;
    }

    set accountType(aAccountType){
        this.#accountType = aAccountType;
        printOut("Account type changed to " + this.#accountType);
    }

}

// account instance
const account1 = new TBankAccount(EAccountType.Saving);
printOut("account1: " + account1.balance);
account1.withdraw(200);
printOut("account1: " + account1.balance);
printOut("account1: " + account1.accountType);
account1.accountType = EAccountType.Loan;
printOut("account1: " + account1.accountType);
