const jwt = require("jsonwebtoken")

const authVerify = (req,res,next)=>{
try{
    let token = req.headers.authorization;
    if(token)
    {
    token = token.split(" ")[1];
    let user = jwt.verify(token,SECRET_KEY);
    req.userID = user.id;
    }
    else{
        res.status(401).json({message : "Unauth"})
    }
    next();
}catch(error){
    console.log(error);
    res.status(401).json({message : "Unauth"});

}
};

module.exports = authVerify;