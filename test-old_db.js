// // db.js
// require('dotenv').config();
// const { Client } = require('pg');

// const connectionString = process.env.DATABASE_URL;

// const client = new Client({
//     connectionString: connectionString,
//     ssl: {
//         rejectUnauthorized: false, // Use this only for development
//     },
// });

// async function connect() {
//     try {
//         await client.connect();
//         console.log('Connected to Supabase database successfully!');
//     } catch (err) {
//         console.error('Connection error', err.stack);
//     }
// }

// async function disconnect() {
//     try {
//         await client.end();
//         console.log('Disconnected from database.');
//     } catch (err) {
//         console.error('Disconnection error', err.stack);
//     }
// }

// module.exports = {
//     client,
//     connect,
//     disconnect,
// };
