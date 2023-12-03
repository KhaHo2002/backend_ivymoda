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
                console.log(rows);
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

let createCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { first_name, last_name, email, numberphone, date_of_day, set, address, name_login, password } = data
            const [rows, fields] = await connection.query(
                `INSERT INTO customer (first_name, address_c, set_c,email,number_phone,password_c,date_of_day,last_name,name_account)
                VALUES (?,?,?,?,?,?,?,?,?)`, [first_name, address, set, email, numberphone, password, date_of_day, last_name, name_login]
            );
            if (!rows) {
                resolve({
                    errCode: 1,
                    message: "Not found",
                });
            } else {
                resolve({
                    errCode: 0,
                    message: "ok"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAllCustomer, createCustomer
}