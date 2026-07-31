const express = require('express');
const { getAllBblogs, addBlog, updateBlog, deleteBlog ,getUserBlogs,getDetails,addComment,addLikes,getLikes,deleteComment,updateComment } = require('../controllers/blogControllers');
const checkLogin = require('../middlewares/checkLogin');
const {upload} = require('../config/cloudinaryConfig');

const router = express.Router();


router.get('/',getAllBblogs)

router.post('/:id/comment', addComment);

router.post('/:id/likes',addLikes);

router.put('/:id/comment/:commentId', updateComment);

router.delete('/:id/comment/:commentId', deleteComment);

router.get('/:id/likes',getLikes);

router.get('/details/:id',getDetails);

router.get('/dashboard',getUserBlogs)

router.post("/add",upload.single('image'),addBlog)

router.put("/update/:id",upload.single('image'),updateBlog)

router.delete("/delete/:id",deleteBlog)


module.exports = router;