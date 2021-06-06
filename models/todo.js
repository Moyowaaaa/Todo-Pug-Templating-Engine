let mongoose = require('mongoose');

// todos 
let todoschema = mongoose.Schema({
    name:{
        type: String,
        required:true
    }
});

let Todo = module.exports = mongoose.model('Todo', todoschema);