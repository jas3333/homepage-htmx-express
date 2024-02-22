const login = async () => {
    const loginForm = document.getElementById('login');
    console.log(loginForm);

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = await response.json();

                localStorage.setItem('jwtToken', data.token);
                window.location.href = `${data.url}`;
            }
        } catch (error) {
            console.log('Error occured');
            window.location.href = '/login';
        }
    });
};

const load = async () => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
        try {
            const response = await fetch('/auth/checkauth', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                window.location.href = `${data.url}?token=${jwtToken}`;
            }
        } catch (error) {
            console.log(error);
            localStorage.removeItem('jwtToken');
            window.location.href = '/login';
        }
    } else {
        login();
    }
};

load();
