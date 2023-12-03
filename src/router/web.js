import express from "express";
import homecontroller from "../controllers/homecontroller";
import multer from "multer";
import path from 'path';
var appRoot = require('app-root-path');
let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,appRoot+ '/src/public/image');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};


let upload = multer({ storage: storage, fileFilter: imageFilter });


const initRoute = (app) => {
    router.get('/', homecontroller.getHomePage);
    router.get('/detail/:id', homecontroller.getDetail);
    router.get('/create', homecontroller.linkCreateUser);
    router.post('/create', homecontroller.createUser);
    router.post('/delete', homecontroller.deleteUser);
    router.get('/edit/:id', homecontroller.getEditUser);
    router.post('/update', homecontroller.updateUser);
    
    router.get('/upload', homecontroller.uploadFile);
    router.post('/uploadfile',upload.single('image'), homecontroller.handleUpload);
    return app.use('/', router)
}

// module.exports = initRoute;

export default initRoute;