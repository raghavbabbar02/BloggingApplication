if (window.localStorage.getItem('refresh_token')) {
    fetch('http://localhost:3000/refresh', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "refresh_token": window.localStorage.getItem('refresh_token')
        }),
    })
    .then(res => res.json())
    .then(token => {
        console.log(token);
        window.localStorage.setItem('refresh_token', token.refresh_token);
        window.localStorage.setItem('access_token', token.access_token);

        console.log('Check local storage');
        window.location.replace('http://localhost:3000/');
    })
    .catch(err => console.log(err.message));
}
else {
    const submitButton = document.getElementById('submit');

    async function login() {
        const inputEl = document.getElementById('email');
        const passEl = document.getElementById('password');

        const email = inputEl.value;
        const password = passEl.value;

        await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => res.json())
        .then(tokens => {
            window.localStorage.setItem('refresh_token', tokens.refresh_token);
            window.localStorage.setItem('access_token', tokens.access_token);
            console.log('Saved to localstorage successfully');
            window.location.replace('http://localhost:3000/');
            console.log(tokens);
        })
        .catch(err => console.log(err.message));
    }

    submitButton.addEventListener('click', login);
}


