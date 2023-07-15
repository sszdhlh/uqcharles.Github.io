const http = require('http');
const { appendFile } = require('fs');
const express = require('express');
const app = express();

var mysql = require('mysql');
var url = require('url');

const fs = require("fs");

// nodejs 所有跨域请求
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// 使用node test.js启动
var db = mysql.createConnection({
  host     : 'bdm820327669.my3w.com',
  user     : 'bdm820327669',
  password : 'Kitty19821025',
  database : 'bdm820327669_db'
});
 
db.connect((err)=>{
  if(err){
    throw err;
    console.log('success');
  }
});
 
// 获取数据

app.get('/get_data',(req,res)=>{
  let sql = 'select * from new_table';
  db.query(sql,(err, result)=>{
    if(err){
      console.log(err);
      return;
    }else{
      console.log(result)
      res.json(result)
      return;
    }
  })
})

// 保存数据
app.get('/insert_data',(req,res)=>{

  let sql = 'INSERT INTO new_table(Title,Name,Place,Date,Facilities,Photos,Details) VALUES(?,?,?,?,?,?,?)';
  // console.log(encodeURI(req.url));
  var parseObj = url.parse(req.url, true);
  response = parseObj.query;

  let data = [
    response['Title'], 
    response['Name'], 
    response['Place'], 
    response['Date'], 
    response['Facilities'], 
    response['Photos'],
    response['Details'], 
  ];
  
  db.query(sql,data,(err, result) => {
    if(err){
      console.log(err);
      return;
    }else{
      res.json(result);
      console.log('增加成功:', result);
      return;
    }
  })
})

// 127.0.0.1:8081/get_data 访问数据
app.listen(3000,()=>{console.log('3000..')}) // 设置端口