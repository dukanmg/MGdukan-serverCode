// index.js
const { connect, disconnect, client } = require('./db');

async function getbranchdata() {

    const query = `Select * from public.branch`;
    try {
        const res = await client.query(query);

        console.log('Branch table data successfully!');
        return res
    } catch (err) {
        console.error('Error reading branch', err.stack);
    }
}

async function main() {
    await connect(); // Connect to the database

    // Example usage
    const res = await getbranchdata();

    await disconnect(); // Disconnect from the database
    console.log(res.rows)
}

main();
