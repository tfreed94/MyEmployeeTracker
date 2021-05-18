// Installed/Required Dependencies
const cTable = require("console.table");
const mysql = require("mysql");
const inquirer = require("inquirer");

// Create connection to SQL DB
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    // Change this password to match the password in your DB (Yours may not be root)
    password: "root",
    database: "employeetracker"
});

// If connection fails throw an error
connection.connect((err) => {
    if (err) throw err;
    mainMenu();
});
// Inquirer prompts user to choose from "choices array"
const mainMenu = () => {
    inquirer.prompt({
        type: "list",
        choices: [
            "View departments",
            "View roles",
            "View employees",
            "Add department",
            "Add role",
            "Add employee",
            "Update employee role",
        ],
        message: "Choose what you need to do:",
        name: "choices"
    })  
        // Call functions depending on what user selections
        .then((res) => {
            console.log(res.choices);
            switch (res.choices) {
                case "View departments":
                    viewAllDepartments();
                    break;
                case "View roles":
                    viewAllRoles();
                    break;
                case "View employees":
                    viewAllEmployees();
                    break;
                case "Add department":
                    addDept();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateEmployeeRoleID();
                    break;
            }
        });
}

// Function that views all departments by selecting all departments from department table
const viewAllDepartments = () => {
    const queryDept = "SELECT * FROM department";
    connection.query(queryDept, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

// Function that views all roles by selecting all roles from roles table
const viewAllRoles = () => {
    const queryRole = "SELECT * FROM role";
    connection.query(queryRole, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

// Function that views all employees by selecting all employees from employee table
const viewAllEmployees = () => {
    let queryEmployee = "SELECT * FROM employee";
    connection.query(queryEmployee, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}


const addDept = () => {
    inquirer.prompt({
        type: "input",
        message: "Department Name:",
        name: "addDepartmentName"
        // Insert user input into department table
    }).then((answer) => {
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.addDepartmentName], (err, res) => {
            if (err) throw err;
            console.table(res)
            mainMenu()
        })
    })
}


const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Role Name:",
            name: "addRoleName"
        },
        {
            type: "input",
            message: "Annual Salary:",
            name: "addAnnualSalary"
        },
        {
            type: "input",
            message: "Department ID:",
            name: "addDepartmentID"
        }
    ])

        // Insert user input into role table
        .then((answer) => {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.addRoleName, answer.addAnnualSalary, answer.addDepartmentID], (err, res) => {
                if (err) throw err;
                console.table(res);
                mainMenu();
            });
        });
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Employee first name:",
            name: "addFirstName"
        },
        {
            type: "input",
            message: "Employee last name:",
            name: "addLastName"
        },
        {
            type: "input",
            message: "Employee role ID number:",
            name: "addRoleID"
        },
        {
            type: "input",
            message: "Manager ID number:",
            name: "addManagerID"
        }
    ])

        // Insert user input into employee table
        .then((answer) => {
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.addFirstName, answer.addLastName, answer.addRoleID, answer.addManagerID], (err, res) => {
                if (err) throw err;
                console.table(res);
                mainMenu();
            });
        });
}

const updateEmployeeRoleID = () => {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter employee id",
        }
    ])
        // User selects employee by Employee ID 
        .then((answer) => {
            const ID = answer.id;
            inquirer.prompt([
                {
                    name: "roleId",
                    type: "input",
                    message: "Enter role id",
                }
            ])
                
                // Users selected employee will have Role ID updated based off user input
                .then((answer) => {
                    const employeeRoleId = answer.roleId;
                    const query = "UPDATE employee SET role_id=? WHERE id=?";
                    connection.query(query, [employeeRoleId, ID], (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        mainMenu();
                    });
                });
        });
}