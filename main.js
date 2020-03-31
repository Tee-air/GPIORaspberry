//var express = require('express');
var PouchDB = require('pouchdb');
//Module a 
var sensor = require('node-dht-sensor');
//var sensorManager = require('Managers/manageSensor.js');
var EventEmitter = require('events').EventEmitter;

var event = new EventEmitter();


//var app = express();

setInterval(function () { getValueSensor("airSensor", true); }, 3600000); //Toute les heures

setInterval(function () { getValueSensor("airSensor", false); }, 600000);

event.on('addValue', addValue);
event.on('openVanne', openVanne);
//event.on('addValue', addValue);
event.on('readValueData', readValueData);


var addValue = function addValue(temperature, humidity) {
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
}

function readValueData(typeCulture, temperatureActuelle, humidtyActuelle) {
	console.log("reading");
	try {
		var db = new PouchDB('http://127.0.0.1:5984/profil_culture');
		db.get(typeCulture).then(function (doc) {
			if (doc.temperatureMax <= temperatureActuelle) {
				//TODO allumer le ventilateur.
			}
			if (doc.humidtyMax <= humidtyActuelle) {
				//TODO allumer le ventilateur.
			}
		});
	} catch (err) {
		throw err;
	}
}

function getValueSensor(sensorType, isInsert) {

	sensor.read(11, 2, function (err, temperature, humidity) {
		if (isInsert) {
			event.emit('addValue', temperature, humidity);
		} else {
			event.emit('readValueData', typeCulture, temperature, humidity);
		}


	});

	isTheSoilWet();


}



function isTheSoilWet() {
	const raspi = require('raspi');
	const gpio = require('raspi-gpio');
	let result;


	raspi.init(() => {

		const input = new gpio.DigitalInput({
			pin: 7
		});
		if (input.value === 0) {
			event.emit('openVanne');
		}
	});
}


function openVanne() {
	//TODO: Test cette partie du code
	const raspi = require('raspi');
	const gpio = require('raspi-gpio');
	let result;

	raspi.init(() => {
		const output = new gpio.DigitalOutput({
			pin: 11
		});
		output.write(1);

		console.log(result);
	});
}

//isTheSoilWet()

//app.listen(8081);


