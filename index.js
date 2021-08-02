const express=require("express");
const app=express()
const port=process.env.PORT||3000
app.get("/users",(req,res)=>{
 res.send("<h1>The server working for client </h1>")
})

app.listen(port,()=>{
console.log("server is starting on port "+port)
})
