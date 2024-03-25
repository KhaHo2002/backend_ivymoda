const jwt = require('jsonwebtoken');
const crypto = require('crypto');
import connection from "../config/connectDB";

let createJWTCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { name_account, password } = data;
            const [rows, fields] = await connection.query(
                `SELECT * FROM customer where name_account = ? and password_c=?`, [name_account, password]
            );
            if (rows.length <= 0) {
                resolve({
                    errCode: 1,
                    message: "Not found",
                });
            }
            else {
                const payload = {
                    name_account: name_account,
                    password: password,
                };
                let secretKey = crypto.randomUUID();
                const token = jwt.sign(payload, secretKey, { expiresIn: '10m' });

                resolve({
                    errCode: 0,
                    message: "Token customer created",
                    data: token
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let createJWTManager = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { adminName, passwordAdmin } = data;
            const [rows, fields] = await connection.query(
                `SELECT * FROM manager where name_m = ? and password_m=?`, [adminName, passwordAdmin]
            );
            if (rows.length <= 0) {
                resolve({
                    errCode: 1,
                    message: "Not found",
                });
            }
            else {
                const payload = {
                    name_m: adminName,
                    password_m: passwordAdmin,
                };
                let secretKey = crypto.randomUUID();
                const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

                resolve({
                    errCode: 0,
                    message: "Token created",
                    data: token
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}



module.exports = { createJWTCustomer, createJWTManager }