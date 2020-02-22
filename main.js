var express = require ('express');

var app = express();
var PouchDB = require('pouchdb');
var sensor = require("node-dht-sensor");

//console.log('hello wordl');




//setInterval(function(){logIt();}, 5000);

setInterval(function(){insertData("airSensor");}, 60000);


function logIt (){
	sensor.read(11, 2, function(err, temperature, humidity){

		if(!err){
			console.log('temp: ' + temperature + ', humidity: ' + humidity + '%');
		}
	});
}


//app.get('/MyState', function(req, res){

//});



function insertData(sensorType){

	sensor.read(11, 2, function(err, temperature, humidity){
		console.log("inserting");
		try{
			
			var today = new Date();
			var time = today.getFullYear()+'_'+(today.getMonth()+1) + "_" + today.getMinutes();
			var db = new PouchDB('http://127.0.0.1:5984/sensor_data');
			var doc = {
			"_id": time, 
			"type": sensorType,
			"temp": temperature,
			"humidity": humidity,
			"jour": today.getDay(),
			"minute": today.getMinutes()
			};

			db.put(doc);
		}catch(err){
			console.log(err);
		}
	});
	
}

//insertData("airSensor");



//app.listen(8081);


