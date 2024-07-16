import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NavigateUrlCmp extends NavigationMixin(LightningElement) {

    nameValue;

    handleChange(event) {
        this.nameValue = event.target.value
    }

    navigateTo() {
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__ToisUrlAddressableCmp'
            },
            state: {
                c__propertyValue: this.nameValue
            },
        });
    }
}