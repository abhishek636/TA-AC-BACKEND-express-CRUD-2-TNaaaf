var express = require("express");
var router = express.Router();
var Article = require("../models/article");
var Comment = require("../models/comment");

//article Routes
//Creating new article
router.get("/new", (req, res) => {
  res.render("addArticles.ejs");
});

//Saving data
router.post("/", (req, res, next) => {
  Article.create(req.body, (err, createdarticle) => {
    if (err) return next(err);
    res.redirect("/articles");
  });
});

//fetch the article
router.get("/", (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render("article.ejs", { articles: articles });
  });
});

//fetch only one article
router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id)
    .populate("comments")
    .exec((err, article) => {
      if (err) return next(err);
      res.render("articleDetails", { article });
    });
});

//updating article form
router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render("editArticle", { article: article });
  });
});

//update article
router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (err, updatedarticle) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});

//delete article
router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if (err) return next(err);
    Comment.deleteMany({ articleId: article.id }, (err, info) => {
      if (err) return next(err);
      Comment.remove({ articleId: article.id }, (err) => {
        if (err) return next(err);
        res.redirect("/articles");
      });
    });
  });
});

//increment likes
router.get("/:id/inc", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});

//adding comments
router.post("/:id/comments", (req, res, next) => {
  var id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      (err, updatedarticle) => {
        if (err) return next(err);
        res.redirect("/articles/" + id);
      }
    );
  });
});

module.exports = router;