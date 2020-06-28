-- - Drops the EmployeeTracker_DB if it already exists
DROP DATABASE IF EXISTS EmployeeTracker_db;
-- Create the database EmployeeTracker_DB and specified it for use.

CREATE database EmployeeTracker_db;

USE EmployeeTracker_db;

-- Create employee table
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Create role table
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create department table
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

SELECT * FROM EmployeeTracker_db;

-- "View employees"
            SELECT * FROM employee

 -- "View departments"
            SELECT * FROM department ORDER BY name DESC

-- "View employees by department"
            SELECT 
                e.id,
                CONCAT (e.first_name,'',e.last_name),
                d.id,
                d.name
            FROM employee e
                INNER JOIN role r 
                    ON e.role_id = r.id
                INNER JOIN department d
                    ON r.department_id = d.id
            ORDER BY d.id DESC

 -- "View roles"
            SELECT * FROM role ORDER BY department_id DESC

--    "View employees by role"
            SELECT 
                e.id,
                CONCAT (e.first_name,'',e.last_name),
                r.id
            FROM employee e
                INNER JOIN role r 
                    ON e.role_id = r.id
            ORDER BY r.id DESC

--    "View employess by manager_id"
            SELECT 
                e.id,
                CONCAT (e.first_name,'',e.last_name) AS Manager_Full_Name,
                r.id,
                e.manager_id
            FROM employee e
                INNER JOIN role r 
                    ON e.role_id = r.id
            WHERE e.manager_id IS NOT NULL
            ORDER BY e.manager_id DESC