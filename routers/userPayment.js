const {verify} = require("../utils/auth");
const {PaymentType} = require("../models")
const express = require("express");
const router = express.Router();
module.exports = router;


router.post("/paymentType", verify, async(req,res)=>{
    const paymentType = await PaymentType.create({

    accountNumber: req.body.accountNumber,
    userId: req.body.userId
    })
    const saved = paymentType.save();
      if(!saved){
          res.status(404).send("no data found ")
      }
      return res.status(200).send(paymentType)
})

router.put("/paymentType", verify, async(req,res)=>{
    const paymentType = await PaymentType.update({
        accountNumber: req.body.accountNumber
    },
    {
        where:{id:req.body.id}
    }
    )
    res.status(200).send("Payment updated successfully!");
})

router.delete("/paymentType", verify,
    async (req, res)=>{

        const paymentType = await PaymentType.destroy({
          where:{id:req.body.id}
        });
        if(!paymentType){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("Payment method deleted")
    })

router.get("/paymentType",
    async (req, res)=>{
        const paymentTypes = await PaymentType.findAll();
        if (!paymentTypes){
            res.status(400).send("No data found")
        }
        else{
            res.status(200).send(paymentTypes)
        }
    })
