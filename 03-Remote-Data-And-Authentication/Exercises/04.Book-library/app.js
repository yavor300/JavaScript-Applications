document.querySelector('#loadBooks').addEventListener('click', onLoadBooks);
document.querySelector('form').addEventListener('submit', onFormSubmit);

async function onFormSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const author = formData.get('author');
    const title = formData.get('title');

    if (document.querySelector('h3').textContent === 'FORM') {
        const response = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({author, title})
        });
        if (!response.ok) {
            const error = await response.json();
            return alert(error.message);
        }
    } else {
        const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + sessionStorage.getItem('bookId'), {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({author, title})
        });
        if (!response.ok) {
            const error = await response.json();
            return alert(error.message);
        }
    }

    Array.from(document.querySelectorAll('input'))
        .forEach(i => i.value = '');

    document.querySelector('h3').textContent = 'FORM';
    document.querySelector('form button').textContent = 'Submit';

    onLoadBooks();
}

async function onEdit(id) {
    document.querySelector('h3').textContent = 'Edit FORM';
    document.querySelector('form button').textContent = 'Save';
    sessionStorage.setItem('bookId', id);
}

async function onDelete(id) {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete',
    });
    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    onLoadBooks();
}

async function onLoadBooks() {
    document.querySelector('tbody').innerHTML = '';

    const response = await fetch('http://localhost:3030/jsonstore/collections/books');
    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();
    for (const [key, value] of Object.entries(data)) {
        const tr = createElement('tr', '');
        const tdTitle = createElement('td', value.title);
        const tdAuthor = createElement('td', value.author);
        const tdButtons = createElement('td', '');
        const editBtn = createElement('button', 'Edit');
        editBtn.addEventListener('click', () => onEdit(key));
        const deleteBtn = createElement('button', 'Delete');
        deleteBtn.addEventListener('click', () => onDelete(key));

        appendElements(document.querySelector('tbody'),
            appendElements(tr, tdTitle, tdAuthor,
                appendElements(tdButtons, editBtn, deleteBtn)));
    }
}

function createElement(type, content) {
    const result = document.createElement(type);
    result.textContent = content;
    return result;
}

function appendElements(parent, ...children) {
    children.forEach(child => {
        parent.appendChild(child);
    });
    return parent;
}