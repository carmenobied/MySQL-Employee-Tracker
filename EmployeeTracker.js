// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

//*Class Constructors
const employee = require('./constructor/employee');
const role = require('./constructor/role');
const department = require('./constructor/department');

// Create connection for the MySQL database
var connection = mysql.createConnection({
  host: "localhost",

  // Port
  port: 3306,

  // Username
  user: "root",

  // Password
  password: "Nomad7285!",
  database: "EmployeeTracker_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runTracker();
});

// Start Employee Tracker app
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
  
        case "View departments":
            viewDepartments();
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

 // View Employees
function viewEmployees() {
  // connect to the mysql server and sql database
connection.connect((err, res) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  console.table(res);
  runTracker();
})
};

// View Employees by Department
    // ***************************************************************
      const viewEmployeesDepartment = () => {
        // Dynamically create questions
        let departmentOptions = [];
        connection.query(`SELECT * FROM department`, (err, res) => {
          res.forEach(element => {
            departmentOptions.push(element.department);
          });
          inquirer
            .prompt({
              name: "action",
              type: "list",
              message: "What department would you like to view?",
              choices: departmentOptions
            })
            .then(response => {
              connection.query(`${viewEmployees}
              WHERE department = "${response.action}"`, (err, res) => {
                console.table(res);
                runTracker();
              })
            })
        })
      };
      // View Employees Departments
      // ***************************************************************
      const viewDepartments = () => {
        connection.query(`SELECT * FROM department`, (err, res) => {
          console.table(res);
          runTracker();
        })
      }
      // View Employees Role
      // ***************************************************************
      const viewEmployeesRole = () => {
        connection.query(`SELECT * FROM role`, (err, res) => {
          console.table(res);
          runTracker();
        })
    }

// Add New Employee Role
// ***************************************************************
const addEmployeeRole = () => {
    inquirer
      .prompt([
        {
          name: "roleTitle",
          type: "input",
          message: "Please enter the new role title:",
          validate: (response) => {
            if (response.length < 1) {
                return 'Must enter a valid title';  
            }
            return true;
        },
          name: "department",
          type: "list",
          message: "Please select the new role's department:",
          choices: ["Engineering", "Sales", "Financial", "Legal"],
          validate: (response) => {
            if (response.length < 1) {
                return 'Must enter a valid deparment';
            }
            return true;
        },
          name: "salary",
          type: "input",
          message: "Please enter the new role's salary:", 
          validate: (response) => {
            if (response.length < 1) {
                return 'Must enter a valid salary';
            }
            return true;
        },
        }
    ])
      .then(response => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: response.roleTitle,
            salary: response.salary,
            department_id: parseInt(response.department)
          }, (err, res) => {
            if (err) throw err;
            console.log(`${response.roleTitle} role has been added.`)
          }
        )
        connection.query(`SELECT * FROM role`, (err, res) => {
          if (err) throw err;
          console.table(res);
          runTracker();
        })
  });
}

// Delete Employee Role
// ***************************************************************
const deleteEmployeeRole = () => {
  // ADD QUERY
  let employeesList = [];
    inquirer
      .prompt({
        name: "deleteRole",
        type: "list",
        message: "Please select the employee role you would like to delete?",
        choices: employeesList
      })
      .then(response => {
        // connection.query(
        let employeeRoleID = parseInt(response.deleteRole)

        connection.query(`DELETE FROM employee WHERE id = ${employeeRoleID}`, (err, res) => {
          console.table(response);
          runTracker();
        })
      });
}

// Update Employee Role
// ***************************************************************
const updateEmployeeRole = () => {
  let employeesArray = [];
    // ADD QUERY
      inquirer
        .prompt([
          {
            name: "updateRole",
            type: "list",
            message: "Please select the employee role you would like to update:",
            choices: employeesArray
          },
          {
            name: "employeeRole",
            type: "list",
            message: "Please select the employee role:",
            choices: employeeRole
          }
        ])
        .then(response => {
          // connection.query(
          let updatedRoleID = parseInt(response.updateRonle);
          let updatedEmployeeRole = parseInt(response.employeeRole);
          connection.query(
            `UPDATE employee SET role_id = ${updatedEmployeeRole} WHERE id = ${updatedRoleID}`, (err, res) => {
              if (err) throw err;
            }
          )
          connection.query((err, res) => {
            if (err) throw err;
            console.table(res);
            runTracker();
          })
        });
} 