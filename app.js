const express= require("express");
const https= require('https');
const bodyParser= require('body-parser');

const app= express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})

app.post('/', function(req,res){
    var citydets= req.body.cityName;

    https.get('https://api.openweathermap.org/data/2.5/weather?q='+citydets+'&appid=eede9fcbeaadc014e34d0e0c8c1f081b', function(response){
        console.log(response.statusCode)
    
        response.on('data',function(data){
            const weatherDets= JSON.parse(data);
            const temp= weatherDets.main.temp;
            const imgw= weatherDets.weather[0].icon;
            const desc= weatherDets.weather[0].description;
            
            res.write('<p>The weather is '+desc+'</p>' );
            res.write('<h1>temperature at '+ citydets +' is '+temp+'</h1>');
            res.write('<img src="http://openweathermap.org/img/wn/'+imgw+'@2x.png">');
            res.send();
        })
    
    })
})






app.listen(3000, function(){
    console.log("Server started");
})