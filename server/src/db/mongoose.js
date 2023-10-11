const mongoose = require("mongoose");

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const mongoDbUrl = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.yukkibv.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
