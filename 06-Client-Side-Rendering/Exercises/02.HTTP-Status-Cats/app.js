import {html, render} from '../node_modules/lit-html/lit-html.js';
import {cats as catsData} from './catSeeder.js';
import {styleMap} from '../node_modules/lit-html/directives/style-map.js';

const main = document.getElementById('allCats');
catsData.forEach(c => c.info = false);

const createCardTemplate = (cat) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn">${cat.info ? 'Hide' : 'Show'}</button>
            <div class="status" style=${styleMap(cat.info ? {} : {display: 'none'})} id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
`;
update();

function update() {
    const catsList = html`
    <ul @click=${toggleInfo}>
        ${catsData.map(createCardTemplate)};
    </ul>
`;
    render(catsList, main);
}

function toggleInfo(event) {
    const elementId = event.target.parentNode.querySelector('.status').id;
    const cat = catsData.find(c => c.id === elementId);
    cat.info = !cat.info;
    update();
}