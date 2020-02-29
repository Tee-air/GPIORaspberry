//var express = require('express');
var PouchDB = require('pouchdb');
//Module a 
var sensor = require('node-dht-sensor');
//var sensorManager = require('Managers/manageSensor.js');
//var gpiop = require('rpi-gpio');

//var app = express();

//setInterval(function () { insertData("airSensor"); }, 600000);


//app.get('/MyState', function (req, res) {
//TODO: Génériser les capteurs et leur gestion.
//let sensorManager = new manageSensor();
//res.send(sensorManager.getState());

//});


function insertData(sensorType) {

	sensor.read(11, 2, function (err, temperature, humidity) {
		console.log("inserting");
		try {
			var today = new Date();
			var time = today.getFullYear() + '_' + (today.getMonth() + 1) + "_" + today.getHours() + "_" + today.getMinutes();
			var db = new PouchDB('http://127.0.0.1:5984/sensor_data');
			var doc = {
				"_id": time,
				"type": sensorType,
				"temp": temperature,
				"humidity": humidity,
				"jour": today.getDay(),
				"heure": today.getHours(),
				"minute": today.getMinutes()
			};



			db.put(doc);
		} catch (err) {
			throw err;
		}
	});

}

function getValueSensor(sensorType) {
	if (sensorType === "groundSensor") {


		gpiop.setup(5, gpiop.DIR_IN, function (err) {

			if (!err) {
				return gpiop.read(5, function (err, value) {
					if (!err) {
						console.log(value);
					}
				});
			} else {
				console.log('Error: ', err.toString())
			}

		});

	} else if (sensorType === "airSensor") {

	}
}

//console.logt(getValueSensor("groundSensor"));

//app.listen(8081);


