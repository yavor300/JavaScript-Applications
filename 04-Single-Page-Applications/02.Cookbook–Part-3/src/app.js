import {setupCatalog, showCatalog}  from './catalog.js';
import {setupLogin, showLogin} from './login.js';
import {setupRegister, showRegister} from './register.js';
import {setupCreate, showCreate} from './create.js';

main();

function main() {
    setUserNav();

    const main = document.querySelector('main');
    const catalogSection = document.querySelector('#catalogSection');
    const loginSection = document.querySelector('#loginSection');
    const registerSection = document.querySelector('#registerSection');
    const createSection = document.querySelector('#createSection');

    const links = {
        'catalogLink': showCatalog,
        'loginLink': showLogin,
        'registerLink': showRegister,
        'createLink': showCreate
    }

    const nav = document.querySelector('nav');

    setupCatalog(main, catalogSection);
    setupLogin(main, loginSection, () => {setUserNav(); setActiveNav('catalogLink'); showCatalog()});
    setupRegister(main, registerSection, () => {setUserNav(); setActiveNav('catalogLink'); showCatalog()});
    setupCreate(main, createSection, () => {setActiveNav('catalogLink'); showCatalog()});
    setupNavigation();

    //Start in catalog view
    showCatalog();

    function setActiveNav(targetId) {
        [...nav.querySelectorAll('a')].forEach(el => {
            if (el.id === targetId) {
                el.classList.add('active')
            } else {
                el.classList.remove('active');
            }
        })
    }

    function setupNavigation() {
        nav.addEventListener('click', event => {
            if (event.target.tagName === 'A') {
                const view = links[event.target.id];
                if (typeof view === 'function') {
                    event.preventDefault();
                    setActiveNav(event.target.id);
                    view();
                }

            }
        })
    }

    function setUserNav() {
        if (sessionStorage.getItem('accessToken') != null) {
            document.querySelector('#user').style.display = 'inline-block';
            document.querySelector('#guest').style.display = 'none';
            document.querySelector('#logoutBtn').addEventListener('click', logout);
        } else {
            document.querySelector('#user').style.display = 'none';

            document.querySelector('#guest').style.display = 'inline-block';
        }
    }

    async function logout() {
        const token = sessionStorage.getItem('accessToken');
        const  response = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: {'X-Authorization': token}
        });

        if (!response.ok) {
            const error = await response.json();
            return alert(error.message);
        }

        sessionStorage.removeItem('accessToken');
        setUserNav();
        showCatalog();
    }
}