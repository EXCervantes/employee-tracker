// Necessary dependencies
const inquirer = require("inquirer");
const colors = require("colors");
const { Pool } = require("pg");
require('dotenv').config();

// Connect to database
const pool = new Pool(
  {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "127.0.0.1",
  },
);

pool.connect();
console.log(colors.bgBrightGreen("============================================"))
console.log(colors.bgBrightGreen("|                                          |"))
console.log(colors.bgBrightGreen("|            EMPLOYEE MANAGER              |"))
console.log(colors.bgBrightGreen("|                                          |"))
console.log(colors.bgBrightGreen("============================================"))

console.log("Connected to the employees database.".bold.green)

// Initialize main menu commands
const main = async () => {
  const data = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "startup",
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Update an employee manager',
        'View employees by department',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'View department budgets',
        'Quit']
    }
  ])

  result = data.startup
  console.log(result.bold.green)
  if (result === 'View all departments') {
    await displayDepartments()
  }

  if (result === 'View all roles') {
    await displayRoles()
  }
  if (result === 'View all employees') {
    await displayEmployees()
  }
  if (result === 'Add a department') {
    await addDepartment()
  }
  if (result === 'Add a role') {
    await addRole()
  }
  if (result === 'Add an employee') {
    await addEmployee()
  }
  if (result === 'Update an employee role') {
    await updateEmployee()
  }
  if (result === 'Update an employee manager') {
    await updateManager()
  }
  if (result === 'View employees by department') {
    await viewEmployeeDept()
  }
  if (result === 'Delete a department') {
    await deleteDepartment()
  }
  if (result === 'Delete a role') {
    await deleteRole()
  }
  if (result === 'Delete an employee') {
    await deleteEmployee()
  }
  if (result === 'View department budgets') {
    await viewDeptBudget()
  }
  if (result === 'Quit') {
    process.exit(0)
  }
}

// Show all departments
const displayDepartments = async () => {
  console.log("Displaying all departments...\n".green)
  const sqlDepts = `SELECT
                id,
                department_name AS department FROM department`

  const { rows } = await pool.query(sqlDepts)
  console.table(rows)
}

// Show all roles
const displayRoles = async () => {
  console.log("Displaying all roles...\n".green)
  const sqlRoles = `SELECT 
                roles.id,
                roles.title,
                roles.salary,
                department.department_name AS department
              FROM
                roles
              INNER JOIN department ON roles.department_id = department.id`

  const { rows } = await pool.query(sqlRoles)
  console.table(rows)
}

// Show all employees
const displayEmployees = async () => {
  console.log("Displaying all employees...\n".green)
  const sqlEmployees = `SELECT employee.id,
                employee.first_name,
                employee.last_name,
                roles.title,
                department.department_name AS department,
                roles.salary,
              CONCAT (manager.first_name, ' ', manager.last_name) AS manager_name
              FROM
                employee
              LEFT JOIN roles ON employee.role_id = roles.id
              LEFT JOIN department ON roles.department_id = department.id
              LEFT JOIN employee manager ON employee.manager_id = manager.id`

  const { rows } = await pool.query(sqlEmployees)
  console.table(rows)
}

// Add a department
const addDepartment = async () => {
  const promptData = await inquirer.prompt([
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

  result = promptData.addDept

  const sqlAddDept = `INSERT INTO department (department_name)
                      VALUES ($1)`;
  const { rows } = await pool.query(sqlAddDept, [result])

  await displayDepartments();
}

// Add a role
const addRole = async () => {
  const prompt1Data = await inquirer.prompt([
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
        if (!isNaN(parseFloat(answer))) return true;
        return console.log("Please enter numbers for the salary");
      }
    }
  ])

  const sqlDepts = `SELECT department_name, id FROM department`;

  const { rows } = await pool.query(sqlDepts)

  const depts = rows.map(({ department_name, id }) => {
    return { name: department_name, value: id }
  })

  const prompt2Data = await inquirer.prompt([
    {
      type: 'list',
      name: 'dept',
      message: "What department is this role in?",
      choices: depts
    }
  ])

  const params = [prompt1Data.role, prompt1Data.salary, prompt2Data.dept]
  const sqlRoles = `INSERT INTO
                    roles (title, salary, department_id)
                   VALUES 
                    ($1, $2, $3)`

  const rolesQuery = await pool.query(sqlRoles, params)

  await displayRoles()
}

// Add an employee
const addEmployee = async () => {
  const prompt1Data = await inquirer.prompt([
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
  ])

  const sqlRoles = `SELECT roles.id, roles.title FROM roles`;
  const { rows } = await pool.query(sqlRoles)

  const roles = rows.map(({ title, id }) => {
    return { name: title, value: id }
  })

  const prompt2Data = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeRole',
      message: "What is the employee's role?",
      choices: roles
    }
  ])

  const sqlManagers = `SELECT * FROM employee`;
  const managersQuery = await pool.query(sqlManagers)

  const managers = managersQuery.rows.map(({ id, first_name, last_name }) => {
    return { name: first_name + ' ' + last_name, value: id }
  })

  const prompt3Data = await inquirer.prompt([
    {
      type: 'list',
      name: 'manager',
      message: "Who is the employee's manager?",
      choices: managers
    }
  ])

  const sqlEmployee = `INSERT INTO
      employee 
      (first_name,
      last_name,
      role_id,
      manager_id)
      VALUES ($1, $2, $3, $4)`;
  const params = [
    prompt1Data.firstName,
    prompt1Data.lastName,
    prompt2Data.employeeRole,
    prompt3Data.manager
  ]

  const addEmployeeQuery = await pool.query(sqlEmployee, params)
  console.log("Added employee!".green)

  console.table(rows)
  await displayEmployees()
}

// Update an employee role
const updateEmployee = async () => {
  const sqlEmployees = `SELECT * FROM employee`
  const { rows } = await pool.query(sqlEmployees)

  const employee = rows.map(({ id, first_name, last_name }) => {
    return { name: first_name + ' ' + last_name, value: id }
  })

  const prompt1Data = await inquirer.prompt([
    {
      type: 'list',
      name: 'updateEmployeeRole',
      message: "Which employee role would you like to update?",
      choices: employee
    }
  ])


  const sqlRoles = `SELECT * FROM roles`;
  const rolesQuery = await pool.query(sqlRoles)

  const roles = rolesQuery.rows.map(({ title, id }) => {
    return { name: title, value: id }
  })

  const prompt2Data = await inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: "What is the employee's new role?",
      choices: roles
    }
  ])

  const sqlUpdateEmp = `UPDATE employee SET role_id = $1 WHERE id = $2`;

  const params = [
    prompt2Data.role,
    prompt1Data.updateEmployeeRole
  ]

  const updateEmployeeQuery = await pool.query(sqlUpdateEmp, params)
  console.log("Employee has been updated!".green);

  await displayEmployees()
}

// Update a manager
const updateManager = async () => {
  const sqlEmployees = `SELECT * FROM employee`;
  const { rows } = await pool.query(sqlEmployees)

  const employees = rows.map(({ id, first_name, last_name }) => {
    return { name: first_name + ' ' + last_name, value: id }
  })

  const prompt1Data = await inquirer.prompt([
    {
      type: 'list',
      name: 'name',
      message: "Which employee would you like to update?",
      choices: employees
    }
  ])

  const sqlManagers = `SELECT * FROM employee`;
  const managersQuery = await pool.query(sqlManagers)

  const managers = managersQuery.rows.map(({ id, first_name, last_name }) => {
    return { name: first_name + ' ' + last_name, value: id }
  })

  const prompt2Data = await inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: "Who is this employee's manager?",
      choices: managers
    }
  ])

  const sqlUpdateManager = `UPDATE employee SET manager_id = $1 WHERE id = $2`;

  const params = [
    prompt2Data.role,
    prompt1Data.name
  ]

  const updateEmployeeQuery = await pool.query(sqlUpdateManager, params)
  console.log("Employee has been updated!".green);

  await displayEmployees()
}

// View employees by department
const viewEmployeeDept = async () => {
  console.log("Displaying employee by departments...\n".green);
  const sqlEmpDept = `SELECT employee.first_name, 
                      employee.last_name, 
                      department.department_name AS department
               FROM employee 
               LEFT JOIN roles ON employee.role_id = roles.id 
               LEFT JOIN department ON roles.department_id = department.id`;

  const { rows } = await pool.query(sqlEmpDept)
  console.table(rows)
}

// Delete a department
const deleteDepartment = async () => {
  const sqlDepts = `SELECT * FROM department`
  const { rows } = await pool.query(sqlDepts)

  const dept = rows.map(({ department_name, id }) => {
    return { name: department_name, value: id }
  })

  const promptData = await inquirer.prompt([
    {
      type: 'list',
      name: 'dept',
      message: "What department do you want to delete?",
      choices: dept
    }
  ])

  const deletedDept = promptData.dept
  const sqlDelDept = `DELETE FROM department WHERE id = $1`;

  const delRoleQuery = await pool.query(sqlDelDept, [deletedDept])
  console.log("Deleted department".green)

  await displayDepartments()
}

// Delete a role
const deleteRole = async () => {
  const sqlRoles = `SELECT * FROM roles`
  const { rows } = await pool.query(sqlRoles)

  const role = rows.map(({ id, title }) => {
    return { name: title, value: id }
  })

  const promptData = await inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: "What role do you want to delete?",
      choices: role
    }
  ])

  const deletedRole = promptData.role
  const sqlDelRole = `DELETE FROM roles WHERE id = $1`;

  const delRoleQuery = await pool.query(sqlDelRole, [deletedRole])
  console.log("Deleted role".green)

  await displayRoles()
}

// Delete an employee
const deleteEmployee = async () => {
  const sqlEmployees = `SELECT * FROM employee`
  const { rows } = await pool.query(sqlEmployees)

  const employees = rows.map(({ id, first_name, last_name }) => {
    return { name: first_name + ' ' + last_name, value: id }
  })

  const promptData = await inquirer.prompt([
    {
      type: 'list',
      name: 'name',
      message: "Which employee would you like to delete?",
      choices: employees
    }
  ])

  const deletedEmp = promptData.name
  const sqlDelEmp = `DELETE FROM employee WHERE id = $1`;

  const delEmployeeQuery = await pool.query(sqlDelEmp, [deletedEmp])
  console.log("Deleted employee".green)

  await displayEmployees()
}

// View department budgets
const viewDeptBudget = async () => {
  console.log("Displaying budget by department...\n".green);

  const sqlDeptBudget = `SELECT roles.department_id AS id, 
                      department.department_name AS department,
                      SUM(roles.salary) AS budget
               FROM
                roles  
               JOIN department ON roles.department_id = department.id
               GROUP BY
                roles.department_id,
                department.department_name`;

  const { rows } = await pool.query(sqlDeptBudget)
  console.table(rows)
}

(async () => {
  while (true) {
    try {
      await main();
    } catch (error) {
      console.error(colors.bgBrightRed(error))
    }
  }
})()