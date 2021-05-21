let main;
let section;
let onSuccess;

export function setupAddMovie(mainTarget, sectionTarget, onSuccessTarget) {
    main = mainTarget;
    section = sectionTarget;
    onSuccess = onSuccessTarget;
    section.querySelector('form').addEventListener('submit', onSubmit);
}

export function showAddMovie() {
    main.innerHTML = '';
    main.appendChild(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    if (title === '' || description === '' || img === '') {
        return alert('All fields are required.')
    }

    const response = await fetch('http://localhost:3030/data/movies', {
        method: 'post',
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

    Array.from(document.querySelectorAll('form input'))
        .forEach(f => {f.value = ''});

    Array.from(document.querySelectorAll('form textarea'))
        .forEach(f => {f.value = ''});

    onSuccess();
}