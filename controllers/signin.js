const handleSignIn=(req,res,db,bcrypt)=>{
    //extract user email and password properties
    const {email,password}=req.body;
    
    //Use Knex to make pg_db call
    db.select('email','hash').from('login')
    .where('email',email)
    .then(data=>{
        //if a blank record is return, return an error status
        if(data.length===0) return res.status(400).json('user not found')
        const isValid=bcrypt.compareSync(password,data[0].hash);
        if(isValid){
            return  db.select('*').from('users')
            .where({email:email})
            .then(user=>res.json(user[0]))
        }else{
            return res.status(400).json('incorrect password entered')
        }
        })
    .catch(err=>{
        res.status(400).json(err)
    })
    }

module.exports={
    handleSignIn:handleSignIn
}