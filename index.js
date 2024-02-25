const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/Database')
const db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    const name= req.body.name
    const dob=req.body.dob
    const rollno=req.body.rollno
    const schoolno=req.body.schoolno
    const admitCardId=req.body.admitCardId
    const aim=req.body.aim
    const mobileno=req.body.mobileno

    const data={
        "name":name,
        "dob":dob,
        "rollno":rollno,
        "schoolno":schoolno,
        "admitCardId":admitCardId,
        "aim":aim,
        "mobileno":mobileno
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_successful.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000")