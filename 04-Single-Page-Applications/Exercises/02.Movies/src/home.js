import {e} from './dom.js';
import {showDetailsPage} from './details.js';

let main;
let sectionHome;
let addMovieButtonSection;
let moviesSection;

export function setupHome(mainTarget, sectionHomePage, addMoviesButton, movies) {
    main = mainTarget;
    sectionHome = sectionHomePage;
    addMovieButtonSection = addMoviesButton;
    moviesSection = movies;
}

export async function showHomePage() {
    main.innerHTML = '';
    main.appendChild(sectionHome);

    main.appendChild(e('h1', {className: 'text-center'}, 'Movies'));

    if (sessionStorage.getItem('accessToken') !== null) {
        main.appendChild(addMovieButtonSection);
    }

    setupMoviesSection();
    main.appendChild(moviesSection);

    const movies = await getMovies();
    movies.forEach(m => {
        document.querySelector('.card-deck').appendChild(createMovieCard(m));
    });
}

async function getMovies() {
    const response = await fetch('http://localhost:3030/data/movies');
    return await response.json();
}

function setupMoviesSection() {
    moviesSection.innerHTML = '';
    moviesSection.appendChild(e('div', {className: 'mt-3'},
        e('div', {className: 'row d-flex d-wrap'},
            e('div', {className: 'card-deck d-flex justify-content-center'}, ''))));
}

function createMovieCard(movie) {
    return e('div', {className: 'card mb-4'},
        e('img', {className: 'card-img-top', src: movie.img, alt: 'Card image', width: 400},''),
        e('div', {className: 'card-body'},
            e('h4', {className: 'card-title'}, movie.title)),
        e('div', {className: 'card-footer'},
            sessionStorage.getItem('accessToken') !== null ? e('button', {type: 'button', className: 'btn btn-info', onclick: () => showDetailsPage(movie._id)}, 'Details'): ''));
}