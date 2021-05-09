function attachEvents() {
    document.querySelector('#submit').addEventListener('click', onSubmit);
    document.querySelector('#refresh').addEventListener('click', onRefresh);
}

async function onRefresh() {
    document.querySelector('textarea').value = '';

    const response = await fetch('http://localhost:3030/jsonstore/messenger');
    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }
    const data = await response.json();

    for (const [key, value] of Object.entries(data)) {
        document.querySelector('textarea').value += (`${value.author}: ${value.content}\n`);
    }
}

async function onSubmit() {
    const author = document.querySelector('#author').value;
    const content = document.querySelector('#content').value;

    const response = await fetch('http://localhost:3030/jsonstore/messenger', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({author, content})
    })

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    document.querySelector('#author').value = '';
    document.querySelector('#content').value = '';
}

attachEvents();