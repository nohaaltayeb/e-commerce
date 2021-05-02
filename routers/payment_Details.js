const {verify} = require("../utils/auth");
const {Payment} = require("../models")
const express = require("express");
const router = express.Router();
module.exports = router;


router.post("/payment", verify, async(req,res)=>{
    const payments = await Payment.create({

        orderId: req.body.orderId,
        amount:req.body.amount,
        type:req.body.type
    })
    const saved = payments.save();
      if(!saved){
          res.status(404).send("no data found ")
      }
      return res.status(200).send(payments)
})

router.put("/payment", verify, async(req,res)=>{
    const payments = await Payment.update({
        amount:req.body.amount,
        type:req.body.type
    },
    {
        where:{id:req.body.id}
    }
    )
    res.status(200).send("Payment updated successfully");
})

router.delete("/payment", verify,
    async (req, res)=>{

        const payments = await Payment.destroy({
          where:{id:req.body.id}
        });
        if(!payments){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("Payment deleted")
    })

router.get("/payment",
    async (req, res)=>{
        const payments = await Payment.findAll();
        if (!paymentTypes){
            res.status(400).send("No data found")
        }
        else{
            res.status(200).send(payments)
        }
    })
