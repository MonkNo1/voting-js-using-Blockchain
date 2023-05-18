const express=require('express')
const bodyparser=require('body-parser')
const Web3=require('web3')
app=express()
app.use(bodyparser.urlencoded({ extended: false }))
app.use('', express.static('public'))
app.listen(8000)


const ABI=[{'inputs': [], 'stateMutability': 'nonpayable', 'type': 'constructor'},
{'inputs': [{'internalType': 'uint256', 'name': 'k', 'type': 'uint256'}],
 'name': 'change_state',
 'outputs': [],
 'stateMutability': 'nonpayable',
 'type': 'function'},
{'inputs': [{'internalType': 'address', 'name': 'vt', 'type': 'address'}],
 'name': 'register',
 'outputs': [],
 'stateMutability': 'nonpayable',
 'type': 'function'},
{'inputs': [{'internalType': 'address', 'name': 'r', 'type': 'address'}],
 'name': 'regvoter',
 'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
 'stateMutability': 'view',
 'type': 'function'},
{'inputs': [],
 'name': 'stage',
 'outputs': [{'internalType': 'enum ballot.Stage',
   'name': '',
   'type': 'uint8'}],
 'stateMutability': 'view',
 'type': 'function'},
{'inputs': [{'internalType': 'uint8', 'name': 'i', 'type': 'uint8'}],
 'name': 'vote',
 'outputs': [],
 'stateMutability': 'nonpayable',
 'type': 'function'},
{'inputs': [],
 'name': 'winningProposal',
 'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
 'stateMutability': 'view',
 'type': 'function'}]
const contractAddress='0x52A4cA4e4909EA800BBB344C0681c1dE50025561'

async function connect()
{
    p=new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
    w3=new Web3(p);
}

let con_instance;
async function create_instance()
{
    con_instance=new w3.eth.Contract(ABI,contractAddress)
}

async function reg_voter(addr)
{
    con_instance.methods.register(addr).send({from:'0x1AC2e95095F2f891060F56fd92E161B0eDf68476'})
}

async function vote(addr,c)
{
    con_instance.methods.vote(c).send({from:addr})
}


async function chang_state(s)
{
    con_instance.methods.change_state(s).send({from:'0x1AC2e95095F2f891060F56fd92E161B0eDf68476'})
}




connect();
create_instance();

// app.use('', express.static('public'))

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
    let state = Number(req.body.chans)
    chang_state(state)
    console.log("the State now is : " + state)
    res.sendFile(__dirname+'/src/login.html')
})

//vote now 
app.get('/vote',function(req,res){
    // res.send("e VOTING System !!")
    let state = 1 
    if(state == 2){
        res.sendFile(__dirname+'/src/vote.html')
    }
    else {
        // res.send("Error state")
        res.sendFile(__dirname+'/src/wrongState.html')
    }
})
app.post('/vote',function(req,res){
    if(state == 2){
        let addr = req.body.address
        let vote = Number(req.body.candidate)
        console.log("Voted :"+ addr)
        res.sendFile(__dirname+'/src/votesu.html')
        vote_to(addr,vote)
    }
    else {
        // res.send("Error state")
        res.sendFile(__dirname+'/src/wrongState.html')
    }
})

//register 
app.get('/register',function(req,res){
    let state = 1 
    if(state == 1){
        res.sendFile(__dirname+'/src/register.html')
    }
    else {
        // res.send("Error state")
        res.sendFile(__dirname+'/src/wrongState.html')
    }

})
app.post('/register',function(req,res){
    let state = 1 
    if(state == 1){
    let addr = req.body.address
    console.log(addr + " registed")
    reg_voter(addr)
    // res.send("registed successfully")
    res.sendFile(__dirname+'/src/registersu.html')
    }
    else {
        // res.send("Error state")
        res.sendFile(__dirname+'/src/wrongState.html')
    }
})

//result
app.get('/result',async function(req,res){
    let y=await con_instance.methods.winningProposal().call()
    let state = 3
    state=y
    if(state == 3){
        // res.send("Results")
        let win = 3
        if  (win == 1){
            res.sendFile(__dirname+'/src/winner-DMK.html')
        }
        else if  (win == 2){
            res.sendFile(__dirname+'/src/winner-ADMK.html')
        }
        else if  (win == 3){
            res.sendFile(__dirname+'/src/winner-BJP.html')
        }    
    }
    else {
        res.sendFile(__dirname+'/src/wrongState.html')
    }
})