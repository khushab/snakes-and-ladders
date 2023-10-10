const mongoose = require('mongoose');

const dbUsername = process.env.DB_USERNAME || 'snakesandladders';
const dbPassword = process.env.DB_PASSWORD || 'lmnopqrst';
const dbName = process.env.DB_PASSWORD || 'snakesandladders';


mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@cluster0.yukkibv.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
