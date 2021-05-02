const {verify} = require("../utils/auth");
const {shoppingCart} = require("../models")
const express = require("express");
const router = express.Router();
module.exports = router;

router.post("/cart", verify, async(req,res)=>{
    const cart = await shoppingCart.create({
    userId: req.body.userId,
    productId: req.body.productId,
    quantity:req.body.quantity,
    total: req.body.total

    })
    const savedData = cart.save();
      if(!savedData){
          res.status(404).send("no data found ")
      }
      return res.status(200).send(cart)
})

router.get("/cart", verify,
    async (req, res)=>{
        const cart = await shoppingCart.findAll();
        if (!cart){
            res.status(400).send("No data found")
        }
        else{
            res.status(200).send(cart)
        }
})

router.put("/cart", verify, async(req,res)=>{
    const cart = await shoppingCart.update({
        quantity:req.body.quantity,
        total: req.body.total
    },
    {
        where:{id:req.body.id}
    }
    )
    res.status(200).send("Cart updated ");
    if(!cart){
        res.status(404)
    }
})

router.delete("/cart", verify,
    async (req, res)=>{

        const cart = await shoppingCart.destroy({
          where:{id:req.body.id }
        });
        if(!cart){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("Cart deleted")
    })