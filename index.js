const express=require('express')
const bodyparser=require('body-parser')
app=express()
app.use(bodyparser.urlencoded({ extended: false }))
app.listen(8000)

app.use('', express.static('public'))

app.get('/hello',function (req,res)
{
    res.send("Hello World !!")
})

//landing page 
app.get('',function(req,res){
    // res.send("index page")
    res.sendFile(__dirname+'/src/index.html')
})

//Login For change state
app.get('/login',function(req,res){
    // res.send("Login PAge")
    res.sendFile(__dirname+'/src/login.html')
})
app.post('/login',function(req,res){
    let name = req.body.name
    let passw = req.body.passw
    if(name == "admin" && passw == "password"){
        // res.send("change state")
        res.sendFile(__dirname+'/src/changestate.html')
    }
    else{
        res.sendFile(__dirname+'/src/login.html')
    }
})

//change state 
app.post('/chanst',function(req,res){
    let state = req.body.chans
    console.log("the State now is : " + state)
    res.sendFile(__dirname+'/src/login.html')
})

//vote now 
app.get('/vote',function(req,res){
    // res.send("e VOTING System !!")
    res.sendFile(__dirname+'/src/vote.html')
})
app.post('/vote',function(req,res){
    let addr = req.body.address
    let vote = req.body.candidate
    console.log("Voted :"+ addr)
    res.send("Vote polled Success Fully")
})

//register 
app.get('/register',function(req,res){
    res.sendFile(__dirname+'/src/register.html')
})
app.post('/register',function(req,res){
    let addr = req.body.address
    console.log(addr + "registed")
    res.send("registed successfully")
})