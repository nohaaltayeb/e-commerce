const {verify} = require("../utils/auth");
const {product} = require("../models")
const express = require("express");
const router = express.Router();
module.exports = router;

router.post("/product", verify, async(req,res)=>{
    const products = await product.create({
    //userId: req.body.userId,
    discount_Percent: req.body.discount_Percent,
    price: req.body.price,
    name:req.body.name,
    deletedAt: req.body.deletedAt

    })
    const savedData = products.save();
      if(!savedData){
          res.status(404).send("no data found ")
      }
      return res.status(200).send(products)
})

//get all products
router.get("/product", verify,
    async (req, res)=>{
        const products = await product.findAll();
        if (!products){
            res.status(400).send("No data found")
        }
        else{
            res.status(200).send(products)
        }
})

router.put("/product", verify, async(req,res)=>{
    const products = await product.update({
        discount_Percent: req.body.discount_Percent,
        price: req.body.price,
        name:req.body.name,
        deletedAt: req.body.deletedAt
    },
    {
        where:{id:req.body.id}
    }
    )
    res.status(200).send("Product updated ");
    if(!products){
        res.status(404)
    }
})

router.delete("/product", verify,
    async (req, res)=>{

        const products = await product.destroy({
          where:{id:req.body.id }
        });
        if(!products){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("product deleted")
    })