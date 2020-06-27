USE EmployeeTracker_db;

-- Insert a set of records
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Legal");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Rep", 70, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Engineering Director", 100, 4);
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