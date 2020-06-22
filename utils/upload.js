const path = require("path");
const uploadPath = path.join(__dirname, "./../public/images/originals");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("destination " + uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const allows = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
        console.log("file allows " + file.originalname);
        if (!allows.includes(file.mimetype)) {
            return cb(new Error("File is not allowed"), undefined)
        }

        cb(null, file.originalname);
    }
});


var upload = multer({ storage: storage })

module.exports = upload.single("fileupload")