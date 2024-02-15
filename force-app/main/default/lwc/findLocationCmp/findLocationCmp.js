import { LightningElement } from 'lwc';

const locationApi = 'https://api.wheretheiss.at/v1/coordinates/';

export default class FindLocationCmp extends LightningElement {

    latitude;
    longitude;
    info = {};


    handleChange(event) {
        if (event.target.name == 'lat') {
            this.latitude = event.target.value;
        } else if (event.target.name == 'long') {
            this.longitude = event.target.value;
        }
    }

    getLocation() {
        if (this.latitude && this.longitude) {
            fetch(locationApi + this.latitude + ',' + this.longitude)
                .then(response => {
                    console.log('--- result---', response);
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw Error(response);
                    }
                })
                .then(info => {
                    this.info = {
                        country_code: info.country_code,
                        timezone_id: info.timezone_id,
                        latitude: info.latitude,
                        longitude: info.longitude,
                        map_url: info.map_url
                    };
                })
                .catch(error => {
                    console.error('--- errror---', error);
                })
        } else {
            alert('Please specify Latitude and Longitude');
        }
    }
}