/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement } from 'lwc';
const DELAY = 300;

export default class MovieSearch extends LightningElement {
    selectedType = '';
    loading = false;
    selectedSearch = '';
    selectedPageNo = '1';
    delayTimeout;
    searchResult = [];
    selectedMovie = '';


    get typeoptions() {
        return [
            { label: 'None', value: '' },
            { label: 'Movies', value: 'movie' },
            { label: 'Series', value: 'series' },
            { label: 'Episode', value: 'episode' },
        ];
    }

    handleChange(event) {
        let { name, value } = event.target;
        this.loading = true;
        if (name === 'type') {
            this.selectedType = value;
        } else if (name === 'search') {
            this.selectedSearch = value;
        } else if (name === 'pageno') {
            this.selectedPageNo = value;
        }
        //Debouncing Using SetTiMeOuT aND tIME iNTERVAL
        clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            this.searchMovie();
        }, DELAY);
    }
    //this method will search for movies
    async searchMovie() {
        //Using String Interpolation,template literals to bind Api Url With Dynamic Fetch Values Using Async Await Function.
        const url = `https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&page=${this.selectedPageNo}&apiKey=bfd44975`;
        const res = await fetch(url);
        const data = await res.json();
        console.log("Movie Search Output", data);
        this.loading = false;
        if (data.Response === 'True') {
            this.searchResult = data.Search;
        }
    }

    get displaySearchResult() {
        return this.searchResult.length > 0 ? true : false;
    }

    movieSelectedHandler(event) {
        this.selectedMovie = event.detail;
    }
}