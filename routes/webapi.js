'use strict';
const order = require("../controllers/order/order.js");
 var user = require("../controllers/user/user.js") ;
 module.exports  = function(app){
    function webApiMiddleware(req, res, next) {
        if (!req.sessionID ) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.statusCode = 401;
            return res.end('{"succeed":false}');
        } else {
            next();
        }
    } 
    /**
     *  @swagger
     *  /user:
     *   post:
     *     tags:
     *     - "user"
     *     summary: "Create user"
     *     description: "This can only be done by the logged in user."
     *     operationId: "createUser"
     *     produces:
     *     - "application/xml"
     *     - "application/json"
     *     parameters:
     *     - in: "body"
     *       name: "body"
     *       description: "Created user object"
     *       required: true
     *       schema:
     *         $ref: "#/definitions/User"
     *     responses:
     *       default:
     *         description: "successful operation"
     */
    app.post('/user/save', webApiMiddleware,user.save);
    app.post('/user/login', user.login);
    app.get('/user', webApiMiddleware,user.user);
    app.get('/user/logout', user.logout);

    app.post('/order/save',webApiMiddleware,order.orderSave);
    app.get('/order/list',webApiMiddleware,order.orderList);
    app.get('/order/getorder/:id',webApiMiddleware,order.getOrder);
    app.post('/algorithm',function (req,res) {
        try {
            var text = req.body.text
            var temp = text.replaceAll(" ", "");
            let textArray = temp.split('')
            var temp= 0;
            var harf='';
            var i = 0;
            textArray.find( element=>{
                        i=0;
                        textArray.find( element2=>{
                            if (element === element2) i++;
    
                            if (i>temp) {
                                temp = i;
                                harf=element2;
                            }
                        }); 
            });
            let result = "En çok kulanılan karakter: "+ harf;
            return res.status(201).json({ data: result, message: 'Algorithm successful.'  });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error })
        }
    })
 }