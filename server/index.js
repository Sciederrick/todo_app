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
app.get('/api/todos', (req, res) => {
  console.log('fetch request');
  /****************************************DB********************************************/
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, '[mongodb] connection error:'));
  db.once('open', ()=>{
    //We're connected
    console.log('%cStatus 200 => OK[mongoDB]', 'color: white; background: green; font-weight: bold;');
    Todo.find({}, (err, docs)=>{
      if(err){
        res.status(500).send('DB Error')
      }
      else if(docs){
        res.status(200).json(docs);
      }
    });
  });
  /****************************************DB********************************************/
});

//Adding data
app.post('/api/todos', (req, res) => {
  console.log('post request');
  console.log(req.body);
  let {userId, title, description, deadline, priority, tag} = req.body;
  /****************************************DB********************************************/
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, '[mongodb] connection error:'));
  db.once('open', ()=>{
      //We're connected
    console.log('%cStatus 200 => OK[mongoDB]', 'color: white; background: green; font-weight: bold;');
      //Check existence of todo
    Todo.findOneAndUpdate({deadline}, {$push:{todos: {userId, title, description, priority, tag}}}, {new: true}, (err, task)=>{
      if(err){
        return res.status(500).json(err);
      }
      else if(task){
        //todo pushed into an existing deadline
        return res.status(200).send(`todo due on ${task.deadline} saved successfully`);
      }else{
        //Save todo with a new deadline
        let todo =  new Todo();
        todo.deadline = deadline
        todo.todos.push({userId, title, description, priority, tag})
        //Save to DB
        todo.save((err)=>{
          if(err){
            res.status(500).send(err._message)
          }else{
            return res.status(200).send(`todo due on ${deadline} saved successfully`);
          }
        });
      }
    });
  });
  /*****************************************DB***********************************************/
});

//Delete data
app.delete('/api/todos/:deadline_id/:todo_id', (req, res) => {
  console.log(`[${req.params.deadline_id}, ${req.params.todo_id}] delete request`);
  let deadline_id = req.params.deadline_id;
  let todo_id = req.params.todo_id;
  /*****************************************DB***********************************************/
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, '[mongodb] connection error:'));
  db.once('open', ()=>{
      //We're connected
    console.log('%cStatus 200 => OK[mongoDB]', 'color: white; background: green; font-weight: bold;');
    Todo.findOneAndUpdate({_id:deadline_id}, {$pull:{todos:{_id:todo_id}}}, {new:true}, (err, todo)=>{
      if(err){
        res.status(500).json({err})
      }else{
        console.log('todo: ',todo)
        if(todo.todos.length === 0){
          Todo.deleteOne({_id:deadline_id}, (err)=>{
            if(err){
              res.status(500).json({err})
            }else{
              res.status(200).json({message:'deadline now empty'})
            }
          })
        }else{
          res.status(200).json({todo})
        }
      }
    })
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
