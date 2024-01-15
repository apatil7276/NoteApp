require('dotenv').config({ path: './env' }) 
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY =process.env.SECRET_KEY;

const auth = (req, res, next)=>{

    try {

        let token = req.headers.authorization;
        console.log(token)
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY );
            req.userId = user.id;
        }
        else{
            return res.status(401).json({message: "Unauthorized User"});
        }

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized User"});
    }

}

module.exports = auth;