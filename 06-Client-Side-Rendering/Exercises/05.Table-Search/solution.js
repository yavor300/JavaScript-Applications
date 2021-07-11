import {html, render} from '../node_modules/lit-html/lit-html.js';

const rowTemplate = (student, select) => html`
   <tr class=${select ? 'select' : ''}>
      <th>${student.firstName} ${student.lastName}</th>
      <th>${student.email}</th>
      <th>${student.course}</th>
   </tr>
`;

const tbody = document.querySelector('tbody');
const input = document.querySelector('#searchField');

start();

async function start() {
   document.querySelector('#searchBtn').addEventListener('click', () => {
      update(list, input.value);
   })

   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await response.json();
   const list = Object.values(data);
   update(list);
}

function update(list, match = '') {
   const result = list.map(e => rowTemplate(e, compare(e, match)));
   render(result, tbody);
}

function compare(item, match) {
   return Object.values(item).some(v => match && v.toLowerCase().includes(match))
} 