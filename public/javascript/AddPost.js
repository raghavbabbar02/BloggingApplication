if(window.localStorage.getItem('refresh_token')) {
    const titleInputEl = document.getElementById('title');
    // const textAreaEl = document.getElementById('my-expressjs-tinymce-app');
    const saveButtonEl = document.getElementById('savePost');

    async function savePost() {
        const title = titleInputEl.value;
        const content = tinyMCE.get('mce_0').getContent();
        // console.log('Data', { title, content, author });

        const refresh_token = window.localStorage.getItem('refresh_token');

        const response = await fetch('http://localhost:3000/createPost', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            },
            body: JSON.stringify({
                title,
                content,
            }),
        }).then(res => res.json)
        .then(json => console.log(json))
        .catch(err => console.log(err));
    }

    saveButtonEl.addEventListener('click', savePost);
}
else {
    window.location.replace('http://localhost:3000/login');
}


