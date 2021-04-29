async function solution() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    const data = await response.json();
    console.log(data)

    data.forEach(element => {
        const divAccordion = createElement('div', '');
        divAccordion.classList.add('accordion');
        const divHead = createElement('div', '');
        divHead.classList.add('head');
        const span = createElement('span', element.title);
        const button = createElement('button', 'More');
        button.classList.add('button');
        button.id = element._id;
        const divExtra = createElement('div', '');
        divExtra.classList.add('extra');
        // const p = createElement('p');
        appendElements(document.getElementById('main'),
            appendElements(divAccordion, appendElements(divHead, span, button), divExtra));
    });

    document.getElementById('main').addEventListener('click',  showInfo);
}

async function showInfo(ev) {
    console.log(ev.target)
    if (ev.target.tagName === 'BUTTON') {
        if (ev.target.textContent === 'More' && Array.from(ev.target.parentNode.nextElementSibling.children).length === 0) {
            const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${ev.target.id}`);
            const data = await response.json();
            const p = createElement('p', data.content);
            ev.target.parentNode.nextElementSibling.appendChild(p);
            ev.target.parentNode.nextElementSibling.style.display = 'block';
            ev.target.textContent = 'Less';
        } else if (ev.target.textContent === 'More' && Array.from(ev.target.parentNode.nextElementSibling.children).length > 0) {
            ev.target.parentNode.nextElementSibling.style.display = 'block';
            ev.target.textContent = 'Less';
        } else {
            ev.target.parentNode.nextElementSibling.style.display = 'none';
            ev.target.textContent = 'More';
        }
    }
}


function createElement(type, content) {
    const result = document.createElement(type);
    result.textContent = content;
    return result;
}

function appendElements(parent, ...children) {
    children.forEach(child => {
        parent.appendChild(child);
    });
    return parent;
}

window.addEventListener('load', solution);