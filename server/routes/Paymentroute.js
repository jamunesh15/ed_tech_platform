
const express = require("express");

const router = express.Router();

const { auth , isStudent , isAdmin } = require("../middlewares/auth");

const {  capturepayment  ,verifypayment , sendpaymentemail  }  = require("../controllers/Paymentcontroller")

router.post("/capturepayment" , auth , isStudent , capturepayment);
router.post("/verifypayment" , auth , isStudent ,verifypayment);
router.post("/sendpaymentemail" , auth , isStudent , sendpaymentemail);


module.exports = router;