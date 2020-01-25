var express = require("express");
var Admin = require("../models/admin");
var AdminAuth = require("../middleware/AdminAuth");
var router = express.Router();

// protected routes for Admin
router.use(AdminAuth.validToken);

// get a single Admin

router.get("/", (req, res) => {
  Admin.findById(req.admin.adminId, "-password")
    .populate("questionsId")
    .exec((err, admin) => {
      if (err) return res.json({ err });
      res.json({ admin, success: true });
    });
});

module.exports = router;