const http = require('http');
const { appendFile } = require('fs');
const express = require('express');
const app = express();

var mysql = require('mysql');
var url = require('url');

// 使用node test.js启动

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'event'
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
  
  console.log(encodeURI(req.url));
  var parseObj = url.parse(req.url, true);
  var pathname = parseObj.pathname; //相当于无参数的url路径
  // 这里将解析拿到的查询字符串对象作为一个属性挂载给 req 对象，
  req.query = parseObj.query;
  response = req.query;
  res.json(req.query)

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

// 127.0.0.1:3000/get_data 访问数据
app.listen(3000,()=>{console.log('3000..')}) // 设置端口