const { mongoose } = require('.././server/mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
    text : {
        type : String,
        required : true,
        trim : true,
        minlength : 1
        
    },
    completed : {
        type : Boolean,
        required : true,
        trim : true,
        minlength : 1,
        default : false
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