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