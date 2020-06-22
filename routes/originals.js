var express = require('express');
var router = express.Router();
const data = require("./../utils/data");
const loadOriginals = data.loadOriginals;
const imagePath = "/images/originals/"

router.get('/', function (req, res, next) {
    try {
        console.log(data);
        console.log(loadOriginals);
        let images = loadOriginals();
        console.log("images " + images.length);
        res.render("originals", { images: images, imagePath: imagePath })
    } catch (err) {
        console.log("request file err " + err)
        res.render("originals", { error: err.message })
    }
});

router.get('/:originalId', function (req, res) {
    console.log("params " + req.params)
    let id = req.params.originalId
    let images = loadOriginals();
    let image = images.find(x => {
        return x.id == id
    })
    console.log("find image " + image)
    if (image === undefined) {
        res.render('error', { message: "Can not find resource" })
    } else {
        res.render('detail', { image: image, imagePath: imagePath })
    }

})

router.post('/', function(req, res) {
    
})

module.exports = router;
