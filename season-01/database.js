const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URI;

const client = new MongoClient(url);
const dbName = "HelloWorld";

async function main() {
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("user");

    return "done.";
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());