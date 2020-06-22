var express = require('express');
var router = express.Router();
const data = require("./../utils/data");
const saveOriginaWithMemeData = data.saveOriginaWithMemeData;
const loadMemes = data.loadMemes;
const loadOriginals = data.loadOriginals;
const imagePath = "/images/originals/"
/* GET home page. */
router.get('/', function (req, res, next) {
    try {
        let memes = loadMemes();
        res.render("memes", { memes: memes, imagePath: imagePath })
    } catch (err) {
        console.log("request file err " + err)
        res.render("index", { error: err.message })
    }
});

router.post("/", (req, res) => {
    try {
        console.log("request " + req.body.id)
        console.log("request " + req.body.top)
        console.log("request " + req.body.bottom)

        let originals = loadOriginals();
        let original = originals.find(x => {
            return x.id == req.body.id
        })
        
        let memes = loadMemes()
        
        const meme = {
            originalname: original.filename,
            size: original.size,
            filename: (Date.now() + "-" + original.originalname),
            top: req.body.top, 
            bottom: req.body.bottom,
            originalId: req.body.id, 
            id: (memes.length == 0 ? 1 : memes[memes.length -1].id + 1)
          }
          memes.push(meme);

          saveOriginaWithMemeData(memes)
          res.json({ success: true })

    } catch (err) {
        console.log("request file err " + err)
        res.json({ success: false })
    }
});

module.exports = router;
