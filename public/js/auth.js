const authCheck = async () => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
        try {
            const response = await fetch('/editor', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.log(error);
            localStorage.removeItem('jwtToken');
            window.location.href = '/login';
        }
    } else {
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
    }
};

authCheck();
