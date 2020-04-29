function logSeconds(){
    const date=new Date();
    const seconds=date.getSeconds();
    setTimeout(()=>{
        try{
            console.log(seconds)
        }
        catch(e){
            console.log('error',e.message)
        }
        finally{
            return logSeconds();
        }
    },1000)
}

module.exports=logSeconds;