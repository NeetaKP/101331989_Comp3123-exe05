const express = require('express');
const app = express();
const router = express.Router();
var fs = require('fs');
var path = require('path')
app.use(express.json())


/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/


router.get('/home.html', (req,res) => {
  //res.send('This is home router');
  res.sendFile(path.join(__dirname + '/home.html'));
});

/*
- Return all details from user.json file to client as JSON format
*/
//router.get('/user',(req, res)=>{
//  res.send('This is profile router');
//  res.send(user)

//});



router.get('/profile', (req,res) => {
  //res.send('This is profile router');
  data =  fs.readFile('user.json', (err, data) => {
    res.write(data)
    res.end()
  })
  //res.send(data);
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
//router.post('/login', (req,res) => {
//  res.send('This is login router');
//})

router.post('/login',(req , res)=>{
  const jsonData = require('./user.json')
  const {username, password} = req.body;
  console.log(username)
  console.log(password)
  console.log(jsonData.username)
  console.log(jsonData.password)

  if(username == jsonData.username && password == jsonData.password){
    res.send({
      status: true,
      message: "User Is valid"
    });
  }else if (username !=jsonData.username){
    res.send({
      status : false,
      message : "User Name is invalid"
    })

  }else{
    res.send({
      status :false,
      message: "Password is invalid"
    });

  }
});


/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  //const username = req.params.username
  const jsonData = require('./user.json')
  const username = req.params.username;
  
  if(username == jsonData.username){
    res.send(`<b>${username} successfully logout.`);
  }
});



app.get('/error', (req, res)=>{
  throw new Error('This is a forced error');
  res.send('Welcome to Express error handling');
})
/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err,req,res,next) => {
  //res.send('This is error router');
  console.error(err.stack);
  res.status(500).send('Server Error')
});



app.use('/', router);

app.listen(process.env.port || 3000);

console.log('Web Server is listening at port '+ (process.env.port || 3000));