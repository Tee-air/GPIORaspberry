var sensor = require('node-dht-sensor');

class manageSensor {

    constructor(_type, _pinNumber) {
        this.type = _type;
        this.pinNumber = _pinNumber;
    }

    getState() {
        sensor.read(this.type, this.pinNumber, function (err, temperature, humidity) {

            if (!err) {
                return {
                    "temperature": temperature,
                    "humidity": humidity
                }
            }
        });
    }


}