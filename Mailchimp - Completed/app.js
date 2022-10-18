const express = require("express");
const https = require("https");

const app = express();

const listId = "30abfa2373";
const apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const url = "https://us14.api.mailchimp.com/3.0/lists/" + listId;
const options = {
    method: "POST",
    auth: "CarlosLopez543:" + apiKey
}

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);


app.get("/",(req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const FNAME = req.body.FNAME;
    const LNAME = req.body.LNAME;
    const EMAIL = req.body.EMAIL;

    var data = {
        members: [
            {
                email_address: EMAIL,
                status: "subscribed",
                merge_fields: {
                    FNAME: FNAME,
                    LNAME: LNAME
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data);
    var mailRequest = https.request(url, options, (response) => {
        if(response.statusCode === 200) {
            response.on("data", (data) => {
                var jsonResp = JSON.parse(data);
                if(jsonResp["error_count"] === 0) {
                    res.render(__dirname + "/success.html");
                } else {
                    res.render(__dirname + "/failure.html");
                    console.log(jsonResp.errors[0]["error_code"]);
                    console.log(jsonResp.errors[0]["error"]);
                }
            }).on("error", (e) => {
                res.render(__dirname + "/failure.html", {name:name});
            });
        } else {
            console.log("Funcionó de maravilla")
        }
    });
    mailRequest.write(jsonData);
    mailRequest.end();
});

app.listen(3000, () => {
    console.log("Tuki tuki tuki tuki");
});






