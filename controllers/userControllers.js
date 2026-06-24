const Users = require("../model/userModel")
const{validationResult} = require("express-validator")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcryptjs")

let getAllUsers = async (req,res)=>{
  
    let data = await Users.find();
    res.send(data);
}


let verifyToken = async(req,res)=>{
       try {

         
            let header = req.headers.authorization;
        
            if(!header){
                return res.status(400).send("no header provided")
            }
            
            let token = header.split(" ")[1]
        
              if(!token){
                return res.status(400).send("no token provided")
            }
        
          let {id} =   jwt.verify(token,"thisisyourprivatekey");
          let user = await Users.findById(id);

          res.send(user);

           
        
    } catch (error) {
        res.status(401).send(error)
    }
}







let registerUser = async (req,res)=>{


let result = validationResult(req);

let errors = result.errors;

if(errors.length){
    let err = errors.map((ele)=>ele.msg)
    return res.send(err[0])
}


    let data = req.body;

    let existingUser = await Users.findOne({email:data.email})

    if(existingUser){
        return res.status(400).send("you are already registered")
    }

    let hashPassword = bcrypt.hashSync(data.password,10);
 
    let newUser = await Users.create({...data,password:hashPassword});

    res.send(newUser);
      
   
}

const loginUser = async(req,res)=>{

    let data = req.body;

    let existingUser = await Users.findOne({email:data.email});
  
    if(!existingUser){
        return res.status(400).send("no user found please register first")
    }

  let result = bcrypt.compareSync(data.password,existingUser.password)

  if(!result){
    return res.status(400).send("wrong password")
  }

  let token = jwt.sign({id:existingUser._id},"thisisyourprivatekey")

    res.send({existingUser,token})
  
}




let updateUser = async(req,res)=>{

    let id = req.query.id;
    let data = req.body;

    let updatedUser = await Users.findByIdAndUpdate(id,data,{new:true})

    res.send(updatedUser);
}


let deleteUser = async (req,res)=>{
    
    let id = req.query.id

    let deletedUser = await Users.findByIdAndDelete(id);

    if(!deletedUser){
        return res.send("no user found to delete")
    }

    res.send("user deleted successfully")

}

module.exports = {getAllUsers,registerUser,updateUser,deleteUser,loginUser,verifyToken}