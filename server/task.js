const Agenda = require('agenda')
const agenda= new Agenda({db: {address:process.env.CONNSTRING, collection: 'tasks'}})
const { getServiceForAccount } = require('./explorers');
const { getServer } = require('./socket');



agenda.define("upload",async (job,done)=>{
   
    let{
        accountId,
        folderId,
        file,
        jobId
    }=job.attrs.data
    let io= getServer().of(`/${jobId}`)
    let service= await getServiceForAccount(accountId)
    service.uploadFile(file,folderId,(percent)=>{
        console.log(percent+'%')
        io.emit("progress",percent)
    },done)

})
agenda.on('ready', function() {   
    agenda.start();
})

//agenda.start()


module.exports=agenda

