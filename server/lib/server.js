require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/************************Import Model******************************/
let Todo = require('./models/Todo.js');
/************************Import Model******************************/

const server = {}

/*****************************CORS*********************************/
server.enableCORS = function(req, res, next) {
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
app.use(server.enableCORS);

//fetching data
app.get('/api/todos', (req, res) => {
    Todo.find({}, (err, docs)=>{
      if(err){
        res.status(500).send('DB Error')
      }
      else if(docs){
        res.status(200).json(docs);
      }
    });
});

//Adding data
app.post('/api/todos', (req, res) => {
  let {userId, title, description, deadline, priority, tag} = req.body;
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

//Delete data
app.delete('/api/todos/:deadline_id/:todo_id', (req, res) => {
  let deadline_id = req.params.deadline_id;
  let todo_id = req.params.todo_id;
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
});

//Handle production
if(process.env.NODE_ENV === 'production'){
  //Static folder
  app.use(express.static(__dirname + '/public'))

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

server.init = ()=>{
  app.listen(process.env.PORT||5000, ()=>{
    console.log('\x1b[34m%s\x1b[0m', `server listening`)
  });
}

module.exports = server