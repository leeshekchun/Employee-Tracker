const db = require("./db/connection");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

function init() {
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
          "Show Department",
          "Show Role",
          "Show Employee",
          "Finish",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      switch (answers.path) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Show Department":
          showDepartment();
          break;
        case "Show Role":
          showRole();
          break;
        case "Show Employee":
          showEmployee();
          break;
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error("error occurs!");
      } else {
        console.log("successfully selected!");
      }
    });
}

function showDepartment() {
  const sql = "SELECT * FROM department";

  db.query(sql, (err, data) => {
    console.table(data);
    init();
  });
}

function showRole() {
  const sql = `SELECT role.id, role.title, role.salary, 
    department.id 
    AS department_id 
    FROM role 
    LEFT JOIN department 
    ON role.department_id = department.id`;

  db.query(sql, (err, data) => {
    console.table(data);
    init();
  });
}

function showEmployee() {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, 
    role.id 
    AS role_id
    FROM employee
    LEFT JOIN role 
    ON role_id = role.id, 
    employee.manage_id AS employee.id`;

  db.query(sql, (err, data) => {
    console.table(data);
    init();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Enter new department",
      },
    ])
    .then((answers) => {})
    .catch((error) => {
      if (error.isTtyError) {
        console.error("");
      } else {
        console.log("");
      }
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "Enter title",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter salary",
      },
      {
        type: "",
      },
    ])
    .then((answers) => {})
    .catch((error) => {
      if (error.isTtyError) {
        console.error("");
      } else {
        console.log("");
      }
    });
}
function addEmployee() {
  // query tables role
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter employee's first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter employee's last name",
      },
      {
        type: "",
      },
    ])
    .then((answers) => {})
    .catch((error) => {
      if (error.isTtyError) {
        console.error("");
      } else {
        console.log("");
      }
    });
}
function updateEmployeeRole() {
  inquirer
    .prompt([{}])
    .then((answers) => {})
    .catch((error) => {
      if (error.isTtyError) {
        console.error("");
      } else {
        console.log("");
      }
    });
}

init();
