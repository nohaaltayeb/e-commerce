const {verify} = require("../utils/auth");
const {category} = require("../models")
const express = require("express");
const router = express.Router();
module.exports = router;



router.post("/category", verify, async(req,res)=>{
    const categories = await category.create({
    //userId: req.body.userId,
    name: req.body.name,
    deletedAt: req.body.deletedAt

    })
    const savedData = categories.save();
      if(!savedData){
          res.status(404).send("no data found ")
      }
      return res.status(200).send(categories)
})

router.put("/category", verify, async(req,res)=>{
    const categories = await category.update({
        name: req.body.name,
        deletedAt: req.body.deletedAt
    },
    {
        where:{id:req.body.id}
    }
    )
    res.status(200).send("Category updated successfully!");
    if(!categories){
        res.status(404)
    }
})

router.delete("/category", verify,
    async (req, res)=>{

        const categories = await category.destroy({
          where:{id:req.body.id}
        });
        if(!categories){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("category deleted")
    })


router.get("/category/",verify,
    async (req, res)=>{
        const categories = await category.findAll();
        if (!categories){
            res.status(400).send("No data found")
        }
        else{
            res.status(200).send(categories)
        }
    })

