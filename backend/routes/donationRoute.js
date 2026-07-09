const express = require('express');
const { createDonationOrder} = require("../controllers/donationController.js");

const router = express.Router();

router.post("/order", createDonationOrder);

module.exports= router;