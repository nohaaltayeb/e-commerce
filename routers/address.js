const {verify} = require("../utils/auth");
const {Address} = require("../models")
const express = require("express");
const router = express.Router();
module.exports = router;

router.post("/address", verify, async(req,res)=>{
    const address = await Address.create({
    //userId: req.body.userId,
    address1: req.body.address1,
    city: req.body.city,
    country: req.body.country,
    post_code: req.body.post_code,
    telephone: req.body.telephone

    })
    const savedAddress = address.save();
      if(!savedAddress){
          res.status(404).send("no data found ")
      }
      return res.status(200).send(address)
})

router.put("/address", verify, async(req,res)=>{
    const address = await Address.update({
        address1: req.body.address1,
        city: req.body.city,
        country: req.body.country,
        post_code: req.body.post_code,
        telephone: req.body.telephone
    },
    {
        where:{id:req.body.id}
    }
    )
    res.status(200).send("User updated successfully!");
})

router.delete("/address", verify,
    async (req, res)=>{

        const address = await Address.destroy({
          where:{id:req.body.id}
        });
        if(!address){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("Address deleted")
    })

router.get("/address",
    async (req, res)=>{
        const address = await Address.findAll();
        if (!address){
            res.status(400).send("No data found")
        }
        else{
            res.status(200).send(address)
        }
    })




