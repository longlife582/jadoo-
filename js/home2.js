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
      throw new Error('server is down');
    }
    return response.json();
  })
  .then(data => {
    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML += `<p>Hi, ${data.first_name} ${data.last_name}!</p>`;
    // userInfoDiv.innerHTML = `<img src="./images/arrow_drop_down_FILL0_wght400_GRAD0_opsz48.svg" alt="">`

  })
  .catch(error => {
    console.error(error);
    alert('server is down');
  });
