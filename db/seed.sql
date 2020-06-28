-- Use database
USE EmployeeTracker_db;

-- Inset set of records 

-- Department 
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Legal");

-- Role
INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 190000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 150000, 2);

-- Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kai", "Cousteau", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Zadaria", "Nagibe", 2, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Tiago", "Oliveira", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Mitzy", "Rodriguez", 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Zendaya", "Aubynn", 5, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Josh", "Sparrow", 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Victor", "Gonzalez", 7, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Cindy", "Allen", 8);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Valerie", "Lang", 9);