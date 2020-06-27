-- Use database
USE EmployeeTracker_db;

-- Insert a set of records

-- Department records 
INSERT INTO department (name) 
VALUES ("Sales"),("Engineering"), ("Finance"), ("Legal");

-- Role records 
INSERT INTO role (title, salary, department_id) 
VALUES
("Sales Rep", 70, 3),
("Sales Manager", 130, 3),
("Engineering Manager", 150, 4),
("Software Engineer", 50, 2),
("Finance Analyst", 90, 2),
("Legal Advisor", 100, 1);

-- Employee records 
INSERT INTO employee (first_name, last_name, role_id) 
VALUES 
("Kai", "Cousteau", 2),
("Zadaria", "Nagibe", 1),
("Tiago", "Oliveira", 3),
("Mitzy", "Lopez", 4),
("Zendaya", "Aubynn", 5);

-- VALUES 
--   ('Sales');
--   ('Engineering');
--   ('Finance');
--   ('Legal');