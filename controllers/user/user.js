'use strict';

var userModel = require("../../models/user/users.js");

exports.save = async function(req, res) {
   try {
    console.log("req.body");
       console.log(req.body);
       if(!req.body) return res.status(400).json({ message: "no data available" });
       let data = {
        email:req.body.email,
        password: req.body.password,
        fullname:req.body.fullname
       }
       let  userSaveResult = await userModel.save(data);

       if (userSaveResult) {
            return res.status(201).json({ createdUser: userSaveResult,message:"User Add Successful" });
       } else return res.status(400).json({ error:  JSON.stringify(userSaveResult), message: "Failed to save. Try again." });

   } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error })

   }

}

exports.login = async function (req,res) {
    try {
        if(!req.body) return res.status(400).json({ message: "no data available" });
        let data = req.body;
        let loginResult = await userModel.login(data);
        if (loginResult) {
            req.user = loginResult;
            req.session.Session = {user : loginResult};
            return res.status(201).json({ data: loginResult, message: 'Authentication successful.' });
       } else return res.status(404).json({ message: 'User not found.' });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error })
    
    }
}
exports.user = async function (req,res) {
    try {
        let user = req.session.Session.user;
        if(user) {
            return res.status(201).json({ data: user, message: 'Authentication successful.'  });
        } else return  res.send(401, {status: 0, message: "Not authorized"});

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error })
    
    }
}
exports.logout = async function (req,res) {
    try {
        req.session.destroy();
        return res.status(201).json({ data: [], message: 'Sign out.'  });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error })
    
    }
}