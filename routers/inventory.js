const {verify} = require("../utils/auth");
const {inventory} = require("../models")
const express = require("express");
const router = express.Router();
module.exports = router;

router.post("/inventory", verify, async(req,res)=>{
    const inventories = await inventory.create({

    quantity: req.body.quantity,
    deletedAt: req.body.deletedAt

    })
    const savedData = inventories.save();
      if(!savedData){
          res.status(404).send("no data found ")
      }
      return res.status(200).send(inventories)
})

router.get("/inventory", verify,
    async (req, res)=>{
        const inventories = await inventory.findAll();
        if (!inventories){
            res.status(400).send("No data found")
        }
        else{
            res.status(200).send(inventories)
        }
})

router.put("/inventory", verify, async(req,res)=>{
    const inventories = await inventory.update({
        quantity:req.body.quantity,
        deletedAt: req.body.deletedAt
    },
    {
        where:{id:req.body.id}
    }
    )
    res.status(200).send("inventory updated ");
    if(!inventories){
        res.status(404)
    }
})

router.delete("/inventory", verify,
    async (req, res)=>{

        const inventories = await inventory.destroy({
          where:{id:req.body.id }
        });
        if(!inventories){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("inventory deleted")
    })