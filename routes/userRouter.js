const express = require("express");

const Users = require("../model/userModel");
const {
  getAllUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  verifyToken,
} = require("../controllers/userControllers");

const validator = require("../middlewares/validator")



const router = express.Router();

// http://localhost:3000/user

router.get("/", getAllUsers);

router.get("/verify",verifyToken)

router.post("/register", validator,registerUser,);

router.post("/login", loginUser);

router.put("/update", updateUser);

router.delete("/delete", deleteUser);

module.exports = router;
