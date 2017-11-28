function validateRegistrationForm() {
  var password = document.forms["register"]["password"].value;
  var confirmPassword = document.forms["register"]["confirmPassword"].value;
  if(password !== confirmPassword) {
    alert("Passwords do not match");
    return false;
  }
  if(password === null) {
    alert("Username is empty");
    return false;
  }
}
