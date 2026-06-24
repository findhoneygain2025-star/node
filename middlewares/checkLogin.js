

function checkLogin(req,res,next){
    try {

         
            let header = req.headers.authorization;
        
            if(!header){
                return res.status(400).send("no header provided")
            }
            
            let token = header.split(" ")[1]
        
              if(!token){
                return res.status(400).send("no token provided")
            }
        
            jwt.verify(token,"thisisyourprivatekey")

            next();
        
    } catch (error) {
        res.status(401).send(error)
    }
}


module.exports = checkLogin;