const {verify} = require("../utils/auth");
const {order,orderDetails} = require("../models")
const express = require("express");
const router = express.Router();
module.exports = router;
//const sequelize = require("sequelize")
const { QueryTypes, Sequelize} = require("sequelize");

router.post("/orders", verify, async(req,res)=>{


    const orders = await order.create({
        productId:req.body.productId,
        userId: req.body.userId,
        //totals: Total_cost
 })

    const savedData = orders.save();
      if(!savedData){
          res.status(404).send("no data found ")
      }
      return res.status(200).send(orders)
    })

//get by orderId
router.get("/order", verify,
async(req,res)=>{
    const TOTAL_PRICE = await order.findAll({
                attributes: [
          'id',
          [Sequelize.fn('sum', Sequelize.col('total')), 'totals'],
        ],
        include: [
            {
                model: orderDetails,
                attributes: [],
            }
            
        ],
        where:{id:req.body.id},
        group: ['orderId'],
        On: orderDetails.orderId = order.id
      },
      
    )
      const Total_cost = parseInt(TOTAL_PRICE[0].dataValues.totals)
      res.send({
          totals:Total_cost
      })
    
})


router.get("/orders", verify,
    async (req, res)=>{
        const orders = await order.findAll();
        if (!orders){
            res.status(400).send("No data found")
        }
        else{
            res.status(200).send(orders)
        }
})

router.put("/order", verify, async(req,res)=>{
    const orders = await order.update({
        totals:req.body.totals
    },
    {
        where:{id:req.body.id}
    }
    )
    res.status(200).send("order updated ");
    if(!orders){
        res.status(404)
    }
})

router.delete("/order", verify,
    async (req, res)=>{

        const orders = await order.destroy({
          where:{id:req.body.id }
        });
        if(!orders){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("order deleted")
    })