const btn = document.querySelector('.btn2');
const password = document.querySelector('.pass');
const email = document.querySelector('.email');
const form = document.querySelector('.card');

btn.addEventListener('click', async (e) => {
  e.preventDefault();

  const user = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const jsonData = await response.json();
      throw new Error(jsonData.error);
    }

    const { token, message } = await response.json();

    // Store the token in localStorage for subsequent requests
    localStorage.setItem('token', token);

    form.reset();

    // Redirect to the home page
    window.location.href = 'home.html';
  } catch (error) {
    alert(error.message);
  }
});
