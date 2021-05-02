const {verify, verifyAdmin} = require("../utils/auth");
const {discount} = require("../models")
const express = require("express");
const router = express.Router();
module.exports = router;


router.post("/discount", verify, async(req,res)=>{
    const discounts = await discount.create({
        name: req.body.name,
        discount_percentage:req.body.discount_percentage,
        active: req.body.active,
        deletedAt:req.body.deletedAt
})
    const savedData = discounts.save();
      if(!savedData){
          res.status(404).send("no data found ")
      }
      return res.status(200).send(discounts)

})



router.get("/discount", verify,
    async (req, res)=>{
        const discounts = await discount.findAll();
        if (!discounts){
            res.status(400).send("No data found")
        }
        else{
            res.status(200).send(discounts)
        }
})

//update order details
router.put("/discount", verify, async(req,res)=>{
    const discounts = await discount.update({
        name: req.body.name,
        discount_percentage:req.body.discount_percentage,
        active: req.body.active,
    },
    {
        where:{id:req.body.id}
    }
    )
    res.status(200).send("discount info updated ");
    if(!discounts){
        res.status(404)
    }
})

router.delete("/discount", verify,
    async (req, res)=>{

        const discounts= await discount.destroy({
          where:{id:req.body.id }
        });
        if(!discount){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("discount deleted")
    })