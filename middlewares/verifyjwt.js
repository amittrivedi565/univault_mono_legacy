const jwt = require("jsonwebtoken")
const authConfig = require("../config/auth.config")

const authVerify = (req,res,next)=>{
try{
    let token = req.cookies['api-auth'];
    if(token)
    {
        req.user = jwt.verify(token,authConfig.JWT_SECRET_KEY,(err,result)=>{
            req.adminId = result.id
            req.adminName = result.name
        });

    }
    else{
        res.clearCookie('api-auth');
        res.redirect('/close/login');
    }
    next();
}
catch(error){
    console.log(error);
    res.clearCookie('api-auth');
    res.redirect("/close/login")
    }
};

module.exports = authVerify;