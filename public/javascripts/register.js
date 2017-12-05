function validateRegistrationForm() {
  var username = document.forms["register"]["username"].value;
  var password = document.forms["register"]["password"].value;
  var confirmPassword = document.forms["register"]["confirmPassword"].value;
  
  if(username == '') {
    alert("Username is empty");
    return false;
  }
  if(password !== confirmPassword) {
    alert("Passwords do not match");
    return false;
  }
  if(password == '') {
    alert("Password is empty");
    return false;
  }
}
