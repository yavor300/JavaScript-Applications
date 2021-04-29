function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', async () => {
        if (document.getElementById('posts').children.length === 0) {
            const response = await fetch('http://localhost:3030/jsonstore/blog/posts');
            const data = await response.json();
            Object.values(data).forEach(el => {
                const option = createElement('option', el.title);
                option.value = el.id;
                document.getElementById('posts').appendChild(option);
            });
        }
    });

    document.getElementById('btnViewPost').addEventListener('click', async () => {
        const id = document.getElementById('posts').value;
        const [responsePost, responseComments] = await Promise.all(
            [
                fetch(`http://localhost:3030/jsonstore/blog/posts/${id}`),
                fetch('http://localhost:3030/jsonstore/blog/comments')
            ]
        );

        const [dataPost, dataComments] = await Promise.all([
            responsePost.json(),
            responseComments.json()
        ]);

        console.log(dataPost);
        document.getElementById('post-title').textContent = dataPost.title;
        document.getElementById('post-body').textContent = dataPost.body;

        document.getElementById('post-comments').innerHTML = '';
        for (let [key, value] of Object.entries(dataComments)) {
            if (value.postId === id) {
                const li = createElement('li', value.text);
                li.id = key;
                document.getElementById('post-comments')
                    .appendChild(li);
            }
        }
    });


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

attachEvents();