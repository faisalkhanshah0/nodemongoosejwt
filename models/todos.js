const { mongoose } = require('.././server/mongoose');
const validator  = require('validator');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
    text : {
        type : String,
        required : true,
        trim : true,
        minlength : 1,
        
        
    },
    completed : {
        type : Boolean,
        required : true,
        trim : true,
        minlength : 1,
        default : false,
        validate : {
            validator : validator.isBoolean,
            message : '{VALUE} is not a valid boolean value.'
        }
    },
    completedAt : {
        type : String,
        default : null

    }
});

var Todo = mongoose.model('Todos', todoSchema);

module.exports = {
    Todo
}