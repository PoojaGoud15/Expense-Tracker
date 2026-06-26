// ------------------------
// REGISTER USER
// ------------------------

function registerUser() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("Please fill all the fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const user = {
    username: username,
    email: email,
    password: password,
  };

  localStorage.setItem("expenseTrackerUser", JSON.stringify(user));

  alert("Registration Successful!");

  window.location.href = "index.html";
}

// ------------------------
// LOGIN USER
// ------------------------

function loginUser() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;

  const storedUser = JSON.parse(localStorage.getItem("expenseTrackerUser"));

  if (storedUser == null) {
    alert("No account found. Please Sign Up first.");
    return;
  }

  if (username === storedUser.username && password === storedUser.password) {
    // Save logged-in user
    localStorage.setItem("et_currentUser", storedUser.username);

    alert("Login Successful!");

    window.location.href = "Tracker.html";
  } else {
    alert("Invalid Username or Password!");
  }
}


// ------------------------
// LOGOUT USER
// ------------------------

function logoutUser() {

  // Remove current logged-in user
  localStorage.removeItem("et_currentUser");

  alert("Logged out successfully!");

  // Redirect to login page
  window.location.href = "index.html";
}