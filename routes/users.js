var express = require('express');
var router = express.Router();
const Users = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




router.post('/register', async(req,res)=>{
  // const salt = await bcrypt.genSalt(10)

  let {name,email,age,phone,address,profession,password} = req.body
  password = await bcrypt.hash(password, 10);
  const newUser = new Users({
    name, email, age, phone, address, profession, password
  })
  await newUser.save();
  res.send(newUser);
  console.log(newUser);
});

//Get Users List
// Path : /user/users
// Private <- !Public
router.get('/users', async(req,res)=>{
  try {
    const users = await Users.find({}).sort({_id:-1}) // sort Basic on last user added
    res.status(200).json({
      success:true,
      data:users
    }) 
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Unexpected Error"
    })  //  Incase its Crash :-)
  }
})

// Post Login 
// users/login 
// Public
router.post('/login', async function(req, res, next) {
  if(req.body.email && req.body.password){
    try {
      Users.findOne({email:req.body.email.toLowerCase()}).then(user=>{
        if(!user){
          res.status(404).json({
              success:false,
              error: "Invalid Username/Password"
            })
        }else{
          if(user.password == bcrypt.hash(req.body.password, 10)){ // So Yea Need a litle cleaning 
            const token = jwt.sign({
                id:user._id
              }, process.env.SECERT_KEY,{
                expiresIn:86400, //24 Hours 
            })

            res.status(200).json({
              success: true,
              status: "success",
              data: user,
              access_token: token
            });

          }else{
            res.status(404).json({
              success:false,
              error: "Invalid Username/Password"
            })
          }
        }
      }).catch(err =>{
        res.status(500).json({
          success:false,
          error: err
        })
      })
    } catch (error) {
      res.status(500).json({
        success:false,
        error: error
      })
    }
}else{
  res.status(400).json({
    success:false,
    error: "username And Password Are Required"
  })
}
});

module.exports = router;
