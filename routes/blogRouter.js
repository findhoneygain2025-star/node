const express = require('express');
const { getAllBblogs, addBlog, updateBlog, deleteBlog } = require('../controllers/blogControllers');
const checkLogin = require('../middlewares/checkLogin');

const router = express.Router();


router.get('/',getAllBblogs)

router.post("/add",addBlog)

router.put("/update",checkLogin,updateBlog)

router.delete("/delete",checkLogin,deleteBlog)


module.exports = router;