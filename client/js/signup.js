const firstNameInput = document.querySelector("#First");
const lastNameInput = document.querySelector("#Last");
const emailInput = document.querySelector("#gmail");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#change");
const form = document.querySelector(".card");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    alert("Please fill the form correctly.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Your passwords don't match.");
    return;
  }

  const userLog = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLog),
    });

    if (!response.ok) {
      const jsonData = await response.json();
      throw new Error(jsonData.error);
    }

    const jsonData = await response.json();
    alert(jsonData.message);
  } catch (error) {
    alert(error.message);
  }
  

  form.reset()
});
