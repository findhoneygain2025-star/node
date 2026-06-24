const Blogs = require("../model/blogModel")
const jwt = require("jsonwebtoken")


const getAllBblogs = async(req,res)=>{
  try{
    let header = req.headers.authorization;
    let token = header.split("")[1];
    let decoded = jwt.verify(token,"thisisyourprivatekey");
    let userBlogs= await Blogs.find({createdBy:decoded.id});
    console.log(userBlogs)
    res.send(userBlogs)
  }
  catch (error) {
    res.status(401).send("Unauthorized access");
  }

}


const addBlog = async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Access Denied: No token provided" });
    }
    
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access Denied: Token formatting invalid" });
    }

  
    const decoded = jwt.verify(token, "thisisyourprivatekey");
    

    const data = req.body;
    data.createdBy=decoded.id;
    const newblog = await Blogs.create(data);
    
    return res.status(201).send(newblog);
    
  } catch (error) {
    return res.status(401).json({ 
      message: "Invalid or expired token", 
      error: error.message 
    });
  }
};

const updateBlog = async(req,res)=>{

   
    let header = req.headers.authorization;

    if(!header){
        return res.status(400).send("no header provided")
    }
    
    let token = header.split(" ")[1]

      if(!token){
        return res.status(400).send("no token provided")
    }

    jwt.verify(token,"thisisyourprivatekey")

    let id = req.query.id;
    let data = req.body;

    let updatedblog  = await Blogs.findByIdAndUpdate(id,data,{new:true});
    res.send(updatedblog)
}

const deleteBlog = async(req,res)=>{
    let id = req.query.id;

    let deletedblog  = await Blogs.findByIdAndDelete(id);

    if(!deletedblog){
        res.status(400).send("no blog found to delete")
    }

    res.send("blog deleted")

}


module.exports = {getAllBblogs,addBlog,updateBlog,deleteBlog};