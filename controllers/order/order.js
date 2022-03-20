
var orderModel = require("../../models/order/order.js");
exports.orderSave = async function(req, res) {
    try {
     console.log("req.body");
        console.log(req.body);
        let user = req.session.Session.user;
        if(!req.body || !user) return res.status(400).json({ message: "no data available" });
        let data = {
         userId:user.id,
         title: req.body.title || "Boş",
         description:req.body.description || "Yok",
         crateDate:new Date()
        }
        let  orderSaveResult = await orderModel.save(data);
 
        if (orderSaveResult) {
             return res.status(201).json({ data: orderSaveResult,message:"Order Add Successful" });
        } else return res.status(400).json({ error:  JSON.stringify(orderSaveResult), message: "Failed to save. Try again." });
 
    } catch (error) {
     console.log(error);
     return res.status(400).json({ message: error })
 
    }
 
 }
 exports.orderList = async function(req,res) {
     try {
        console.log("result session::");
        console.log(req.session);
        let user = req.session.Session.user;
        if(!req.body || !user) return res.status(400).json({ message: "no data available" });
        let data = {  userId: user.id };

        let  orderListResult = await orderModel.list(data);  
        if (orderListResult) {
            return res.status(201).json({ data: orderListResult,message:"Order Add Successful" });
        } else return res.status(400).json({ error:  JSON.stringify(orderListResult), message: "Failed to save. Try again." });

     } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error })
            
     }
 }
 exports.getOrder = async function(req,res) {
    try {
        let user = req.session.Session.user;
        const { id } = req.params;
        if(!req.body || !user) return res.status(400).json({ message: "no data available" });
        let data = {  id: id };
        let  getOrderResult = await orderModel.getOrder(data);  
        if (getOrderResult) {
            return res.status(201).json({ data: getOrderResult,message:"Get Order Successful" });
        } else return res.status(400).json({ error:  JSON.stringify(getOrderResult), message: "Failed to save. Try again." });

    } catch (error) {
       console.log(error);
       return res.status(400).json({ message: error })
           
    }
}