const express = require('express');
const { getAllBblogs, addBlog, updateBlog, deleteBlog ,getUserBlogs,getDetails } = require('../controllers/blogControllers');
const checkLogin = require('../middlewares/checkLogin');

const router = express.Router();


router.get('/',getAllBblogs)

router.get('/details/:id',getDetails);

router.get('/dashboard',getUserBlogs)

router.post("/add",addBlog)

router.put("/update/:id",updateBlog)

router.delete("/delete/:id",deleteBlog)


module.exports = router;