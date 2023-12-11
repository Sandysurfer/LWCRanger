import { LightningElement, track } from 'lwc';
import retriveNews from '@salesforce/apex/NewsAppController.retriveNews';
export default class NewsAppIntegration extends LightningElement {

    @track result = [];
    @track isModalOpen = false;
    @track selectedNews = {};

    connectedCallback() {
        this.fetchNews();
    }

    //fetchNews Method Gets Called When Connected CallBack is Connected With Component and then we are calling retriveNews Method
    fetchNews() {
        retriveNews()
            .then((response) => {
                console.log('Response Occured', response);
                this.formatNewsData(response.articles);
            })
            .catch((error) => {
                console.log('Error Occured', error);
            })
    }

    formatNewsData(res) {
        this.result = res.map((item, index) => {
            let id = `news_${index + 1}`; //let id = 'news'+index+1
            let date = new Date(item.publishedAt).toDateString();
            let name = item.source.name;
            return { ...item, id: id, name: name, date: date }
        })
    }

    showModal(event) {
        this.isModalOpen = true;
        let id = event.target.dataset.item;
        this.result.forEach(item => {
            if (item.id === id) {
                this.selectedNews = { ...item };
            }
        })
    }

    closeModal() {
        this.isModalOpen = false;
    }

    get modalClass() {
        return `slds-modal ${this.isModalOpen ? "slds-fade-in-open" : ""}`
    }

}