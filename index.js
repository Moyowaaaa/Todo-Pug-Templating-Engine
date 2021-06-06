const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//connect
mongoose.connect('mongodb://localhost:27017/todos');
let db = mongoose.connection;

//check connection
db.once('open', function(){
    console.log("connected to the bloody database")
})

//check error
db.on('error', function(err){
    console.log(err);
})



const app = express();

//module
let Todo = require('./models/todo');
const todo = require('./models/todo');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

//set pulic folder
app.use(express.static(path.join(__dirname, 'public')));



app.get('/',function(req, res){
    Todo.find({}, function(err, todos){
        if(err){
            console.log(err);
        }else{
         res.render('home', {
             title: 'TODOS',
             todos: todos
     });
        }
 });
 });

 //add todo
 app.post('/', function(req, res){
     let todo = new Todo();
     todo.name = req.body.name;

     todo.save(function(err){
         if(err){
             console.log(err);
             return;
         }else{
             res.redirect('/');
         }
     });
 });

 //sdelet
 app.delete('/:id', function(req,res){
     let query = {_id:req.params.id}
     Todo.remove(query, function(err){
         if(err){
             console.log(err);
         }
         res.send('Success');
     });
 });
 
app.listen('2500', function(){
    console.log("we move on 2500")
});