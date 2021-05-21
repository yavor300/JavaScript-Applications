import {e} from './dom.js';
import {showHomePage} from './home.js';
import {showEditPage, setId} from './edit-movies.js'

let main;
let section;

export function setupDetails(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showDetailsPage(id) {
    main.innerHTML = '';
    section.innerHTML = '';
    main.appendChild(section);

    const response = await fetch('http://localhost:3030/data/movies/' + id);
    const movie = await response.json();
    section.appendChild(await createMovieDetails(movie));
}

async function createMovieDetails(movie) {
    return e('div', {className: 'container'},
        e('div', {className: 'row bg-light text-dark'},
            e('h1', {}, 'Movie title: ' + movie.title),
            e('div', {className: 'col-md-8'},
                e('img', {className: 'img-thumbnail', src: movie.img, alt: 'Movie Banner'}, '')),
            e('div', {className: 'col-md-4 text-center'},
                e('h3', {className: 'my-3'}, 'Movie Description'),
                e('p', {}, '' + movie.description),
                e('a', {className: 'btn btn-danger', href: '#', onclick: async () => await deleteMovie(movie._id)}, 'Delete'),
                e('a', {className: 'btn btn-warning', href: '#', onclick: () => {showEditPage(movie._id); setId(movie._id)}}, 'Edit'),
                e('a', {className: 'btn btn-primary', href: '#', onclick: async () => await likeMovie(movie._id)}, 'Like'),
                e('span', {className: 'enrolled-span'}, 'Liked ' + await getNumberOfMovieLikes(movie._id)))));
}

async function getNumberOfMovieLikes(id) {
    const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    return response.json();
}

async function deleteMovie(id) {
    const response = await fetch(`http://localhost:3030/data/movies/${id}`, {
        method: 'delete',
        headers: {
            'X-Authorization': sessionStorage.getItem('accessToken')
        }
    });

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    showHomePage();
}



// async function getCurrentUser() {
//     const response = await fetch(`http://localhost:3030/users/me`, {
//         method: 'get',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-Authorization': sessionStorage.getItem('accessToken')
//         }
//     });
//
//     const data = await response.json();
//     console.log(data)
// }

// async function likeMovie(_id) {
//     const response = await fetch(`http://localhost:3030/data/likes`, {
//         method: 'post',
//         headers: {'X-Authorization': sessionStorage.getItem('accessToken')},
//         body: JSON.stringify({_id})
//     });
//
//     if (!response.ok) {
//         const error = await response.json();
//         return alert(error.message);
//     }
//
//     showDetailsPage();
// }


