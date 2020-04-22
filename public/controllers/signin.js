const handleSignIn=(req,res,db,bcrypt)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400).json('missing fields')
    }
    db.select('email','hash').from('login')
    .where('email',email)
    .then(data=>{
        const isValid=bcrypt.compareSync(password,data[0].hash);
        if(isValid){
            db.select('*').from('users')
            .where({email:email})
            .then(user=>{
                console.log('line 14',user)
                res.json(user[0])})
            .catch(res.status(400).json('user not found'))
        }
        else{
            console.log('line 19')
            res.status(400).json('Email or Password is incorrect')
         }
        
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json('Not Registered')
        })
    }

module.exports={
    handleSignIn:handleSignIn
}