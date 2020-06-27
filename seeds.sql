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

USE EmployeeTracker_DB;

-- Insert a set of records
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Legal");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Rep", 70, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Engineering Director", 100, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 50, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 50, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Finance Representative", 50, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Representative", 100, 1);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Kai", "Cousteau", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Zadaria", "Nagibe", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Tiago", "Oliveira", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Mitzy", "Lopez", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Zendaya", "Aubynn", 5);

-- VALUES 
--   ('Sales');
--   ('Engineering');
--   ('Finance');
--   ('Legal');

-- Note: use mySQLjoins;