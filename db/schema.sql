-- - Drops the EmployeeTracker_DB if it already exists
DROP DATABASE IF EXISTS EmployeeTracker_DB;

-- Create the database EmployeeTracker_DB and specified it for use.
USE EmployeeTracker_DB;
-- Create the employee table
CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Create the role table
CREATE TABLE role (
  id INTEGER AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create the department table
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT,
  department VARCHAR(50),
  PRIMARY KEY (id)
);