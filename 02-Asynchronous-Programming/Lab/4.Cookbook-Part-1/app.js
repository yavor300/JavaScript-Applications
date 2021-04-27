window.addEventListener('load', async () => {
   const main = document.querySelector('main');
   main.innerHTML = '';

   const recipes = await getRecipes();
   console.log(recipes);
    renderRecipes(recipes);
});

async function getRecipes() {
    const response = await fetch(`http://localhost:3030/jsonstore/cookbook/recipes`);
    const data = await response.json();
    return Object.values(data);
}

async function getDetailsById(id) {
    const response = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`)
    const data = await response.json();
    return data;
}

async function renderDetails(id, recipeArtice) {
    const details = await getDetailsById((id));
    console.log(details)

    const article = createElement('article', '');
    const h2 = createElement('h2', 'Title');
    appendElements(article, h2);

    const divBand = createElement('div')
    divBand.classList.add('band');

    const divThumb = createElement('div', '');
    divThumb.classList.add('thumb');

    const img = createElement('img', '');
    img.src = details.img;

    appendElements(divThumb, img);
    appendElements(divBand, divThumb);

    const divIngredients = createElement('div')
    divIngredients.classList.add('ingredients');
    const h3 = createElement('h3', 'Ingredients:');
    const ul = createElement('ul', '');
    details.ingredients.forEach(ingr => {
        const li = createElement('li', ingr);
        appendElements(ul, li);
    });
    appendElements(divIngredients, h3, ul);
    appendElements(divBand, divIngredients);
    appendElements(article, divBand);

    const divDescription = createElement('div', '');
    divDescription.classList.add('description');
    const h3Prep = createElement('h3', 'Preparation:');
    appendElements(divDescription, h3Prep);
    details.steps.forEach(step => {
       const p = createElement('p', step);
       appendElements(divDescription, p);
    });

    appendElements(article, divDescription);

    recipeArtice.replaceWith(article);


    // <article>
    //     <h2>Title</h2>
    //     <div class="band">
    //         className <div class="thumb">
    //         className <img src="assets/lasagna.jpg">
    //     </div>
    //         <div class="ingredients">
    //             className <h3>Ingredients:</h3>
    //             <ul>
    //                 <li>Ingredient 1</li>
    //                 <li>Ingredient 2</li>
    //                 <li>Ingredient 3</li>
    //                 <li>Ingredient 4</li>
    //             </ul>
    //         </div>
    //     </div>
    //     <div class="description">
    //         className <h3>Preparation:</h3>
    //         <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, quaerat.</p>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur officia ipsam nulla vitae nobis
    //             reprehenderit pariatur aut dolor exercitationem impedit.</p>
    //         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dolorem odit officiis numquam
    //             corrupti? Quam.</p>
    //     </div>
    // </article>
}

function renderRecipes(recipes) {
    recipes.forEach(r => {
        const article = createElement('article');
        article.addEventListener('click', () => renderDetails(r._id, article));
        article.className = 'preview';
        const divTitle = createElement('div', '');
        divTitle.classList.add('title');
        const h2 = createElement('h2', r.name);
        const divSmall = createElement('div', '');
        divSmall.className = 'small';
        const img = createElement('img', '');
        img.src = `${r.img}`;

        appendElements(divTitle, h2);
        appendElements(divSmall, img);
        appendElements(article, divTitle, divSmall);
        appendElements(document.querySelector('main'), article);
    });
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

