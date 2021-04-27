async function loadCommits() {
    const commitsUl = document.querySelector('#commits');
    commitsUl.innerHTML = '';

    const username = document.querySelector('#username').value;
    const repository = document.querySelector('#repo').value;
    const url = `https://api.github.com/repos/${username}/${repository}/commits`;

    const response = await fetch(url);
    try {
        if (response.status === 404) {
            throw new Error('Error occurred!');
        }
    } catch (err) {
        const li = document.createElement('li')
        li.textContent = 'Error: 404 (Not Found)';
        commitsUl.appendChild(li);
        return;
    }

    const data = await response.json();
    data.forEach(element => {
        const fullName = element.commit.author.name;
        const message = element.commit.message;

        const li = document.createElement('li')
        li.textContent = `${fullName}: ${message}`;
        commitsUl.appendChild(li);
    });
    console.log(data);

    // fetch(url)
    //     .then(response => {
    //         if (response.status === 404) {
    //             throw new Error('User not found')
    //         }
    //         return response.json()
    //     })
    //     .then(repos => {
    //         console.log(repos);
    //         repos.forEach(repo => {
    //             const li = document.createElement('li')
    //             const a = document.createElement('a')
    //             a.textContent = repo.full_name;
    //             a.href = `${repo.html_url}`;
    //
    //             li.appendChild(a);
    //             reposUl.appendChild(li);
    //         });
    //     })
    //     .catch(error => {
    //         console.log(error.message)
    //     })
}