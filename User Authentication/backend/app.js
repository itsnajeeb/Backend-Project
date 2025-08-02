const express = require('express');
const connectDB = require('./congif/database');
const cookieParser = require('cookie-parser');
const path = require('path')
const authRouther = require('./routher/authRouther');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express();
connectDB();

app.use(express.json())
app.use(cookieParser())
// app.use(express.static('client'))

app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true
}))

app.use(express.static(path.join(__dirname,'..','client')))
app.use('/pw-auth/', authRouther)
app.use('/', (req, res) => {
    res.status(200).json({
        data: "JWT AUTH SERVER is UP"
    })
})
module.exports = app