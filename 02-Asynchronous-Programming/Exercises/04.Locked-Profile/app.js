async function lockedProfile() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const data = await response.json();
    generateProfileCard(Object.values(data));

    document.querySelector('#main').addEventListener('click', (ev) => {
        if (ev.target.tagName === 'BUTTON') {
            const button = ev.target;
            const inputUnlocked = Array.from(ev.target.parentNode.children)[4];

            if (button.textContent === 'Show more') {
                if (inputUnlocked.checked === true) {
                    ev.target.previousElementSibling.style.display = 'block';
                    button.textContent = 'Hide it';
                }
            } else {
                if (inputUnlocked.checked === true) {
                    ev.target.previousElementSibling.style.display = 'none';
                    button.textContent = 'Show more';
                }
            }
        }
    });
    
    function generateProfileCard(data) {
        document.querySelector('#main').innerHTML = '';

        data.forEach((user, index) => {
            const divProfile = createElement('div', '');
            divProfile.classList.add('profile');
            const img = createElement('img', '');
            img.src = './iconProfile2.png';
            img.classList.add('userIcon');
            const labelLock = createElement('label', 'Lock');
            const inputLock = createElement('input', '');
            inputLock.type = 'radio';
            inputLock.name = `user${index + 1}Locked`;
            inputLock.value = 'lock';
            inputLock.checked = true;
            const labelUnlock = createElement('label', 'Unlock');
            const inputUnlock = createElement('input', '');
            inputUnlock.type = 'radio';
            inputUnlock.name = `user${index + 1}Locked`;
            inputUnlock.value = 'unlock';
            const br = createElement('br', '');
            const hr = createElement('hr', '');
            const labelUsername = createElement('label', 'Username');
            const inputUsername = createElement('input', '');
            inputUsername.type = 'text';
            inputUsername.name = `user${index + 1}Username`;
            inputUsername.value = user.username;
            inputUsername.disabled = true;
            inputUsername.readOnly = true;
            const divHiddenFields = createElement('div', '');
            divHiddenFields.id = `user${index + 1}HiddenFields`;
            const labelEmail = createElement('label', 'Email:');
            const inputEmail = createElement('input', '');
            inputEmail.type = 'email';
            inputEmail.name = `user${index + 1}Email`;
            inputEmail.value = user.email;
            inputEmail.disabled = true;
            inputEmail.readOnly = true;
            const labelAge = createElement('label', 'Age:');
            const inputAge = createElement('input', '');
            inputAge.type = 'number';
            inputAge.name = `user${index + 1}Age`;
            inputAge.value = user.age;
            inputAge.disabled = true;
            inputAge.readOnly = true;
            const button = createElement('button', 'Show more');

            appendElements(divHiddenFields, hr, labelEmail, inputEmail, labelAge, inputAge);
            const profile = appendElements(divProfile, img, labelLock, inputLock, labelUnlock, inputUnlock,br, hr, labelUsername, inputUsername, divHiddenFields, button);
            document.querySelector('#main').appendChild(profile);
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
}