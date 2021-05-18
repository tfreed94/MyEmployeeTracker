const cTable = require("console.table");
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employeetracker"
});

connection.connect((err) => {
    if (err) throw err;
    mainMenu();
});

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

const viewAllDepartments = () => {
    const queryDept = "SELECT * FROM department";
    connection.query(queryDept, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

const viewAllRoles = () => {
    const queryRole = "SELECT * FROM role";
    connection.query(queryRole, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

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
        .then((answer) => {
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.addFirstName, answer.addLastName, answer.addRoleID, answer.addManagerID], (err, res) => {
                if (err) throw err;
                console.table(res);
                mainMenu();
            });
        });
}