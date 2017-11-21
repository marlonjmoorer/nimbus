module.exports= class Explorer{
        constructor(){

        }
        getAccount(){
            throw new TypeError("abstact")
        }
        listFiles(folderId={}){
            throw new TypeError("abstact")
        }
        uploadFile(file){
            throw new TypeError("abstact")
        }
        getFileById(id){
            throw new TypeError("abstact")
        }
        createFolder(loaction){
            throw new TypeError("abstact")
        }
        delete(id){
            throw new TypeError("abstact")
        }
        getFolderById(id){
            throw new TypeError("abstact")
        }
}