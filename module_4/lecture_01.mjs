import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));


/* This is a lecture about modules and how to use classes in JavaScript. The students see your code :) */

// Make a person class, with a constructor that takes a first and last name plus email.

// Address class
class TAddress {
    constructor(aStreet, aZip, aCity) {
        this.street = aStreet;
        this.zip = aZip;
        this.city = aCity;
    }
}

// The person class inherits from the address class
class TPerson extends TAddress {
    constructor(aFirstName, aLastName, aEMail, aStreet, aZip, aCity) {
        super(aStreet, aZip, aCity);
        this.firstName = aFirstName;
        this.lastName = aLastName;
        this.email = aEMail;
    }
}

// Employee class inherits from person class
class TEmployee extends TPerson {
    constructor(aFirstName, aLastName, aEMail, aStreet, aZip, aCity, aSalary) {
        super(aFirstName, aLastName, aEMail, aStreet, aZip, aCity);
        this.salary = aSalary;
    }
}

// Instance of an employee
const employee1 = new TEmployee(
    "Kari", "Norman", "kari.norman@norge.no", "Kongens gate 1", "1234", "Oslo", 250
);
printOut(
    "employee1: " + employee1.firstName + " " + employee1.lastName + " earns " + employee1.salary + " NOK."
);

printOut("employee1 lives in " + employee1.city + ", " + employee1.street + ", " + employee1.zip + ".");
