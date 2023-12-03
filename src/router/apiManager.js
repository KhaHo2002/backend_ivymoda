import express from "express";
import ApiControllerManage from '../controllers/apiControllerManager';
let router = express.Router();

const initApi = (app) => {
    router.get('/get-all-admin', ApiControllerManage.getAllManager);
    // router.post('/create-admin',ApiController.createUser);
    // router.put('/update-admin',ApiController.updateUser);
    // router.delete('/delete-adin-byid/:id',ApiController.deleteUser);
    // router.post('api/upload',ApiController.upload);


    return app.use('/api/v1/', router);
}

// module.exports = initRoute;

export default initApi;