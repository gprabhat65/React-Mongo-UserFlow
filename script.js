document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const responseMessage = document.getElementById('responseMessage');

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            responseMessage.style.color = 'green';
            responseMessage.textContent = data.message;
        } else {
            responseMessage.style.color = 'red';
            responseMessage.textContent = data.message || 'Registration failed!';
        }
    } catch (error) {
        console.error('Error:', error);
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'Server error. Please try again later.';
    }
});
