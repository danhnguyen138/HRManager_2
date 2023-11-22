const jwt= require("jsonwebtoken");

const verifyToken= async(req,res,next)=>{
    try{
        let token=req.header("Authorization");
        if (!token){
            return res.status(403).json({error:"Access Deny"});
        }

        if (token.startsWith("Bearer")){
            token= token.slice(7, token.length).trimLeft();
        }

        const verified= jwt.verify(token, process.env.JWT_SECRET);
        req.user= verified;
        next();
    } catch (err){
        res.status(500).json({
            error: err.message
        })
    }
}
const verifyTokenIsAdmin= async(req,res,next)=>{
    verifyToken(req,res,()=>{
        if (req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({
                error: "You are not Admin"
            })
        }
    })
}
module.exports={verifyToken, verifyTokenIsAdmin}