const app = require('./server/app');
const express = require('express')
app.use(express.static('client'))

app.listen(3000,()=>{
    console.log(process.env.CONNSTRING)
    console.log("ready")
})
