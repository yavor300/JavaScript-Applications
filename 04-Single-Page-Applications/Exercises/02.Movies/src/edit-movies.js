import {showDetailsPage} from './details.js';

let main;
let section;
let _id;

export function setupEdit(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    section.querySelector('form').addEventListener('submit', onSubmit);
}

export function setId(id) {
    _id = id;
}

export async function showEditPage(id) {
    main.innerHTML = '';
    main.appendChild(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get('title');
    const description = formData.get('description');
    const img= formData.get('imageUrl');

    if (title === '' || description === '' || img === '') {
        return alert('All fields are required.')
    }

    await editMovie(_id, title, description, img);

    Array.from(document.querySelectorAll('form input'))
        .forEach(f => {f.value = ''});

    showDetailsPage(_id);
}


async function editMovie(id, title, description, img) {
    const response = await fetch(`http://localhost:3030/data/movies/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({title, description, img})
    });

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }
}