import {login} from '../api/data.js';


export function setupLogin(section, navigation) {
   const form = section.querySelector('form');
   form.addEventListener('submit', onSubmit);
   async function onSubmit(event) {
       event.preventDefault();
       const formData = new FormData(form);
       const email = formData.get('email');
       const password = formData.get('password');

        await login(email, password);
        form.reset(); //deleting field values
        navigation.setUserNav();
        navigation.goTo('home');
   }

    return showLogin;

    function showLogin() {
        return section;
    }
}