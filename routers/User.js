const {verify} = require("../utils/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
module.exports = router;
const {User} = require("../models")

router.post("/users/SignUp",async function(req,res, next){

    //hash Password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const users = await User.create({
          email: req.body.email,
          password: hashedPassword,
          permissions:req.body.permissions,
          firstName:req.body.firstName,
          lastName:req.body.lastName
          
      })
      const savedUser = users.save();
      if(!savedUser){
          res.status(404).send("no data found ")
      }
      return res.status(200).send(users)
  })

//Login 
router.post("/users/Login/",async (req,res)=>{
    const users= await User.findOne({
      where:{ email:req.body.email}
       });
       
       if(!users) {return res.status(400).send("email or password is wrong ..");}
      
       //password is correct
       const validPass = await bcrypt.compare(req.body.password,users.password);
       if(!validPass){ return res.status(400).send("Invalid Password")};
      
      
      //create and assign jwt
      const token = jwt.sign({id:users.id},"SECRET");
      return res.header('auth_token', token).send(token);
      
    })

router.put("/users/",
    async function(req, res, next){
        //id:req.body.id;
        const users = await User.update({
            
            username: req.body.username,
            password: req.body.password,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            permissions:req.body.permissions
            },
            {
            where:{id:req.body.id}
            }
            )
            res.status(200).send("User updated successfully!");
    })
   
router.delete("/users/",
    async (req, res)=>{

        const users = await User.destroy({
          where:{id:req.body.id}
        });
        if(!users){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("User deleted")
    })

router.get("/users",
    async (req, res)=>{
        const users = await User.findAll();
        if (!users){
            res.status(400).send("No data found")
        }
        else{
            res.status(200).send(users)
        }
    })
