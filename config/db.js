const mongoose = require("mongoose");
 
require("dotenv").config();

const connection = mongoose.connect(process.env.MONGO_URI);

// const connection = mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

module.exports = {
    connection
}