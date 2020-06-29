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
            "View employees by department", 
            "Add new employee", 
            "Add new role", 
            "Add new department", 
            "Delete employee role",
            "Update employee role", 
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
      
       case "Delete employee role":
          deleteEmployeeRole() 
            break;

       case "Update employee role":
           updateEmployeeRole() 
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

// ADD New Employee
// ***************************************************************

const addNewEmployee = () => {
  let departmentArray = [];
  connection.query(`SELECT * FROM department`, (err, res) => {
    res.forEach(element => {
      departmentArray.push(`${element.id} ${element.department}`);
    });
    let roleArray = [];
    connection.query(`SELECT id, title FROM role`, (err, res) => {
      res.forEach(element => {
        roleArray.push(`${element.id} ${element.title}`);
      });
      let managerArray= [];
      connection.query(`SELECT id, first_name, last_name FROM employee`, (err, res) => {
        res.forEach(element => {
          managerArray.push(`${element.id} ${element.first_name} ${element.last_name}`);
        });
    inquirer
      .prompt([
        {
          name: "addFirstName",
          type: "input",
          message: "Please enter first name of employee:"
          },
          {
          name: "addLastName",
          type: "input",
          message: "Please enter last name of employee:"
        },
        {
          name: "addDepartment",
          type: "list",
          message: "Please select department of employee:",
          choices: departmentArray
        },
        {
          name: "addRole",
          type: "list",
          message: "Please select role of employee:",
          choices: roleArray
        },
        {
          name: "addManager",
          type: "list",
          message: "Please select the manager of this employee:",
          choices: managerArray
        }
      ])
      .then(response => {
        // Use id from returned responses
        let roleResponse = parseInt(response.roleOptions);
        let managerResponse = parseInt(response.managerOptions);
        connection.query(
          "INSERT INTO role SET ?",
          {
            first_name: response.addFirstName,
            last_name: response.addLastName,
            role_id: roleResponse,
            manager_id: managerResponse
          }, (err, res) => {
            if (err) throw err;
          }
        )
        connection.query(viewAllEmployees, (err, res) => {
          if (err) throw err;
          console.table(res);
          runTracker();
          })
        })
      })
    })
  })
};

// Add New Role (with validation)
// ***************************************************************
const addNewRole = () => {
  inquirer.prompt(
    {
      name: "validation",
      type: "input",
      message: "Please confirm - is this department already in the tracker? Y/N:"
    }
  ).then(response => {
    const userValidation = response.validation.toLowerCase();
    if (userValidation === "n") {
      runTracker();
    } else if (userResp === "y") {
      newRoleInput();
    };
  })
};
const newRoleInput = () => {
  let dpt = [];
  connection.query(`SELECT * FROM department`, (err, res) => {
    res.forEach(element => {
      dpt.push(`${element.id} ${element.department}`);
    });
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
          console.log(`${response.roleTitle} role has been added successfully.`)
        }
      )
      connection.query(`SELECT * FROM role`, (err, res) => {
        if (err) throw err;
        console.table(res);
        runTracker();
      })
    })
  })
};

// Add New Department 
// ***************************************************************
const addNewDepartment = () => {
  inquirer
    .prompt(
      {
        name: "department",
        type: "input",
        message: "Enter the name of the new department:"
      }
    )
    .then(response => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          department: response.department
        }, (err, res) => {
          if (err) throw err;
          console.log(`Added ${response.department} department`)
        })
      connection.query(`SELECT * FROM department`, (err, res) => {
        console.table(res);
        runTracker();
      })
    })
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

// Update Employee Role
// ***************************************************************
const updateEmployeeRole = () => {
  let employeesArray = [];
  connection.query(`
        SELECT id, first_name, last_name
        FROM employee`, 
     (err, res) => {
    res.forEach(element => {
      employeesArray.push(`${element.id} ${element.first_name} ${element.last_name}`);
    });
    let roleArray = [];
    connection.query(`SELECT id, title FROM role`, (err, res) => {
      res.forEach(element => {
        roleArray.push(`${element.id} ${element.title}`);
      });
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
            choices: roleArray
          }
        ])
        .then(response => {
          let updatedRoleID = parseInt(response.updateRole);
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
        })
      })
  })
}

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