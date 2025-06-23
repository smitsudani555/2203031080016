const express = require("express");
const router = express.Router();
const shorturlController = require("../controllers/shorturlController");

router.post("/", shorturlController.createshorturl);
router.get("/:shortcode",shorturlController.getshorturl);
module.exports = router;
