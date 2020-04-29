var HTTP=require('http')

function wakeUpDyno(dynoURL,intervalMinutes=25,callback){
    let date=new Date();
    const day=date.getDay()
    const hour=date.getHours();
      
    //get minutes for timer
    const minutes=intervalMinutes*60000;
    setTimeout(()=>{
        try{
            if(day==6||day==7) return console.log('wrong day to wake,skipping HTTP.get');
            if(hour<8&&hour>4) return console.log('wrong hour to try');
            
           HTTP.get(dynoURL,()=>{
                console.log('Making a HTTP request to ',dynoURL)
            })
        }
        catch(e){
            console.log('error fetching',dynoURL)
            console.log('error message=',e.message)
        }
        finally{
            try{
                callback();
            }
            catch(e){
                callback?console.log('callback failed',e.message):null
            }
            finally{
               return wakeUpDyno(dynoURL,intervalMinutes,callback)
            }
        }
    },minutes)
}

module.exports=wakeUpDyno;

