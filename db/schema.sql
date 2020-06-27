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
  department_id INT NULL,
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

-- Note: use mySQLjoins;