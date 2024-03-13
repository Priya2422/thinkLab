const upload=require("../utils/multer");
const express=require("express");
const { getData, postData, getDataById } = require("../controllers");
const router=express.Router();

router.get("/get",getData);
router.get("/:id",getDataById);
router.post("/post",upload.array("files"),postData);
module.exports=router;