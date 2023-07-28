const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  password: "password",
  host: "localhost",
  database: "expressjs",
});

//Put by id
app.put("/put/:id", (req, res) => {
    console.log('iam put');
  const itemName = req.body.itemName;
  const description = req.body.description;
  const price = req.body.price;
  const sql = "UPDATE expressjs.products SET itemName = ?, description = ?, Price = ? WHERE id =";
  db.query(sql + req.params.id, [itemName, description, price], (err, data) => {
    err ? res.json(err) : res.json(data);
  });
});

//Get all
app.get("/", (req, res) => {
  const sql = "SELECT * FROM expressjs.products";
  db.query(sql, (err, data) => {
    err ? res.json(err) : res.json(data);
  });
});

// Get by id
app.get("/create/:id", (req, res) => {
    console.log('ididididid', req.params.id)
  const sql = "SELECT * FROM expressjs.products where id = ";
  db.query(sql + req.params.id, (err, data) => {
    err ? res.json(err) : res.json(data);
  });
});



//Post
app.post("/create", (req, res) => {
  const itemName = req.body.itemName;
  const description = req.body.description;
  const price = req.body.price;
  console.log(itemName);

  db.query(
    "INSERT INTO expressjs.products (itemName, description, price) VALUES (?,?,?)",
    [itemName, description, price],
    (err, data) => {
      err ? console.log(err) : res.json("saved succesfully");
    }
  );
});

//Delete by id
app.delete("/delete/:id", (req, res) => {
    console.log(req.params.id)
  db.query("DELETE FROM expressjs.products WHERE id=" + req.params.id, (err, data) => {
    err ? console.log(err) : res.json("deleted succesfully");
  });
});

app.listen(8080);
