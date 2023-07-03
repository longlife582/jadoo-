const logoutBtn = document.querySelector('.logout')

logoutBtn.addEventListener('click', () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Redirect back to the login page
    window.location.href = 'login.html';
});