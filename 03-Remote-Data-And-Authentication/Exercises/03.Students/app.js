window.addEventListener('load', onLoad);

async function onLoad() {
    document.querySelector('tbody').innerHTML = '';

    const response = await fetch('http://localhost:3030/jsonstore/collections/students');
    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();
    for (const [key, value] of Object.entries(data)) {
        const tr = createElement('tr');
        const tdFirstName = createElement('td', value.firstName);
        const tdLastName = createElement('td', value.lastName);
        const tdFacultyNumber = createElement('td', value.facultyNumber);
        const tdGrade = createElement('td', value.grade);

        appendElements(document.querySelector('tbody'), appendElements(tr, tdFirstName, tdLastName, tdFacultyNumber, tdGrade));
    }
}

document.querySelector('form').addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    if (firstName === '' || lastName === '' || facultyNumber === '' || grade === '') {
        return alert('There can not be empty fields.')
    }

    if (isNaN(Number(grade))) {
        return alert('Grade must be a valid number.')
    }

    const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({firstName, lastName, facultyNumber, grade})
    });
    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    Array.from(document.querySelectorAll('input'))
        .forEach(i => i.value = '');

    onLoad();
});

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