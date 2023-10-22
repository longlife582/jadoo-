const btn = document.querySelector(".btn2");
const password = document.querySelector(".pass");
const email = document.querySelector(".email");
const form = document.querySelector(".card");
const message = document.querySelector(".message");
const btn5 = document.querySelector(".btn4");

btn.addEventListener("click", async (e) => {
  e.preventDefault();

  spain();

  const user = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const jsonData = await response.json();
      throw new Error(jsonData.error);
    }

    const { id, token, message } = await response.json();

    // Store the token and user ID in localStorage for subsequent requests
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);

    form.reset();

    // Redirect to the home page
    window.location.href = "home.html";
  } catch (error) {
    message.textContent = error.message;
  }
});

form.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    btn.click();
  }
});

const spain = () => {
  const btn6 = document.querySelector(".btn3");
  btn6.classList.add("spin");

  btn5.classList.add("spin2");

  setTimeout(() => {
    btn5.classList.remove("spin2");
    btn6.classList.remove("spin");
  }, 2000);
};
