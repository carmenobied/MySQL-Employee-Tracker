// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

// Class Constructors
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
  database: "EmployeeTracker_db"
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
            "View all employees",
            "View all departments", 
            "View all roles", 
            "Add new department", 
            "Add new role", 
            "Add new employee", 
            "Delete employee role",
            "Update employee role", 
            "View employees by department", 
            "View employees by manager", 
            "View total budget by department", 
            "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View all employees":
          viewAllEmployees();
            break;
  
        case "View all departments":
              viewAllDepartments();
                break;
    
        case "View all roles":
              viewAllRoles();
                break;

        case "View employees by department":
          viewEmployeesByDepartment();
            break;
  
        case "Add new employee":
          addNewEmployee();
            break;
        
        case "Add new role":
          addNewRole();
            break;
        
        case "Add new department":
          addNewDepartment();
            break;
        case "Update employee role":
          updateEmployeeRole() 
            break;
       case "Delete employee role":
          deleteEmployeeRole() 
            break;

       case "View employees by manager":
            viewEmployeeByManager() 
            break;

        case "View total budget by department":
           viewBudgetByDepartment() 
            break;
        case "Exit":
          connection.end();
            break;
        }
      });
  }

  // View Employees (with emplyee id, names (first and last), role title, department, salary, manager)
  const viewAllEmployees = () => {
    connection.query( `
            SELECT 
              distinct (e.id),
              CONCAT (e.first_name,' ',e.last_name) AS employee_name,
              r.title as role_title,
              d.name,
              r.salary,
              e.manager_id
            FROM employee e
              INNER JOIN role r 
                ON e.role_id = r.id
              INNER JOIN department d
                ON r.department_id = d.id
            ORDER BY e.id DESC`
            , (err, res) => {
          // connect to the mysql server and sql database
          if (err) throw err;
          // run the start function after the connection is made to prompt the user
          console.table(res);
          runTracker();
      })
    };

// View all Departments
// ***************************************************************
      const viewAllDepartments = () => {
        connection.query(`SELECT * FROM department`, (err, res) => {
          if (err) throw err;
          console.table(res);
          runTracker();
        });
      };

// View all Roles
// ***************************************************************
      const viewAllRoles = () => {
        connection.query(`SELECT * FROM role`, (err, res) => {
          if (err) throw err;
          console.table(res);
          runTracker();
        });
    };

// // Add New Department 
// // ***************************************************************
const addNewDepartment = () => {
  inquirer
      .prompt({
          name: "newDepartment",
          type: "input",
          message: "Enter the the new department you would like to add.",
          validate: (answer) => {
              if (answer.length < 1) {
                  return 'Must enter a valid department.';
              }
              return true;
          },
      })
      .then(response => {
          connection.query("INSERT INTO department SET ?",
          {
              name: response.newDepartment
          }, 
          (err, res) => {
              if (err) throw err;
              console.log(`Added ${response.newDepartment} department successfully!`);
              runTracker();
          });
      });
};

// Add New Role 
// ***************************************************************
const addNewRole = () => {
  inquirer
      .prompt([
          {
              name: "roleTitle",
              type: "input",
              message: "Please enter the new role title you would like to add.",
              validate: (answer) => {
                  if (answer.length < 1) {
                      return 'Must enter a valid role title.';
                  }
                  return true;
              },
          },
          {
              name: "roleSalary",
              type: "input",
              message: "Please enter the new role's salary.",
              validate: (answer) => {
                  if (answer.length < 1) {
                      return 'Must enter a valid salary.';
                  }
                  return true;
              },
          },
          {
              name: "departmentID",
              type: "input",
              message: "Please enter the new role's department ID.",
              validate: (answer) => {
                  if (answer.length < 1) {
                      return 'Must enter a valid department ID.';
                  }
                  return true;
              }
          }
      ])
      .then(response => {
          connection.query("INSERT INTO role SET ?",
          {
              title: response.roleTitle,
              salary: parseInt(response.roleSalary),
              department_id: parseInt(response.departmentID)
          },
          (err, res) => {
              if (err) throw err;
              console.log(`Added ${response.roleTitle} role successfully!`);
              runTracker();
          });
      });
};

// Add New Employee
// ***************************************************************
const addNewEmployee = () => {
  inquirer
      .prompt([
          {
              name: "firstName",
              type: "input",
              message: "Please enter the new employee's first name.",
              validate: (answer) => {
                  if (answer.length < 1) {
                      return 'Please enter a valid first name';
                  }
                  return true;
              },
          },
          {
              name: "lastName",
              type: "input",
              message: "Please enter the new employee's last name.",
              validate: (answer) => {
                  if (answer.length < 1) {
                      return 'Please enter a valid last name';
                  }
                  return true;
              }
          },
          {
              name: "roleId",
              type: "input",
              message: "Please enter the role ID for the new employee.",
              validate: (answer) => {
                  if (answer.length < 1) {
                      return 'Please enter a valid role id';
                  }
                  return true;
              },
            //   name: "addManager",
            //   type: "list",
            //   message: "Please select the manager of this employee:",
            //   choices: managerArray
          }
      ])
      .then(response => {
          connection.query("INSERT INTO employee SET ?",
          {
              first_name: response.firstName,
              last_name: response.lastName,
              role_id: parseInt(response.roleId)
          },
          (err, res) => {
              if (err) {
                  console.log('Must enter valid ID. Please try again.');
                  addNewEmployee();
                  return;
              }
              console.log(`${response.firstName} ${response.lastName} has been succesfully to the employee records!`);
              runTracker();
          });
      });
};
// // Update Employee Role
// // ***************************************************************
const updateEmployeeRole = () => {
      connection.query(`
      SELECT id, first_name, last_name
      FROM employee`, 
    (err, res) => {
      if (err) throw err;
  inquirer
      .prompt([
         { 
              name: "employeeID",
              type: "input",
              message: "Please enter the ID number of the employee record you would like to update.",
              validate: (answer) => {
                  if (answer.length < 1) {
                      return 'Must enter a valid ID number';
                  }
                  return true;
              },
          },
          { 
              name: "updatedRoleID",
              type: "input",
              message: "Please enter the updated Role ID number of the selected employee record.",
              validate: (answer) => {
                  if (answer.length < 1) {
                      return 'Must enter a valid Role ID number';
                  }
                  return true;
              },
          },
      ])
      .then(response => {
          let updatedEmployeeRole = parseInt(response.employeeID);
          let updatedRoleID = parseInt(response.updatedRoleID);
          connection.query(`UPDATE employee SET role_id = ${updatedRoleID} WHERE id = ${updatedEmployeeRole}`,
          (err, res) => {
              if (err) {
                  console.log('Must enter valid ID. Please try again.');
                  updateEmployeeRole();
                  return;
              }
              console.log(`Employee role has been updated successfully!`);
              runTracker();
          });
      });
    });

};

// Delete Employee Role
// ***************************************************************
const deleteEmployeeRole = () => {
  // ADD QUERY
  let employeesArray = [];
  connection.query(`
      SELECT id, first_name, last_name
      FROM employee`, 
    (err, res) => {
    res.forEach(element => {
      employeesArray.push(`${element.id} ${element.first_name} ${element.last_name}`);
    });
    inquirer
      .prompt({
        name: "deleteRole",
        type: "list",
        message: "Please select the employee role you would like to delete?",
        choices: employeesArray
      })
      .then(response => {
        // connection.query(
        let employeeRoleID = parseInt(response.deleteRole)

        connection.query(`DELETE FROM employee WHERE id = ${employeeRoleID}`, (err, res) => {
          console.table(response);
          runTracker();
        })
      })
  });
}

// View Employees by Department
// *****************************************************************
const viewEmployeesByDepartment = () => {
  //Create choices for inquirer question dynamically
        let departmentArray = [];
        connection.query(`            
            SELECT 
              distinct (e.id),
              CONCAT (e.first_name,'',e.last_name),
              d.id,
              d.name
            FROM employee e
              INNER JOIN role r 
                  ON e.role_id = r.id
              INNER JOIN department d
                  ON r.department_id = d.id
            ORDER BY d.id DESC`, 
            (err, res) => {
            res.forEach(element => {
            departmentArray.push(element.department);
          });
          inquirer
            .prompt({
              name: "action",
              type: "list",
              message: "What department would you like to view?",
              choices: departmentArray
            })
            .then(response => {
              connection.query(`${viewAllEmployees}
              WHERE department = "${response.action}"`, (err, res) => {
                console.table(res);
                runTracker();
              })
            })
        })
      };

// Employees by manager_id
// *****************************************************************
const viewEmployeeByManager = () => {
  let departmentArray = [];
  // use aggregate function
  connection.query(`             
        SELECT 
          e.id AS employee_id,
          CONCAT (e.first_name,'',e.last_name) AS Manager_Full_Name,
          r.id AS role_id,
          e.manager_id
        FROM employee e
          INNER JOIN role r 
              ON e.role_id = r.id
        WHERE e.manager_id IS NOT NULL
        ORDER BY e.manager_id DESC`, 
      (err, res) => {
      res.forEach(element => {
      departmentArray.push(element.department);
    });
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What manager's employees would you like to view?",
        choices: departmentArray
      })
      .then(response => {
        connection.query(`${viewAllEmployees}
        WHERE department = "${response.action}"`, (err, res) => {
          console.table(res);
          runTracker();
        })
      })
  })
};

// Total utilized budget by department -- ie the combined salaries of all employees in that department
// *****************************************************************
const viewBudgetByDepartment = () => {
  let departmentArray = [];
  // use aggregate function (e.g. sum, count, average, etc)
  connection.query( `
        SELECT
          SUM(r.salary),
          d.name
        FROM employee e
          INNER JOIN role r 
              ON e.role_id = r.id
          INNER JOIN department d
              ON r.department_id = d.id
        GROUP BY 
          2`, 
        (err, res) => {
        // Group by: when using an aggregate function (e.g. sum, count, average, etc) in the select statement, everything under the aggregate function must be grouped
        res.forEach(element => {
          departmentArray.push(element.department);
        })
        inquirer
        .prompt(
          {
            name: "departmentBudget",
            type: "list",
            message: "Please select budget by department:",
            choices: departmentArray
          }
        )
        .then(response => {
          connection.query(`SELECT salary FROM (${viewAllEmployees}) AS managerSubTable WHERE department = "${response.departmentBudget}"`, (err, resp) => {
            let salarySum = 0;
            resp.forEach(element => {
              salarySum += element.salary;
            })
            connection.query(`SELECT department FROM department WHERE department = "${response.departmentBudget}"`, (err, res) => {
              if (err) throw err;
              console.table(res);
              console.log(`budget of $${salarySum}`)
              runTracker();
            })
          })
        })
    })
  }
// end Tracker 