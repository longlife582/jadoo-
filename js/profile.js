const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

fetch(`http://localhost:5000/user/${userId}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch user information.');
    }
    return response.json();
  })
  .then(data => {
    const Newname = document.getElementById('firstname');
    Newname.innerHTML = `${data.first_name}`;

    const lastname = document.getElementById('lastname');
    lastname.innerHTML = `${data.last_name}`;

    const email = document.getElementById('email');
    email.innerHTML = `${data.email}`;
  })
  .catch(error => {
    console.error(error);
    alert('An error occurred while fetching user info.');
  });
