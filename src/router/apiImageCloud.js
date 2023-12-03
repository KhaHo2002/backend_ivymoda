import express from "express";
import apiCloudImage from '../controllers/imageCloudController';
let router = express.Router();

const initApiImageCloud = (app) => {
    router.post('/upload-image-clound-product', apiCloudImage.handlePostImageProduct);


    return app.use('/api/v1/', router);
}

// module.exports = initRoute;

export default initApiImageCloud;