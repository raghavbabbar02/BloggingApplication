if (window.localStorage.getItem('refresh_token')) {
    let refresh_token = window.localStorage.getItem('refresh_token');
    fetch('http://localhost:3000/refresh', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "refresh_token": refresh_token
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

    async function register() {
        const nameEl = document.getElementById('name');
        const emailEl = document.getElementById('email');
        const passEl = document.getElementById('password');
        const cPassEl = document.getElementById('confirm_password');

        const name = nameEl.value;
        const email = emailEl.value;
        const password = passEl.value;
        const confirm_password = cPassEl.value;

        // console.log('name', name, 'email', email, 'password', password, 'confirm', cPass);

        const tokens = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                confirm_password
            }),
        })
        .then(res => res.json())
        .then(token => {
            window.localStorage.setItem('access_token', token.access_token);
            window.localStorage.setItem('refresh_token', token.refresh_token);

            console.log('Check local storage');
            window.location.replace("http://localhost:3000/");
        })
        .catch(err => console.log(err.message));
    }

    submitButton.addEventListener('click', register);
}
