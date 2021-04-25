function loadRepos() {
	const reposUl = document.querySelector('#repos');
	reposUl.innerHTML = '';

	const username = document.querySelector('#username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(response => {
			if (response.status === 404) {
				throw new Error('User not found')
			}
			return response.json()
		})
		.then(repos => {
			console.log(repos);
			repos.forEach(repo => {
				const li = document.createElement('li')
				const a = document.createElement('a')
				a.textContent = repo.full_name;
				a.href = `${repo.html_url}`;

				li.appendChild(a);
				reposUl.appendChild(li);
			});
		})
		.catch(error => {
			console.log(error.message)
		})
}