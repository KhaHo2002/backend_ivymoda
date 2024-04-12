import { resolve } from "app-root-path";
import connection from "../config/connectDB";

let getAllCustomer = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await connection.query('SELECT * FROM customer');
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

let countCustomer = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await connection.query('SELECT COUNT(*) FROM customer');
            if (!rows) {
                resolve({
                    errCode: 1,
                    message: "Not found",
                });
            } else {
                resolve({
                    errCode: 0,
                    message: "ok",
                    data: rows[0]['COUNT(*)']
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let createCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { first_name, last_name, email, numberphone, date_of_day, set, address, name_login, password } = data;

            const [checkCustomer, fieldsCheckCustomer] = await connection.query(
                `select count(*) from customer where  email = ? or name_account=?`, [email, name_login]
            );
            let resultCheckCustomer = (checkCustomer[0]['count(*)']);
            if (resultCheckCustomer == 0) {
                const [insertCustomer, fields2] = await connection.query(
                    `INSERT INTO customer (first_name, address_c, set_c,email,number_phone,password_c,date_of_day,last_name,name_account)
                VALUES (?,?,?,?,?,?,?,?,?)`, [first_name, address, set, email, numberphone, password, date_of_day, last_name, name_login]
                );
                if (!insertCustomer) {
                    resolve({
                        errCode: 1,
                        message: "Can't create account",
                    });
                } else {
                    resolve({
                        errCode: 0,
                        message: "ok"
                    });
                }
            }
            else {
                resolve({
                    errCode: 2,
                    message: "Duplicated account Customer"
                });
            }

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAllCustomer, createCustomer, countCustomer
}