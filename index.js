const app = require('./server/app');
const express = require('express')
const port=process.env.PORT||3000
app.use(express.static('client'))
let server=app.listen(port,()=>{
    console.log("ready")
   require('./server/socket').init(server)
})
