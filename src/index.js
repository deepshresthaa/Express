const PORT=8000;
const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
const requests=require("requests");
const { ReadStream } = require("fs");
// const staticFile=path.join(__dirname,"../public")
// app.use(express.static(staticFile));

hbs.registerPartials(path.join(__dirname,"../templates/partials"));

app.set("view engine","hbs");
app.set("views",path.join(__dirname,'../templates/views'));


app.use(express.static(path.join(__dirname,"../public")))

app.get("/",(req,res)=>{

    res.render("index.hbs",{
        title:"Home",
        pageName:"Home",
    })
})

app.get("/about",(req,res)=>{
    console.log(req.query.city)
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&units=metric&appid=b0bd786976cf607a17e0a759bd175b8d
`)
    .on("data",(chunk)=>{
        const obj=JSON.parse(chunk);
        const arrData=[obj];
        // res.send(arrData)
        console.log(arrData)
        res.send(`${arrData[0].name} = ${arrData[0].main.temp}°C`)

    })
})

app.get("/contact",(req,res)=>{
    res.render("contact",{
        title:"Contact Us",
        pageName:"Contact Us"
    })
})
app.get("/about/*",(req,res)=>{
    res.render("404",{
        errorStatus:"404- page cannot found inside about section!!"
    })
})
app.get("/contact/*",(req,res)=>{
    res.render("404",{
        errorStatus:"404- page cannot found inside contact section!!"
    })
})
app.get("*",(req,res)=>{
    res.render("404",{
        errorStatus:"404- page cannot found!!"
    })
})

app.listen(PORT,()=>{
    console.log(`Listening to port:${PORT}`);
})