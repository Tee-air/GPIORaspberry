var express = require ('express');

var app = express();

//console.log('hello wordl');

var sensor = require("node-dht-sensor");


setInterval(function(){logIt();}, 5000);




function logIt (){
	sensor.read(11, 2, function(err, temperature, humidity){

		if(!err){
			console.log('temp: ' + temperature + ', humidity: ' + humidity + '%');
		}
	});
}


app.get('/MyState', function(req, res){

});





app.listen(8081);


