import {login, register} from '../api/data.js';

export function setupRegister(section, navigation) {
    const form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');

        if (email === '' || password === '') {
            return alert('All fields are required!');
        }

        if (password !== repeatPassword) {
            return alert('Passwords do not match!');
        }

        await register(email, password);
        form.reset(); //deleting field values
        navigation.setUserNav();
        navigation.goTo('home');
    }

    return showRegister;

    function showRegister() {
        return section;
    }
}