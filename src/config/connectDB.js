import mysql from 'mysql2/promise';

// create the connection to the database

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ivy_moda',
    port:3306,
    password: 'khaho', // Replace with the password you set for the 'root' user
    
})

export default connection;