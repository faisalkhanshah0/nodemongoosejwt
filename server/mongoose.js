const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var uri = 'mongodb://shah:shah@localhost:27017/todoapimongoose';
mongoose.connect(uri).then((result) => {
    console.log('connected successfully');
}).catch((e) => {
    console.log('Something went wrong in connection with mongo', e);
});

module.exports = {
    mongoose
}