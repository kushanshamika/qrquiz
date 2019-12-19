var mysql = require('mysql');

var conn = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'4313@Samadhi',
        database:'quiz'
});

conn.connect((err)=>{
        if(!err)
        console.log("DB Connected")
        else
        console.log(err)
});

const express = require('express');
const bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(8080,()=>console.log("Express Server Sratrted"));

app.post('/api/user',(req,res)=>{
	var values = [req.body.userMail];
	var sql = 'SELECT userID FROM user WHERE userMail = ?';
	var response = "";
	conn.query(sql,[values],(err,rows,field)=>{
	response = rows[0];
	if (!response){
	var sql = 'INSERT INTO user(userMail) VALUES (?)';
	conn.query(sql,[values],(err,rows,field)=>{
	var response = rows.insertId;
	res.send({"userID":rows.insertId});
});
	}else{
	res.send(response)
	}
	console.log(err)
});
});
