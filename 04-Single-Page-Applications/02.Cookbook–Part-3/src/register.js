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
    const repass= formData.get('rePass');

    //Validations
    if (email === '' || password === '') {
        return alert('All fields are required.')
    } else if (password !== repass) {
        return alert('Passwords don\'t match.')
    }

    //Registering the user
    const response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });

    //Handling errors
    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    //Saving token in the session storage
    const data = await response.json();
    sessionStorage.setItem('accessToken', data.accessToken);

    //Redirecting to another page after successful register
    onSuccess()
}
