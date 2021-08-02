// 20210727: JWT
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req,res,next){
    // Get token from header
    const token = req.header('x-auth-token')
    console.log('Hit')
    if(!token){
        return res.status(401).json({
            msg:'Authorisation denied'
        })
    }

    try{
        const decoded = jwt.verify(token, config.get('jwt'));
        req.user = decoded.user;
        next();
    }catch(err){
        console.log(err)
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
}