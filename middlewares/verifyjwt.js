const jwt  = require('jsonwebtoken')
const config = require('../config/auth.config')

const requireAuth = (req,res,next)=>{
     const token = req.cookies.jwt
     if (token) {
          jwt.verify(token,config.JWT_SECRET_KEY,(err,decodedToken)=>{
               if(err){
                    console.log(err.message)
               }
               else{
                    console.log(decodedToken);
                    next();
               }
          })
     }
     else{
          res.redirect("/login")
     }

}
module.exports = {
     requireAuth
}