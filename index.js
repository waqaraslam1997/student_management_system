#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
;
class Student {
    constructor(name, courses) {
        this.ID = Math.floor(10000 + Math.random() * 90000);
        this.balance = 18000;
        this.name = name;
        this.courses = courses;
    }
    enroll(course) {
        console.log(chalk.yellow.bold(`
            ${this.name}, has Enrolled in: ${course} Successfully.
        `));
    }
    viewBalance() {
        console.log(chalk.yellow.bold(`
            ${this.name.toUpperCase()}'s Balance is ${this.balance}
        `));
    }
    payTutionFees(amount) {
        if (amount > this.balance) {
            console.log(`
                You have Paid! Remaining Fees is ${this.balance}
            `);
        }
        else {
            this.balance -= amount;
            console.log(chalk.magenta.bold(`
                ${this.name.toUpperCase()} paid tution fees, amounting to Rs. ${amount}
                New Balance is ${this.balance}
            `));
        }
    }
    showStatus() {
        console.log(chalk.green.bold(`
            =======================================
            Name        :      ${this.name.toUpperCase()}
            ID          :      ${this.ID}
            Course      :      ${this.courses}
            Balance     :      ${this.balance}          
            ======================================= 
            `));
    }
    logout() {
        console.log(chalk.red(`
            ${this.name.toUpperCase()}, Logout Successfully!
        `));
    }
}
const students = [];
async function Register() {
    const answer = await inquirer.prompt([
        {
            type: "input",
            message: "What is your Full Name? ",
            name: "name",
            validate(input) {
                if (isNaN(input)) {
                    return true;
                }
                else {
                    return "Please Enter Valid Name";
                }
            },
        },
        {
            type: "list",
            name: "course",
            choices: ['WEB3', 'Web-Development', 'Mobile Application', 'BlockChain'],
            message: "Select Course you want to Enrolled in: "
        }
    ]);
    const newStudent = new Student(answer.name, answer.course);
    console.log(chalk.greenBright.bold(`
            Student Name: ${newStudent.name.toUpperCase()}! having ID: ${newStudent.ID} Successfully Registered.
        `));
    students.push(newStudent);
}
async function Login() {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Your Name: ",
            validate(input) {
                if (isNaN(input)) {
                    return true;
                }
                else {
                    return "Please Enter Valid Name";
                }
            },
        },
        {
            type: "number",
            name: "ID",
            message: "Your Identity Number: ",
            validate(input) {
                if (!isNaN(input)) {
                    return true;
                }
                else {
                    return "Please Enter Valid ID";
                }
            },
        },
    ]);
    const studentfound = students.find((val) => answer.name.toUpperCase == val.name.toUpperCase && answer.ID == val.ID);
    if (studentfound) {
        console.log(chalk.greenBright.bold(`
            ${studentfound.name.toUpperCase()}, Logged in Successfully!
        `));
        while (true) {
            const { answer } = await inquirer.prompt([
                {
                    type: "list",
                    name: "answer",
                    message: "Perform action.",
                    choices: ['Pay Tution Fees', 'View Balance', 'Show Status', 'Logout'],
                }
            ]);
            switch (answer) {
                case 'Pay Tution Fees':
                    const { fees } = await inquirer.prompt({
                        type: "list",
                        name: "fees",
                        choices: ['4500', '9000', '13500', '18000'],
                        message: "Please Pay Tution Fees: "
                    });
                    studentfound.payTutionFees(fees);
                    break;
                case 'Show Status':
                    studentfound.showStatus();
                    break;
                case 'View Balance':
                    studentfound.viewBalance();
                    break;
                case 'Logout':
                    studentfound.logout();
                    return;
                default:
                    break;
            }
        }
    }
    else {
        console.log(chalk.red.bold(`\n\tYou have not Registered Yet, Please Register.\n`));
    }
}
async function main() {
    console.clear();
    console.log(chalk.blueBright.bold(`
        <<== Welcome to Xtreme Management! ==>>
    `));
    while (true) {
        const { options } = await inquirer.prompt({
            type: "list",
            name: "options",
            message: "Your Journey starts Here!",
            choices: ['Register', 'Login', 'View Students', 'Exit'],
        });
        switch (options) {
            case 'Register':
                await Register();
                break;
            case 'Login':
                await Login();
                break;
            case 'View Students':
                if (!(students.length < 1)) {
                    console.log();
                    students.forEach((val, index) => console.log(index + 1, `Student Name: ${val.name.toUpperCase()} & ID: ${val.ID}\n`));
                }
                else {
                    console.log(`\n\tThere is no student registered yet!\n`);
                }
                break;
            case 'Exit':
                console.clear();
                console.log(chalk.blueBright.bold(`
            <<== Stay Positive, Work Hard, Make it Happen. ==>>
            `));
                return;
            default:
                break;
        }
    }
}
main();
