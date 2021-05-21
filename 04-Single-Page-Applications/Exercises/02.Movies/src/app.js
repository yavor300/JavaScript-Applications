import {setupHome, showHomePage} from './home.js';
import {setupRegister, showRegister} from './register.js';
import {setupLogin, showLogin} from './login.js';
import {setupAddMovie, showAddMovie} from './add-movie.js';
import {setupDetails} from './details.js';
import {setupEdit} from './edit-movies.js';

main();

function main() {
    const links = {
        'home': showHomePage,
        'register': showRegister,
        'login': showLogin,
        'add-movie-button': showAddMovie
    }

    setUserNav();

    const main = document.querySelector('main');
    const nav = document.querySelector('nav');
    const homePageSection = document.querySelector('#home-page');
    const addMovieButtonSection = document.querySelector('#add-movie-button');
    const movieSection = document.querySelector('#movie');
    const signUpSection = document.querySelector('#form-sign-up');
    const loginSection = document.querySelector('#form-login');
    const addMovieSection = document.querySelector('#add-movie');
    const movieDetailsSection = document.querySelector('#movie-example');
    const editMovieSection = document.querySelector('#edit-movie');

    setupHome(main, homePageSection, addMovieButtonSection, movieSection);
    setupRegister(main, signUpSection, () => {setUserNav(); showHomePage()});
    setupLogin(main, loginSection, () => {setUserNav(); showHomePage()});
    setupAddMovie(main, addMovieSection, () => {showHomePage()})
    setupDetails(main, movieDetailsSection);
    setupEdit(main, editMovieSection);
    setupNavigation();

    showHomePage();

    function setUserNav() {
        if (sessionStorage.getItem('accessToken') != null) {
            document.querySelector('#register').style.display = 'none';
            document.querySelector('#login').style.display = 'none';
            document.querySelector('#welcome').style.display = 'inline-block';
            document.querySelector('#welcome').textContent = `Welcome, ${sessionStorage.getItem('email')}`;
            document.querySelector('#logout').style.display = 'inline-block';
            document.querySelector('#logout').addEventListener('click', logout);
        } else {
            document.querySelector('#register').style.display = 'inline-block';
            document.querySelector('#login').style.display = 'inline-block';
            document.querySelector('#welcome').style.display = 'none';
            document.querySelector('#logout').style.display = 'none';
        }
    }

    function setupNavigation() {
        nav.addEventListener('click', event => {
            if (event.target.tagName === 'A') {
                const view = links[event.target.id];
                if (typeof view === 'function') {
                    event.preventDefault();
                    view();
                }
            }
        });

        document.querySelector('#add-movie-button').addEventListener('click', event => {
            if (event.target.tagName === 'A') {
                const view = links['add-movie-button'];
                if (typeof view === 'function') {
                    event.preventDefault();
                    view();
                }
            }
        });
    }

    async function logout() {
        const token = sessionStorage.getItem('accessToken');
        const  response = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: {'X-Authorization': token}
        });

        if (!response.ok) {
            const error = await response.json();
            return alert(error.message);
        }

        sessionStorage.clear();
        setUserNav();
        showHomePage();
    }
}