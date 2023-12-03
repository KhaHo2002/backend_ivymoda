const { cloudinary } = require('../utils/cloudinary');

let postImageProduct = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let flieImage = data;
            const resUploadCloud = await cloudinary.uploader.upload(flieImage, {

                // use localhost
                upload_preset: 'image_bookingCare'
                //deploy production
                // folder: 'image_doctor_admin'
            })
            if (resUploadCloud) {
                resolve({
                    errCode: 0,
                    mesage: "ok",
                    data: resUploadCloud
                })
            }
            else {
                resolve({
                    errCode: 1,
                    mesage: "not found"
                })
            }
        } catch (error) {
            reject({
                error: error,
                errCode: 1,
                mesage: "not found"
            })
        }
    })
}

module.exports = {
    postImageProduct
}