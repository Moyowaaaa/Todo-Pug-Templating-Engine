const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


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
let Todo = require('./models/todo')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');


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
app.get('/add', function(req, res){
    res.render('add', {
    title: 'Add todos'
});
});


app.listen('2500', function(){
    console.log("we move on 2500")
});