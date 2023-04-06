const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { response } = require('express');
const { json } = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.post("/success", function(req,res){
    res.redirect("/");
});

app.post("/", function(req,res){

    const fname = req.body.fname;
    const lname = req.body.sname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : fname,
                    LNAME : lname,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/9d13645c85"
    const options = {
        method: "POST",
        auth: "soul:d8704b00bfe2f0456b4ecfc011f6010e-us10"
    }

    var request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
        
        if(response.statusCode === 200){
            res.sendFile(__dirname +"/success.html");
        }
        else{
            res.sendFile(__dirname +"/failure.html");
        }
    })

    request.write(jsonData);
    request.end();
})

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server running on port 3000");
})



// d8704b00bfe2f0456b4ecfc011f6010e-us10
// 9d13645c85
