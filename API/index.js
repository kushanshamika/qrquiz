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

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

app.post('/api/addquiz',(req,res)=>{
	var id = makeid(5);
	var values = [id,req.body.q,req.body.a1,req.body.a2,req.body.a3,req.body.a4,req.body.cAns];
	var sql = 'INSERT INTO quiz VALUES (?)';
	conn.query(sql,[values],(err,rows,field)=>{
	if(!err)
	res.send({"id":id})
	else
	res.send(err)
})
})

app.post('/api/quiz',(req,res)=>{
	var values = [req.body.userID,req.body.quizID];
	var sql = 'SELECT * FROM answer WHERE userID = ? AND quizID = ?';
	conn.query(sql,[values],(err,rows,field)=>{
	if(rows){
//	var result = Object.assign({},{"status":true},rows[0]);
//	res.send(result);
	res.send({"status":false})
	}else{
	var values = [req.body.quizID];
	var sql = 'SELECT * FROM quiz WHERE quizID = ?';
	conn.query(sql,[values],(err,rows,field)=>{
	var result = Object.assign({},{"status":true},rows[0]);
        res.send(result);
})
}
})
})

