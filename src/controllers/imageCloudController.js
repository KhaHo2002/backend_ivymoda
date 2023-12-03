import upload_image_cloundService from '../services/uploadImageCloudService';
// const { cloudinary } = require('../utils/cloudinary');

let handlePostImageProduct = async (req, res) => {
    try {
        let response = await upload_image_cloundService.postImageProduct(req.body.data);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

module.exports = {
    handlePostImageProduct
}