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
        ]
      }
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
    if (err) throw err;
    console.table(data);

    init();
  });
}

function showRole() {
  const sql = `SELECT role.id, role.title, role.salary, 
    department.id 
    AS department_id,
    name AS department_name 
    FROM role 
    LEFT JOIN department 
    ON role.department_id = department.id`;

  db.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);

    init();
  });
}

function showEmployee() {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, 
  role.id 
  AS role_id,
  title, salary, m.last_name AS manager_lastname, m.first_name AS manager_firstname, name AS department_name
  FROM employee
  LEFT JOIN role ON role_id = role.id 
  LEFT JOIN employee m ON m.id = employee.manager_id
  LEFT JOIN department ON role.department_id = department.id
  ;`;

  db.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);

    init();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "Enter new department",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        answers.addDepartment,
        function (err, results) {
          if (err) {
            console.err("There is an error adding new department");
          } else {
            console.log(results);
          }
          init();
        }
      );
    })
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
        type: "input",
        name: "department_id",
        message: "Enter department id for the new role",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
        [answers.role, answers.salary, answers.department_id],
        function (err, results) {
          if (err) {
            console.err("There is an error adding new role");
          } else {
            console.log(results);
          }
          init();
        }
      );
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error("");
      } else {
        console.log("");
      }
    });
}
function addEmployee() {
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
        type: "input",
        name: "roleID",
        message: "Enter employee's role id",
      },
      {
        type: "input",
        name: "managerID",
        message: "Enter employee manager's id",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id VALUES (?,?,?)",
        [answers.first_name, answers.last_name, answers.role_id],
        function (err, results) {
          if (err) {
            console.error("There is an error adding new employee");
          } else {
            console.log(results);
          }
          init();
        }
      );
    })
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
    .prompt([
    {
        type: "input",
        name: "updateEmployeeID",
        message: "What is the employee's ID that you want to update?"
    },
    {
        type: "input",
        name: "newRole",
        message: "What is his/her new role?"
    }
])
    .then((answers) => {

      db.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [answers.newRole, answers.updateEmployeeID],
        function (err, results) {
          if (err) {
            console.error("There is an error updating emoloyee role");
          } else {
            console.log(results);
          }
          init();
        }
      );
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error("");
      } else {
        console.log("");
      }
    });
}

init();
