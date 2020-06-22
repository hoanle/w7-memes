var express = require('express');
var router = express.Router();
const upload = require("./../utils/upload");
const data = require("./../utils/data");
const saveOriginal = data.saveOriginal;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/upload", (req, res) => {
  try {
    upload(req, res, function (err) {
      if (err)
        return res.render("index", { error: err.message })

      if (!req.file)
        return res.render("index", { error: "you need to upload a file" })

      console.log("request file " + req.file)

      const original = {
        originalname: req.file.originalname,
        size: req.file.size,
        filename: req.file.filename
      }

      console.log("original" + original)

      saveOriginal(original)

      res.redirect("originals")
    })
  } catch (err) {
    console.log("request file err " + err)
    res.render("index", { error: err.message })
  }
});

module.exports = router;
