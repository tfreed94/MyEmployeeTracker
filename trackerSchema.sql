DROP DATABASE IF EXISTS employeetracker;

CREATE DATABASE employeetracker;

USE employeetracker;


CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30));

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id));

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id));

INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");


INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 175000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 200000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 95000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 55000,2 );
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 120000, 3);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Regina","Freed",null,5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Troy", "Freed", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Justin", "Gnatiuk", 3, 7);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
