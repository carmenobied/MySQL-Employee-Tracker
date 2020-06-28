-- Use database
USE EmployeeTracker_db;

-- Insert a set of records

-- Department records 
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Legal");

-- Role records 
INSERT INTO role (title, salary, department_id) VALUES ("Sales Rep", 70, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Engineering Manager", 130, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 50, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 50, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Advisor", 100, 2);

-- Employee records 
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