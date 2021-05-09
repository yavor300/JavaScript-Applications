document.querySelector('form').addEventListener('submit', onCreateSubmit);

async function onCreateSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const img = formData.get('img');
    const ingredients = formData.get('ingredients')
        .split('\n')
        .map(i => i.trim())
        .filter(i => i !== '');
    const steps = formData.get('steps')
        .split('\n')
        .map(s => s.trim())
        .filter(s => s !== '');

    const response = await fetch('http://localhost:3030/data/recipes', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({name, img, ingredients, steps})
    });

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    //Redirecting to another page after successful register
    window.location.pathname = 'index.html';
}