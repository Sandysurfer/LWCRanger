import { LightningElement } from 'lwc';
import getWeatherData from '@salesforce/apex/WeatherApiController.getWeatherData';
export default class WeatherApp extends LightningElement {
    city;
    weatherIcon;
    weatherText;

    handleChange(event) {
        this.city = event.target.value;
    }

    handleGetWeather() {
        getWeatherData({ city: this.city })
            .then((response) => {
                console.log("---Response---" + response);
                let weatherParseData = JSON.parse(response);
                this.weatherIcon = weatherParseData.current.condition.icon;
                this.weatherText = weatherParseData.current.condition.text;
            }).catch((error) => {
                this.weatherText = "No Matching City Found";
                console.log('---Error--->' + error);
            })
    }
}