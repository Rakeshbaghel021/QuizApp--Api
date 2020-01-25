
var express = require("express");
var Admin = require("../models/admin");
var Question = require("../models/question");
var AdminAuth = require("../middleware/AdminAuth");
var router = express.Router();

// get all the questions
router.get("/", (req, res) => {
  Question.find({}, (err, questions) => {
    if (err) return res.json({ err });
    res.json({ questions, success: true });
  });
});

// protected routes
router.use(AdminAuth.validToken);

// create question
router.post("/", (req, res) => {
  let { adminId } = req.admin;
  req.body.adminId = adminId;
  Question.create(req.body, (err, createdQuestion) => {
    if (err) return res.json({ err });
    Admin.findOneAndUpdate(
      { _id: createdQuestion.adminId },
      { $push: { questionsId: createdQuestion.id } },
      { new: true },
      (err, updatedAdmin) => {
        if (err) return res.json({ err });
        return res.json(createdQuestion);
      }
    );
  });
});

// delete question
router.delete("/:id", (req, res) => {
  Question.findByIdAndDelete({ _id: req.params.id }, (err, deletedQuestion) => {
    if (err) return res.json({ err });
    res.json({
      success: true,
      message: "deleted successfully",
      deletedQuestion
    });
  });
});

// edit question
router.put("/:id", (req, res) => {
  Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedQuestion) => {
      if (err) return res.json({ err });
      res.json({
        updatedQuestion,
        success: true,
        message: "updated successfully"
      });
    }
  );
});

module.exports = router;