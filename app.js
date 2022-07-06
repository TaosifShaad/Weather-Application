const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
// let array = [];

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
  // res.render("output", {arrayDes: array});
});

app.post("/", function(req, res){
  console.log(req.body.city);
  const query = req.body.city;
  const appid = process.env.MYAPIKEY;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;

  https.get(url, function(response){
    // console.log(response);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      console.log(temp);
      const description = weatherData.weather[0].description;
      console.log(description);
      const icon = weatherData.weather[0].icon;
      const iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // array.push(query);
      // array.push(description);
      // array.push(temp);
      // res.write("<h1>The weather is currently " + description+"</h1>");
      // res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius.</h1>")
      // res.write("<img src = " + iconurl + ">");
      // res.send();
      // res.redirect("/");
      res.render("output", {q: query, des: description, temperature: temp, source: iconurl});
    });
  });
});

app.listen(3000, function() {
  console.log("listening on port 3000");
});
