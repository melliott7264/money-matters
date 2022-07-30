const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

router.route("/")
  .get(articlesController.getAll)

module.exports = router;