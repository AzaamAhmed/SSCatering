const express = require("express");

const dbConnection = require("./config/db")

const app = express();

//Db Connection

dbConnection();

app.get('/', (req, res) => res.send('Hello the Server is ready to Run...!'));

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));