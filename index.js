const app = require('./server/app');
const express = require('express')
app.use(express.static('client'))

app.listen(3000,()=>{
    console.log("ready")
})
