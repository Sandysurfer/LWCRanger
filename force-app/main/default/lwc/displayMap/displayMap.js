import { LightningElement, api } from 'lwc';

export default class DisplayMap extends LightningElement {

    @api street;
    @api city;
    @api country;
    @api title;
    @api description;

    get mapMarkers() {
        return [
            {
                location: {
                    Street: this.street,
                    City: this.city,
                    Country: this.country,
                },
                title: this.title,
                description: this.description
            },
        ];
    }

    get isMapLodaed() {
        if (this.street && this.city && this.country) {
            return true;
        }
        // eslint-disable-next-line no-else-return
        else {
            return false;
        }
    }
}