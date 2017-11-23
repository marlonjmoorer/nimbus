const app = require('./server/app');
const express = require('express')
app.use(express.static('client'))
let server=app.listen(3000,()=>{
    console.log("ready")
   require('./server/socket')(server)
})
