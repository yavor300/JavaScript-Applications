import {setupHome} from './views/home.js';
import {setupLogin} from './views/login.js';
import {setupRegister} from './views/register.js';
import {setupDetails} from './views/details.js';
import {setupDashboard} from './views/dashboard.js';
import {setupCreate} from './views/create.js';

const main = document.querySelector('main');
const nav = document.querySelector('nav');

const views = {};
const links = {};

const navigation = {
    goTo,
    setUserNav
};

registerView('home', document.querySelector('#home-page'), setupHome, 'homeLink');
registerView('login', document.querySelector('#login-page'), setupLogin, 'loginLink');
registerView('create', document.querySelector('#create-page'), setupCreate, 'createLink');
registerView('dashboard', document.querySelector('#dashboard-holder'), setupDashboard, 'dashboardLink');
registerView('details', document.querySelector('#details-page'), setupDetails);
registerView('register', document.querySelector('#register-page'), setupRegister, 'registerLink');
document.getElementById('views').remove();

setupNavigation();

goTo('home');

function registerView(name, section, setup, linkId) {
    const view = setup(section, navigation); //returns show
    views[name] = view;
    if (linkId) {
        links[linkId] = name;
    }
}

async function goTo(name, ...params) {
    main.innerHTML = '';
    const view = views[name];
    const section = await view(...params);
    main.appendChild(section);
}

function setupNavigation() {
    setUserNav();

    nav.addEventListener('click', (ev) => {
        const viewName = links[ev.target.id];
        if (viewName) {
            ev.preventDefault();
            goTo(viewName);
        }
    })
}

function setUserNav() {
    const token = sessionStorage.getItem("authToken");
    if (token != null) {
        [...nav.querySelectorAll('.user-nav')].forEach(e => e.style.display = 'list-item');
        [...nav.querySelectorAll('.guest-nav')].forEach(e => e.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.user-nav')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest-nav')].forEach(e => e.style.display = 'list-item');
    }
}
