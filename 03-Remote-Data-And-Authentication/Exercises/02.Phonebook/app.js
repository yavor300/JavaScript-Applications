function attachEvents() {
    document.querySelector('#btnLoad').addEventListener('click', onLoad);
    document.querySelector('#btnCreate').addEventListener('click', onCreate);
}

async function onCreate() {
    const person = document.querySelector('#person').value;
    const phone = document.querySelector('#phone').value;

    const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({person, phone})
    });
    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    document.querySelector('#person').value = '';
    document.querySelector('#phone').value = '';
}

async function onLoad() {
    document.querySelector('#phonebook').innerHTML = '';

    const response = await fetch('http://localhost:3030/jsonstore/phonebook');
    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }
    const data = await response.json();

    for (const [key, value] of Object.entries(data)) {
        const li = createElement('li', `${value.person}: ${value.phone}`);
        const btnDelete = createElement('button', 'Delete');
        btnDelete.id = 'btnDelete';
        appendElements(document.querySelector('#phonebook'), appendElements(li, btnDelete));
        btnDelete.addEventListener('click', () => onDelete(key))
    }
}

async function onDelete(key) {
    const response = await fetch('http://localhost:3030/jsonstore/phonebook/' + key, {
        method: 'delete'
    })
    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }
    onLoad();
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

attachEvents();