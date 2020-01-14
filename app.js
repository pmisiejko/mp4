const express = require('express');
const bodyParser = require('body-parser');
const port = 3001;
// const cors = require('cors');
const app = express();

const db = require('./db.js');

/*
const mysql = require('mysql');
const db = mysql.createConnection({
    host:"127.0.0.1",
    user: "root",
    password: "admin",
    database: "flowers_store",
    port: 3306
})

db.connect(err => {
    if (!err) {
      console.log("DB Connection Succeeded");
    } else {
      console.log("DB Connection Failed" + err);
    }
  });

module.exports = db;
*/

// parsuje dane typu application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parsuje dane typu application/json
app.use(bodyParser.json())
app.use(express.static(__dirname + "/../public"));

//enable CORS
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "localhost"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

const userService = require('./api/userService');
app.use('/api/users', userService.route);

const produktService = require('./api/produktService');
app.use('/api/produkts', produktService.route);


const orderService = require('./api/orderService');
app.use('/api/orders', orderService.route);



app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});

// GET all rows from table Klient
app.get('/klienci',(req, res)=>{
  db.query('SELECT * FROM Klient', (err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
})

// GET id rows from table Klient
app.get('/klienci/:id',(req, res)=>{
  db.query('SELECT * FROM Klient WHERE ID_klienta = ?',[req.params.id] ,(err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
})