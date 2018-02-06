var express = require('express');
var router = express.Router();
const _ = require('lodash');
var { User } = require('.././models/users');

var fetch = (docs) => {
  return new Promise((resolve, reject) => {
    User.find().then((res) => {
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
  
  
  //var newUser = new User();
  
  User.find().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
    res.setHeader('contentType','application/json');
    res.send(docs);

  }).catch((e) => {
    console.log('error occured in insertion ', e);
  });
  
});

router.get('/add', function(req, res, next) {
  
  
  //var newUser = new User();
  
  User.find().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
    // res.setHeader('contentType','application/json');
    res.render('useradd', {title : 'Add', msg : docs});

  }).catch((e) => {
    console.log('error occured in insertion ', e);
  });
  
});



router.post('/add', function(req, res, next) {
  
  // console.log(req.body);
  var obj = {
    email : req.body.email,
    password : req.body.password
  }
//  console.log('from postman',req.body);
  var newUser = new User(obj);
  

  newUser.save().then((docs) => {

    return docs.generateAuthToken();
    
  }).then((token) => {
    res.header('x-auth', token).send(newUser);
  }).catch((e) => {
    res.status(400).send(e);
  });

  // or below are same diff is docs in ist then

  // newUser.save().then(() => {

  //   return docs.generateAuthToken();
    
  // }).then((token) => {
  //   res.send(newUser);
  // }).catch((e) => {
  //   res.status(400).send(e);
  // });
  
});


// private routes starts here

var { authenticate } = require('.././middleware/authenticate');

router.get('/me', authenticate, function(req, res, next) {

    res.send(req.user);
  
});

// private routes ends here

// Delete routing

router.get('/delete', function(req, res, next) {
  
  
  //var newUser = new User();
  
  User.find().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
    // res.setHeader('contentType','application/json');
    res.render('userdelete', {title : 'Delete', msg : docs});

  }).catch((e) => {
    console.log('error occured in deletion ', e);
  });
  
});



router.post('/delete', function(req, res, next) {
  
  // console.log(req.body);
  var obj = {
    text : req.body.text
  }

  
  

  User.remove(obj).then((docs) => {

    return fetch(docs);
  }).then((data) => {
    res.render('userdelete', {title : 'Delete', msg : data.res});
  }).catch((e) => {
    console.log('error occured in deletion ', e);
  });
  
});
//delete router ends

//update router starts
router.get('/update', function(req, res, next) {
  
  
  //var newUser = new User();
  
  User.find().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
    // res.setHeader('contentType','application/json');
    res.render('userupdate', {title : 'Update', msg : docs});

  }).catch((e) => {
    console.log('error occured in updation ', e);
  });
  
});



router.post('/update', function(req, res, next) {
  
  // console.log(req.body);

    var eid = req.body.eid;
    var text = req.body.text;
  


  User.findByIdAndUpdate(eid, {
    $set : {
      text
  }
  }, { 
    new : true
  }).then((docs) => {

    return fetch(docs);
  }).then((data) => {
    res.render('userupdate', {title : 'Update', msg : data.res});
  }).catch((e) => {
    console.log('error occured in updation ', e);
  });
  
});
//update router ends

router.get('*', function(req, res, next) {
  res.render('index', { title: 'User 404' });
});
module.exports = router;
