// Retrieve the token and user ID from localStorage
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

// Get references to the userInfo element and the div element
const userInfo = document.querySelector('#userInfo');
const div = document.querySelector('.div');

// Add a click event listener to the userInfo element
userInfo.addEventListener('click', () => {
  // Toggle the 'hidden' class on the div element
  div.classList.toggle('hidden');
});

// Fetch user information from the server using the user ID and token
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
    // Update the innerHTML of the userInfoDiv with the user's first name, last name, and an icon
    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML += `<p>Hi, ${data.first_name} ${data.last_name}!</p>`;
  })
  .catch(error => {
    console.error(error);
    alert('An error occurred while fetching user information.');
  });

// Fetch additional user information from the server using the user ID and token
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
    // Update the innerHTML of the respective elements with the user's first name, last name, and email
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
