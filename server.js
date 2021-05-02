const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const user = require("./routers/User");
const address = require("./routers/address");
const userPayment = require("./routers/userPayment");
const category = require("./routers/category")
const product = require("./routers/product");
const inventory = require("./routers/inventory");
const orders = require("./routers/orders");
const orderDetails = require("./routers/orderDetails")
const discount = require("./routers/discount");
const Cart = require("./routers/shoppingCart");
//const Payment_Type= require("./routers/userPayment");
const Payment_Details = require("./routers/payment_Details");

app.use(bodyParser.json())
app.use("/", product);
app.use("/", category)
app.use("/",user);
app.use("/", address);
app.use("/", userPayment);
app.use("/", inventory);
app.use("/", orders);
app.use("/", orderDetails);
app.use("/", discount);
app.use("/", Cart);
app.use("/", Payment_Details)
//app.ude("/",Payment_Type)
//app.use("/orderDetails", orderDetails);


app.listen(9000, ()=>{
    console.log("Server is running on port 9000");
})