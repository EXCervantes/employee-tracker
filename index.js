const express = require("express");
const { default: inquirer } = require("inquirer");
const { Pool } = require("pg");
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "127.0.0.1",
  },
  console.log("Connected to the employees database.")
);

const main = async () => {
  const result = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "startup",
      choices: [
        'View departments',
        'View roles',
        'View employees',
        'Add department',
        'Add role',
        'Add employee',
        'Update employee role',
        'Update employee manager',
        'View employees by department',
        'Delete department',
        'Delete role',
        'Delete employee',
        'View department budgets',
        'Nothing']
    }
  ])
  if (result === 'View departments') {
    displayDepartments()
  }

  if (result === 'View roles') {
    displayRoles()
  }
  if (result === 'View employees') {
    displayEmployees()
  }
  if (result === 'Add department') {
    addDepartment()
  }
  if (result === 'Add role') {
    addRole()
  }
  if (result === 'Add employee') {
    addEmployee()
  }
  if (result === 'Update employee role') {
    updateEmployee()
  }
  if (result === 'Update employee manager') {
    updateManager()
  }
  if (result === 'View employees by department') {
    viewEmployeeDept()
  }
  if (result === 'Delete department') {
    deleteDepartment()
  }
  if (result === 'Delete role') {
    deleteRole()
  }
  if (result === 'Delete employee') {
    deleteEmployee()
  }
  if (result === 'View department budget') {
    viewDeptBudget()
  }
  // if (result === 'Nothing') {

  // }

  // Show all departments
  const displayDepartments = async () => {
    console.log('Displaying all departments...\n')
    const sql = `SELECT department.id AS id, department.name AS department FROM department`

    pool.query(sql, (err, rows) => {
      err ? console.log(err) : console.table(rows)
      // display mainMenu
    })
  }

  // Show all roles
  const displayRoles = async () => {
    console.log('Displaying all roles...\n')
    const sql = `SELECT role.id, role.title, department.name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id`

    pool.query(sql, (err, rows) => {
      err ? console.log(err) : console.table(rows)
      // display mainMenu
    })
  }

  // Show all employees
  const displayEmployees = async () => {
    console.log('Displaying all employee...\n')
    const sql = `SELECT employee.id,
              employee.first_name,
              employee.last_name,
              role.title,
              department.name AS department,
              role.salary,
              CONCAT (manager.first_name, " ", manager.last_name)
              AS manager
              FROM employee
              LEFT JOIN role ON employee.role_id = role.id
              LEFT JOIN department ON role.department_id = manager.id`

    pool.query(sql, (err, rows) => {
      err ? console.log(err) : console.table(rows)
      // display mainMenu
    })
  }

  // Add a department
  const addDepartment = async () => {
    const result = await inquirer.prompt([
      {
        type: 'input',
        name: 'addDept',
        message: "What department do you want to add?",
        validate: function (answer) {
          if (answer.length > 2) return true;
          return console.log("Please enter a department");
        }
      }
    ])
    const sql = `INSERT INTO department (name)
              VALUES (?)`;
    pool.query(sql, answer.addDept, (err, data) => {
      err ? console.log(err) : console.log('Added ' + answer.addDept + ' to department')

      displayDepartments();
    })

    // Add a role
    const addRole = async () => {
      const result = await inquirer.prompt([
        {
          type: 'input',
          name: 'role',
          message: "What role do you want to add?",
          validate: function (answer) {
            if (answer.length > 2) return true;
            return console.log("Please enter a role");
          }
        },
        {
          type: 'input',
          name: 'salary',
          message: "What is the salary of this role? (Do not enter decimals or commas)",
          validate: function (answer) {
            if (isNaN(parseFloat(answer))) return true;
            return console.log("Please enter numbers for the salary");
          }
        }
      ])
        (result) => {
  const params = [result.role, result.salary]

  const sqlRole = `SELECT name, id FROM department`;
  pool.query(sql, answer.addDept, (err, data) => {
    err ? console.log(err) : console.log('Added ' + answer.addDept + ' to department')
    const dept = result.map(({ name, id }) => ({ name: name, value: id }))
  }
    const result = await inquirer.prompt([
    {
      type: 'list',
      name: 'dept',
      message: "What department is this role in?",
      choices: dept
    }
  ])
}

// Add an employee
const addEmployee = async () => {

}
// Update an employee role

// Update a manager

// View employees by department

// Delete a department

// Delete a role

// Delete an employee

// View department budgets

{
  type: 'input',
    name: 'firstName',
      message: "What is the employee's first name?",
    },
{
  type: 'input',
    name: 'lastName',
      message: "What is the employee's last name?",
    },
{
  type: 'input',
    name: 'employeeRole',
      message: "What is the employee's role?",
    },
{
  type: 'input',
    name: 'updateEmployeeRole',
      message: "Which employee role would you like to update?",
        choices: employee
},
{
  type: 'list',
    name: 'manager',
      message: "Who is the employee's manager?",
        choices: managers
},
{
  type: 'list',
    name: 'role',
      message: "What is the employee's new role?",
        choices: roles
},
{
  type: 'list',
    name: 'dept',
      message: "What department do you want to delete?",
        choices: dept
},
{
  type: 'list',
    name: 'role',
      message: "What role do you want to delete?",
        choices: role
},
{
  type: 'list',
    name: 'name',
      message: "Which employee would you like to delete?",
        choices: employees
}
  };

pool.connect();



// Request for all other responses
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
