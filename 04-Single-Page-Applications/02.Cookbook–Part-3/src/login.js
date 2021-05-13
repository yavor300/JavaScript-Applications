let main;
let section;
let onSuccess;

export function setupLogin(mainTarget, sectionTarget, onSuccessTarget) {
    main = mainTarget;
    section = sectionTarget;
    onSuccess = onSuccessTarget;

    section.querySelector('form').addEventListener('submit', onSubmit);
}

export function showLogin() {
    main.innerHTML = '';
    main.appendChild(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });
        const data = await response.json();
        if (response.status === 200) {
            sessionStorage.setItem('accessToken', data.accessToken);
            onSuccess();
        } else {
            throw new Error(data.message);
        }
    } catch (err) {
        console.log(err.message);
    }
}
