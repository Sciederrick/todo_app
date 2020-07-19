require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
/************************Import Model******************************/
let Todo = require('./models/Todo.js');
/************************Import Model******************************/

/*****************************CORS*********************************/
const enableCORS = function(req, res, next) {
  if (!process.env.DISABLE_XORIGIN) {
    const allowedOrigins = ['http://localhost:8081', 'http://localhost:8080', 'http://localhost:8082'];
    let origin = req.headers.origin;
    if(!process.env.XORIGIN_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      let now = new Date().toLocaleString();
      console.log(`[${now}] ${req.method} ${req.path} - ${req.ip}`);
      res.set({
        "Access-Control-Allow-Origin" : origin,
        "Access-Control-Allow-Methods" : "GET, PUT, PATCH, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
      });
    }
  }
  next();
};
/*****************************CORS*********************************/

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(enableCORS);

//fetching data
app.get('/todos', (req, res) => {
  console.log('fetch request');
  /****************************************DB********************************************/
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, '[mongodb] connection error:'));
  db.once('open', ()=>{
    //We're connected
    console.log('%cStatus 200 => OK[mongoDB]', 'color: white; background: green; font-weight: bold;');
    Todo.find({}, function (err, docs) {
      if(err) console.error.bind(console, err);
    console.log('fetch successfull');
      res.json(docs);
    });
  });
  /****************************************DB********************************************/
});

//Adding data
app.post('/todos', (req, res) => {
  console.log('post request');
  console.log(req.body);
  let {title, datetime, completed} = req.body;
  /****************************************DB********************************************/
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, '[mongodb] connection error:'));
  db.once('open', ()=>{
      //We're connected
    console.log('%cStatus 200 => OK[mongoDB]', 'color: white; background: green; font-weight: bold;');
      //Build model
    let todo =  new Todo({
      title,
      datetime,
      completed
    });
      //Save to DB
    todo.save((err)=>{
      if(err) return console.error.bind(console, err);
      console.log('data saved successfully');
      return res.json({title, datetime, completed});
    });
  });
  /*****************************************DB***********************************************/
});

//Delete data
app.delete('/todos/:_id', (req, res) => {
  console.log(`[${req.params._id}] delete request`);
  let _id = req.params._id;
  /*****************************************DB***********************************************/
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, '[mongodb] connection error:'));
  db.once('open', ()=>{
      //We're connected
    console.log('%cStatus 200 => OK[mongoDB]', 'color: white; background: green; font-weight: bold;');
    Todo.deleteOne({_id}, err=>console.error.bind(console, err));
    return res.json({_id});
  /*****************************************DB***********************************************/
  });
});

//Handle production
if(process.env.NODE_ENV === 'production'){
  //Static folder
  app.use(express.static(__dirname + '/public'))

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

app.listen(process.env.PORT||5000);
