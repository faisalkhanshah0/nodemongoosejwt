var express = require('express');
var router = express.Router();
const _ = require('lodash');
var { Todo } = require('.././models/todos');

var fetch = (docs) => {
  return new Promise((resolve, reject) => {
    Todo.find().then((res) => {
      var data = {
        docs,
        res
      } 
      resolve(data);
    }).catch((e) => {
      reject(e);
    });
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  
  //var newTodo = new Todo();
  
  Todo.find().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
    res.setHeader('contentType','application/json');
    res.send(docs);

  }).catch((e) => {
    console.log('error occured in insertion ', e);
  });
  
});

router.get('/add', function(req, res, next) {
  
  
  //var newTodo = new Todo();
  
  Todo.find().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
    // res.setHeader('contentType','application/json');
    res.render('add', {title : 'Add', msg : docs});

  }).catch((e) => {
    console.log('error occured in insertion ', e);
  });
  
});



router.post('/add', function(req, res, next) {
  
  // console.log(req.body);
  var obj = {
    text : req.body.text,
    completed : req.body.completed,
    completedAt : new Date().getTime()
  }
//  console.log('from postman',req.body);
  var newTodo = new Todo(obj);
  

  newTodo.save().then((docs) => {

    
    return fetch(docs);
  }).then((data) => {
    // console.log(JSON.stringify(docs, undefined, 2));
    // res.setHeader('contentType','application/json');
    res.render('add', {title : 'Add', msg : data.res});
  }).catch((e) => {
    console.log('error occured in insertion ', e);
  });
  
});


// Delete routing

router.get('/delete', function(req, res, next) {
  
  
  //var newTodo = new Todo();
  
  Todo.find().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
    // res.setHeader('contentType','application/json');
    res.render('delete', {title : 'Delete', msg : docs});

  }).catch((e) => {
    console.log('error occured in deletion ', e);
  });
  
});



router.post('/delete', function(req, res, next) {
  
  // console.log(req.body);
  var obj = {
    text : req.body.text
  }

  
  

  Todo.remove(obj).then((docs) => {

    return fetch(docs);
  }).then((data) => {
    res.render('delete', {title : 'Delete', msg : data.res});
  }).catch((e) => {
    console.log('error occured in deletion ', e);
  });
  
});
//delete router ends

//update router starts
router.get('/update', function(req, res, next) {
  
  
  //var newTodo = new Todo();
  
  Todo.find().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
    // res.setHeader('contentType','application/json');
    res.render('update', {title : 'Update', msg : docs});

  }).catch((e) => {
    console.log('error occured in updation ', e);
  });
  
});



router.post('/update', function(req, res, next) {
  
  // console.log(req.body);

    var eid = req.body.eid;
    var text = req.body.text;
  


  Todo.findByIdAndUpdate(eid, {
    $set : {
      text
  }
  }, { 
    new : true
  }).then((docs) => {

    return fetch(docs);
  }).then((data) => {
    res.render('update', {title : 'Update', msg : data.res});
  }).catch((e) => {
    console.log('error occured in updation ', e);
  });
  
});
//update router ends

router.get('*', function(req, res, next) {
  res.render('index', { title: '404' });
});
module.exports = router;
