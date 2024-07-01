const dotenv = require('dotenv');

dotenv.config();

// console.log(process.env.PORT)
module.exports = {
    PORT: process.env.PORT,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_EMAIL: process.env.GMAIL_EMAIL
}