//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    // console.log(req.body.crypto);
    let crypto = req.body.crypto;
    let fiat = req.body.fiat;
    let amount = req.body.amount;
    let options={
        url: "https://apiv2.bitcoinaverage.com/indices/global",
        method:"GET",
        qs:{
            from: crypto,
            to: fiat,
            amount: amount
        }
    };
    request(options,function(error,response,body){
        let data = JSON.parse(body);
        let price = data.price;
        let currrentDate = data.time;
        res.write("The current date is "+currrentDate);
        res.write(amount+" "+crypto +" is currently worth "+price+" "+fiat);
        res.send();
    });
});
app.listen(3000,function(){
    console.log("Server is runnning on port 3000");
});