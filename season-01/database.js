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
    const collection = db.collection("User");

    // Insert data
    // const data = {
    //     firstname: "Antara",
    //     lastname: "Mahanty",
    //     city: "Kolkata",
    //     phoneNumber: "456789"
    // }
    // const insertResult = await collection.insertMany([data]);
    // console.log('Inserted documents =>', insertResult);

    // Read 
    const findResult = await collection.find({}).toArray();
    console.log("Found documents =>", findResult);

    // Update
    // const updateResult = await collection.updateOne({ firstname: "Antara" }, { $set: { phoneNumber: "9800980098" } });
    // console.log('Updated documents =>', updateResult);

    // Delete
    // const deleteResult = await collection.deleteMany({ phoneNumber: "1023456789" });
    // console.log('Deleted documents =>', deleteResult);

    // Count
    const countResult = await collection.countDocuments({});
    console.log("Total documents in User collection =>", countResult);

    return "done.";
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());