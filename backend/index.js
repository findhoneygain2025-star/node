const express = require("express");
const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");
const mongoose = require('mongoose');
const cors = require("cors")
const app = express();
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
app.use(cors())
// http://localhost:3000

app.use(express.json());

app.use("/user", userRouter);

app.use("/blog", blogRouter);

app.get("/", (req, res) => {
  res.send("server is running");
});




mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'));

app.listen(PORT, () => console.log("server is listening on port 3000"));

//12345 => sdf;ljkas;dlkjf;dasljk;lsgd;alkj

//12345 => sdf;ljkas;dlkjf;dasljk;lsgd;alkj


// GET , POST , PUT , PATCH , DELETE


// 1. show dbs => show databases
// 2. use <db_name> => use  an existing database or create a new database
// 3. db.dropDatabase() => delete the database
// 4. show collections => show all the collections in the current database
// 5. db.createCollection("collection_name") => create a new collection
// 6. db.collection_name.drop() => delete the collection
// 7. db.collection_name.insertOne({key:value}) => insert a single document in the collection
// 8. db.collection_name.insertMany([{key:value},{key:value}]) => insert multiple documents in the collection
// 9. db.collection_name.find() => find all the documents in the collection
// 10. db.collection_name.find({key:value}) => find the documents in the collection that match the query
// 11. db.collection_name.findOne({key:value}) => find a single document in the collection that matches the query
// 12. db.collection_name.updateOne({key:value},{$set:{key:value}}) => update a single document in the collection that matches the query
// 13. db.collection_name.updateMany({key:value},{$set:{key:value}}) => update multiple documents in the collection that match the query
// 14. db.collection_name.deleteOne({key:value}) => delete a single document in the collection that matches the query
// 15. db.collection_name.deleteMany({key:value}) => delete multiple documents in the collection that match the query