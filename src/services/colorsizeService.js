import connection from "../config/connectDB";

let getAllColor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await connection.query('SELECT * FROM color');
            if (!rows) {
                resolve({
                    errCode: 1,
                    message: "Not found",
                });
            } else {
                resolve({
                    errCode: 0,
                    message: "ok",
                    data: rows
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllSize = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await connection.query('SELECT * FROM size');
            if (!rows) {
                resolve({
                    errCode: 1,
                    message: "Not found",
                });
            } else {
                resolve({
                    errCode: 0,
                    message: "ok",
                    data: rows
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAllColor, getAllSize
}