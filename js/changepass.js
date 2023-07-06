const btn = document.querySelector('.btn');
const password = document.querySelector('#password');
const email = document.querySelector('#gmail');
const form = document.querySelector('.card');
const changes = document.querySelector('#change');
const message = document.querySelector('.message')

const apiUrl = 'http://localhost:5000/changepassword';

btn.addEventListener('click', async (e) => {
  e.preventDefault();

  const change = {
    email: email.value,
    newPassword: password.value,
  };

  if (changes.value !== password.value) {
    message.textContent = "password do not match"
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(change),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    // alert(data.message);
    message.textContent = data.message
    form.reset();
  } catch (error) {
    // alert('An error occurred while changing the password');
    message.textContent= error.message
    
    // console.error(error);

  }
});
