import { LightningElement, api } from 'lwc';

export default class MovieTile extends LightningElement {
    @api movie;
    @api selectedMovieId;

    clickHandler() {
        console.log(this.movie.imdbID);
        //Cutom Events
        const evt = new CustomEvent('selectedmovies', {
            detail: this.movie.imdbID
        });
        this.dispatchEvent(evt);
    }

    get tileSelected() {
        return this.selectedMovieId === this.movie.imdbID ? 'tile selected' : 'tile';
    }
}