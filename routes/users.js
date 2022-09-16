var express = require('express');
var router = express.Router();
const Users = require('../model/userSchema');
const bcrypt = require('bcrypt');

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


module.exports = router;
