const {verify} = require("../utils/auth");
const {order,orderDetails} = require("../models")
const express = require("express");
const router = express.Router();
module.exports = router;


router.post("/orderDetails", verify, async(req,res)=>{
    const orders = await orderDetails.create({
        

        quantity: req.body.quantity,
        price:req.body.price,
        orderId: req.body.orderId,
        total: req.body.quantity*req.body.price
        
 })
    console.log(orders.total)
    const savedData = orders.save();
      if(!savedData){
          res.status(404).send("no data found ")
      }
      return res.status(200).send(orders)

})



router.get("/orderDetails", verify,
    async (req, res)=>{
        const orders = await orderDetails.findAll();
        if (!orders){
            res.status(400).send("No data found")
        }
        else{
            res.status(200).send(orders)
        }
})

//update order details
router.put("/orderDetails", verify, async(req,res)=>{
    const orders = await orderDetails.update({
        totals:req.body.totals,
        quantity:req.body.quantity
    },
    {
        where:{id:req.body.id}
    }
    )
    res.status(200).send("order details updated ");
    if(!orders){
        res.status(404)
    }
})

router.delete("/orderDetails", verify,
    async (req, res)=>{

        const orders = await orderDetails.destroy({
          where:{id:req.body.id }
        });
        if(!orders){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("order Details deleted")
    })