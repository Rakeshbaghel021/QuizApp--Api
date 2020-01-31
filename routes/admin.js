var express = require("express");

var AdminAuth = require("../middleware/AdminAuth");
var router = express.Router();


router.use(AdminAuth.validToken);



// get a single admin

router.get("/", (req, res) => {
  User.findById(req.admin.adminId, "-password", (err, user) => {
    if (err) return res.json({ err });
    res.json({ user, success: true });
  });
});

module.exports = router;