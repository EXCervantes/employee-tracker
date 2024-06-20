const express = require("express");
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

const promptQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "startup",
  },
  {
    type: "input",
    message: "Enter the color name or a hexadecimal number value for the TEXT:",
    name: "textcolor",
    validate: function (answer) {
      if (answer.length > 2) return true;
      return console.log("Please enter a valid color or hexadecimal number.");
    }
  },
  {
    type: "input",
    message: "Enter the color name or a hexadecimal number value for the SHAPE:",
    name: "shapecolor",
    validate: function (answer) {
      if (answer.length > 2) return true;
      return console.log("Please enter a valid color or hexadecimal number.");
    }
  },
  {
    type: "list",
    message: "Choose a the shape you would like:",
    name: "shape",
    choices: [
      "Circle",
      "Square",
      "Triangle",
    ],
  },
];

pool.connect();



// Request for all other responses
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
