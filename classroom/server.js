const express=require("express")
const app=express()
const cookieParser=require("cookie-parser")

const users=require("./routes/user.js")
const posts=require("./routes/post.js")

const session=require("express-session")
const flash=require("connect-flash")
const path=require("path")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

// app.use("/users",users);
// app.use("/posts",posts);

// app.use(cookieParser("secretcode"))

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("love","coding",{signed:true})
//     res.send("sgned cookie sent")
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies)
//     res.send("verified")
// })

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello")
//     res.cookie("made by","amigos")
//     res.send("sent you some cookies")
// })

// app.get("/greet",(req,res)=>{
//     let {name="anonymous"}=req.cookies;
//     res.send(`Hi , ${name}`)
// })

// app.get("/",(req,res)=>{
//     console.dir(req.cookies)
//     res.send("HI I AM ROOT")
// })


//SESSIONS 

const sessionOptions={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
}


app.use(session(sessionOptions))
app.use(flash())

//middleware for error / success msg flash
app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success")
    res.locals.errorMsg=req.flash("error")
    next()
})

app.get("/register",(req,res)=>{
    let {name = "anonymous"}=req.query;
    req.session.name=name;
    console.log(req.session.name)
    if(name=="anonymous"){
        req.flash("error","some error occurred")
    }
    else{
        req.flash("success","user registered successfully")
    }
    res.redirect("/hello")
})

app.get("/hello",(req,res)=>{
    // console.log(req.flash("success"))
    // res.locals.successMsg=req.flash("success")
    // res.locals.errorMsg=req.flash("error")
    res.render("page.ejs",{name:req.session.name })
})

app.get("/test",(req,res)=>{
    res.send("TEST SUCCESSFULL")
})

app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1
    }
    res.send(`You sent a request ${req.session.count} times`)
})


app.listen(3000,()=>{
    console.log("server is listening to port 3000")
})
