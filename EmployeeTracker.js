var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

// Create connection for the MySQL database
var connection = mysql.createConnection({
  host: "localhost",

  // Port
  port: 3306,

  // Username
  user: "root",

  // Password
  password: "",
  database: "EmployeeTracker_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  runTracker();
});

function runTracker() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View employees",
            "View employees by department",
            "View employess by role",
            "Add employee role",
            "Delete employee role",
            "Update employee role",
            "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View employees":
          viewEmployees();
          break;
  
        case "View employees by department":
          viewEmployeesDepartment();
          break;
  
        case "View employess by role":
          viewEmployeesRole();
          break;
  
        case "Add employee role":
          addEmployeeRole();
          break;
      
       case "Delete employee role":
          deleteEmployeeRole() 
          break;

       case "Update employee role":
           updateEmployeeRole() 
           break;
  
        case "Exit":
          connection.end();
          break;
        }
      });
  }