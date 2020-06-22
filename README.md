# MySQL-Employee-Tracker

![Project license badge](https://img.shields.io/badge/license-MIT-brightgreen)

The goal was to architect and build a solution for managing a company's employees using node, inquirer, and MySQL. Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as Content Management Systems. 

The app involved building a command-line application that allows the user to:
* Add departments, roles, employees
* View departments, roles, employees
* Update employee roles
* Update employee managers
* View employees by manager
* Delete departments, roles, and employees
* View the total utilized budget of a department -- ie the combined salaries of all employees in that department

## User Story
```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

# Table of Contents
  * [Installation](#Installation)
  * [Usage](#Usage)
  * [Contributing](#Contributing)
  * [License](#License)
  * [Questions](#Questions)

## Installation
```
i. Fork the Github repository.
ii. Clone the forked repo into your local machine using gitbash/terminal to pull the project and data.
iii. Run the command-lines below to run the app functionality. You can also access the files and assets via Visual Studio to view the code. 
iv. Explore the Employee Tracker app: add/view/update/delete departments, roles, employees
```
## Process
Design the following database schema containing three tables:
![Employee Tracker](01-Class-Content_12-MySQL_02-Homework_Assets_employee-tracker.png)

* department:
    * id - INT PRIMARY KEY
    * name - VARCHAR(30) to hold department name

* role:
    * id - INT PRIMARY KEY
    * title -  VARCHAR(30) to hold role title
    * salary -  DECIMAL to hold role salary
    * department_id -  INT to hold reference to department role belongs to

* employee:
    * id - INT PRIMARY KEY
    * first_name - VARCHAR(30) to hold employee first name
    * last_name - VARCHAR(30) to hold employee last name
    * role_id - INT to hold reference to role employee has
    * manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

Steps involved:
* Using the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.
* Using [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.
* Using [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of console.table, but the NPM package formats the data a little better for our purposes.
* Note: Have a separate file containing functions for performing specific SQL queries, e.g. use a constructor function or a class for organizing these.
* Note: Perform a variety of SQL JOINS.
* Note: Include a seed.sql file to pre-populate your database - this will make development of individual features much easier.
* Note: Reference [SQL Bolt](https://sqlbolt.com/).

## Usage
```
Key Components Used:
MySQL - InquirerJs - console.table - Node.js - JavaScript - SQL Joins
```
* Below is the screenshot of the application:

![Assets Schema](01-Class-Content_12-MySQL_02-Homework_Assets_schema.png)

## Contributing
Pull requests are welcome. Please use the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md) and for major changes, please open an issue beforehand to discuss the changes.

## License 
[MIT](https://choosealicense.com/licenses/mit/)

## Questions  
Have questions? Contact me at:
##### Email: carmen.obied@gmail.com
##### Github:  **carmenobied** [carmenobied](https://github.com/carmenobied)