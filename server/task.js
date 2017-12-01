const Agenda = require('agenda')
const agenda= new Agenda({db: {address:process.env.CONNSTRING, collection: 'tasks'}})
const { getServiceForAccount } = require('./explorers');
const { getServer } = require('./socket');

agenda.define("upload",async (job,done)=>{
   
    let{ accountId,folderId, file,jobId}=job.attrs.data
    let io= getServer().of(`/${jobId}`)
    let service= await getServiceForAccount(accountId)
    let onProgress=(percent)=>{
        console.log(percent+'%')
        io.emit("progress",percent)
    }
    service.uploadFile(file,folderId,onProgress,done)

})
agenda.on('ready', function() {  
    agenda.cancel({name: 'upload'}, function(err, numRemoved) {
        console.log(numRemoved)
    });
    agenda.start();
})


function graceful() {
    agenda.stop(function() {
      process.exit(0);
    });
}
   
process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

module.exports=agenda

