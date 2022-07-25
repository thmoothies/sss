const express = require("express");
const mysql = require("mysql");
const fs = require("fs");
const app = express();

const port = 3000;

app.use(express.static('src'));

if (!process.env.DBHOST) {
  throw new Error("Please specify the name of an Azure storage account in environment variable DBHOST.");
}

if (!process.env.DBUSER) {
  throw new Error("Please specify the access key to an Azure storage account in environment variable DBUSER.");
}

if (!process.env.DBPASSWORD) {
  throw new Error("Please specify the access key to an Azure storage account in environment variable DBPASSWORD.");
}

if (!process.env.DBNAME) {
  throw new Error("Please specify the access key to an Azure storage account in environment variable DBNAME.");
}

const DBHOST = process.env.DBHOST;
const DBUSER = process.env.DBUSER;
const DBPASSWORD = process.env.DBPASSWORD;
const DBNAME = process.env.DBNAME;

var conn = mysql.createConnection(
  {
      host: DBHOST,
      user: DBUSER,
      password: DBPASSWORD,
      database: DBNAME,
      port: 3306,
      ssl: {
          ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")
      }
  });



function createShoesTable(){
  sql = `create table sss.shoes_table(
    id  INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL
  )`
  console.log(DBNAME)
  conn.query(sql, function(err, result){
    if(err){
      console.log(err)
    } else{
      console.log(result)
    }
  })
}

function insertShoes(){
  sql = "insert into sss.shoes_table(name) values('DIOR x NIKE Air Jordan1 HIGH OG')"
  conn.query(sql, function(err, result){
    if(err){
      console.log(err)
    } else{
      console.log(result)
    }
  })
  sql = "insert into sss.shoes_table(name) values('DIOR x NIKE Air Jordan1 LOW OG')"
  conn.query(sql, function(err, result){
    if(err){
      console.log(err)
    } else{
      console.log(result)
    }
  })
}
function createDatabase(){
  sql = `create database ${DBNAME}`
  conn.query(sql, function(err, result){
    if(err){
      console.log(err)
    } else{
      console.log(result)
    }
  })
}

function selectAllShoes(){
  sql = `select * from sss.shoes_table`
  conn.query(sql, function(err, result){
    if(err){
      console.log(err)
    } else{
      console.log(result)
    }
  })
}

app.listen(port, async ()=>  {
  selectAllShoes();
  console.log(`app is listening on ${port}`);
})