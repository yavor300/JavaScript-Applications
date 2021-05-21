let main;
let section;
let onSuccess;

export function setupRegister(mainTarget, sectionTarget, onSuccessTarget) {
    main = mainTarget;
    section = sectionTarget;
    onSuccess = onSuccessTarget;

    section.querySelector('form').addEventListener('submit', onSubmit);
}

export function showRegister() {
    main.innerHTML = '';
    main.appendChild(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const repass= formData.get('repeatPassword');

    if (email === '' || password === '') {
        return alert('All fields are required.')
    } else if (password !== repass) {
        return alert('Passwords don\'t match.')
    }

    const response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    //_id
    const data = await response.json();
    sessionStorage.setItem('accessToken', data.accessToken);
    sessionStorage.setItem('email', email);

    Array.from(document.querySelectorAll('form input'))
        .forEach(f => {f.value = ''});

    onSuccess();
}
