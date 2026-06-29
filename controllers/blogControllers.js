const Blogs = require("../model/blogModel")
const jwt = require("jsonwebtoken")


const getAllBblogs = async (req, res) => {
  try {
    let userBlogs = await Blogs.find({});
    console.log(userBlogs)
    res.send(userBlogs)
  }
  catch (error) {
    res.status(401).send("Unauthorized access");
  }
}

const getDetails = async (req, res) => {
  let { id } = req.params;
  let Details = await Blogs.findById(id);
  res.send(Details);
}

const getUserBlogs = async (req, res) => {
  try {
    let header = req.headers.authorization;
    let token = header.split(" ")[1];
    let decoded = jwt.verify(token, "thisisyourprivatekey");
    let userBlogs = await Blogs.find({ createdBy: decoded.id });
    console.log(userBlogs)
    res.send(userBlogs)
  }
  catch (error) {
    res.send('unauthorized access')
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

    console.log(token);
    const decoded = jwt.verify(token, "thisisyourprivatekey");
    console.log(decoded);

    const data = req.body;
    data.createdBy = decoded.id;
    const newblog = await Blogs.create(data);
    console.log(newblog)
    return res.status(201).send(newblog);

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error.message
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    let header = req.headers.authorization;

    if (!header) {
      return res.status(400).send("no header provided")
    }

    let token = header.split(" ")[1]

    if (!token) {
      return res.status(400).send("no token provided")
    }

    let decoded = jwt.verify(token, "thisisyourprivatekey")

    let { id } = req.params;
    let data = req.body;

    let updatedblog = await Blogs.findByIdAndUpdate(id, data, { new: true });
    res.send(updatedblog)
  }
  catch (err) {
    res.send(err);
  }
}

const deleteBlog = async (req, res) => {
  try {
    let header = req.headers.authorization;

    if (!header) {
      return res.status(400).send("no header provided")
    }

    let token = header.split(" ")[1]

    if (!token) {
      return res.status(400).send("no token provided")
    }

    let decoded = jwt.verify(token, "thisisyourprivatekey")
    let { id } = req.params;

    let deletedblog = await Blogs.findByIdAndDelete(id);

    if (!deletedblog) {
      res.status(400).send("no blog found to delete")
    }

    res.send("blog deleted")
  }
  catch (error) {
    res.send(error);
  }
}

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, username } = req.body;

    if (!text) {
      return res.status(400).send({ message: "Comment text cannot be empty" });
    }
    const updatedBlog = await Blogs.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            username: username,
            text: text
          }
        }
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).send({ message: "Blog post not found" });
    }

    res.status(201).send(updatedBlog.comments);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send({ message: "Failed to post comment", error: error.message });
  }
};

const addLikes = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, "thisisyourprivatekey");
    const { id } = req.params;
    const userId = decoded.id;
    const blog = await Blogs.findById(id);

    if (!blog) {
      return res.status(404).send({ message: "Blog post not found" });
    }

    const hasLiked = blog.likes.includes(userId);

    const updateOperator = hasLiked
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId } };

    const updatedBlog = await Blogs.findByIdAndUpdate(
      id,
      updateOperator,
      { new: true }
    );

    res.status(200).send({
      totalLikes: updatedBlog.likes.length,
      isLiked: !hasLiked
    });
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).send({ message: "Failed to add like", error: error.message });
  }
}

const getLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id);

    if (!blog) {
      return res.status(404).send({ message: "Blog post not found" });
    }

    res.status(200).send({
      totalLikes: blog.likes.length
    }); 
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).send({ message: "Failed to add like", error: error.message });
  }
}


module.exports = { getAllBblogs, getUserBlogs, addBlog, updateBlog, deleteBlog, getDetails, addComment, addLikes,getLikes };