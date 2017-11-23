
module.exports=(server)=>{
    const io = require('socket.io')(server)
    const ss = require('socket.io-stream')
    const { getServiceForAccount } = require('./explorers');

    io.on("connection",(client)=>{
        console.log(client.id)
        ss(client).on("begin",async(stream,meta)=>{
            let{accountId,fileMeta}= meta
            let service= await getServiceForAccount(accountId)
            await service.uploadFile(fileMeta,stream)
            stream.on("data",(data)=>{
               // console.log("")
            })
            stream.on("end",()=>{
                console.log("done")
            })
        })
    })

}