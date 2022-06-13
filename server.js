const db = require('./db/connection');
const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');

inquirer
    .prompt([
        {
            type: "list",
            name: "path",
            message: "What would you like to do?",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "Finish"
            ]  
        }
    ])
    .then((answers) => {
        console.log(answers)
        switch (answers.path) {
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;

        }
    })
    .catch((error) =>{
        if (error.isTtyError) {
            console.error('error occurs!')
        } else {
            console.log('successfully selected!')
        }
    })

    function addDepartment () {

    }
    function addRole () {

    }