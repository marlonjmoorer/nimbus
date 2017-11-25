const fs = require('fs');
let io;
module.exports = {
    init: (server) => {
        io = require('socket.io')(server)
    },
    getServer:()=>{
        if(!io){throw new Error("No Io Server setup")}
        return io
    }
}