const { Client } = require('pg');

const connection = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'TaskApp',
    password: 'root',
    port: 5432,
})

connection.connect().then(() => {
    console.log('Database Connected');
})

module.exports = connection