import express from "express";
import ApiControllerSizeColor from '../controllers/apiControllerSizeColor';
let router = express.Router();

const initApiSizeColor = (app) =>{
    router.get('/get-all-color',ApiControllerSizeColor.handleGetAllColor);
    router.get('/get-all-size',ApiControllerSizeColor.handleGetAllSize);
    
    return app.use('/api/v1/',router);
}

// module.exports = initRoute;

export default initApiSizeColor;