const express = require('express')
const PORT = process.env.PORT ||8081;

const app = require('./app')


app.listen(PORT, () => {
    console.log(`Surver is running up on PORT : ${PORT}`);

})