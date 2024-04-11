const express=require("express")
const router =express.Router()

// USERS
//INDEX USER
router.get("/",(req,res)=>{
    res.send("GET for users")
})

//SHOW USERS
router.get("/:id",(req,res)=>{
    res.send("GET for users id")
})

//POST USERS
router.post("/",(req,res)=>{
    res.send("POST for users")
})

//DELETE USERS
router.delete("/:id",(req,res)=>{
    res.send("DELETE for users id")
})

module.exports=router