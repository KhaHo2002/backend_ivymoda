const jwt = require('jsonwebtoken');
const crypto = require('crypto');
import connection from "../config/connectDB";

let createJWTCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { name_c, password_c } = data;
            const [rows, fields] = await connection.query(
                `SELECT * FROM customer where name_c = ? and password_c=?`, [name_c, password_c]
            );
            if (rows.length <= 0) {
                resolve({
                    errCode: 1,
                    message: "Not found",
                });
            }
            else {
                const payload = {
                    name_c: name_c,
                    password_c: password_c,
                };
                let secretKey = crypto.randomUUID();
                const token = jwt.sign(payload, secretKey, { expiresIn: '1m' });

                resolve({
                    errCode: 0,
                    message: "ok",
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
                    message: "ok",
                    data: token
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = { createJWTCustomer, createJWTManager }