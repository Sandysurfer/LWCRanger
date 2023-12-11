import { LightningElement, wire } from 'lwc';
import LOGO from '@salesforce/resourceUrl/logo';
import CONTENT_ASSET from '@salesforce/contentAssetUrl/traillogo';
import GREETING from '@salesforce/label/c.greeting';
import USER_ID from '@salesforce/user/Id';
import DISPLAY_TEXT from '@salesforce/customPermission/display_Text';
//import {loadScript,loadStyle} from 'lightning/platformResourceLoader;
//import customSR from '@salesforce/resourceUrl/customSR;
import NAME_FIELD from '@salesforce/schema/User.Name';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
export default class StaticResourceDemo extends LightningElement {

    myLogoImage = LOGO;
    myLogoAsset = CONTENT_ASSET;

    greeting = GREETING;

    //get loggedin user info using wireadapter getRecord
    name = "";
    @wire(getRecord, {
        recordId: USER_ID,
        fields: NAME_FIELD
    })
    wired_user_output({ data, error }) {
        if (data) {
            console.log('Logged In User Details', data);
            this.name = getFieldValue(data, NAME_FIELD);
        } else if (error) {
            console.log('Logged In User Details Error', error);
        }
    }

    get checkPermission() {
        return DISPLAY_TEXT;
    }

}