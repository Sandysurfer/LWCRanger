import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class NavigationDemo extends NavigationMixin(LightningElement) {

    navHomeClickHandler() {
        let pageReg = {
            type: 'standard__namedPage',
            attributes: {
                name: 'Home'
            }
        };
        this[NavigationMixin.Navigate](pageReg)
    }

    navAccListViewClickHandler() {
        let pageRef =
        {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'list'
            }
        };
        this[NavigationMixin.Navigate](pageRef)

    }

    createNewAccClickHandler() {
        const defaultValues = encodeDefaultFieldValues({
            Industry: 'Energy',
            Rating: 'Hot'
        });
        let pageRef = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues

            }
        };
        this[NavigationMixin.Navigate](pageRef)

    }
}