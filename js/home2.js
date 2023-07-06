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
    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = `<p>Hi, ${data.first_name} ${data.last_name}!</p>`;
  })
  .catch(error => {
    console.error(error);
    alert('An error occurred while fetching user information.');
  });
