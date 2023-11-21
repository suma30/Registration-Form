// Function to load all saved data from web storage
function loadAllSavedData() {
  const allUserData = JSON.parse(localStorage.getItem('allUserData'));

  if (allUserData && allUserData.length > 0) {
    const userDataContainer = document.getElementById('userData');
    userDataContainer.innerHTML = `
      <h2>User Data:</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Dob</th>
          <th>Accepted terms?</th>
        </tr>
        ${allUserData.map(user => `
          <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.terms ? 'Yes' : 'No'}</td>
          </tr>`).join('')}
      </table>
    `;
  }
}

// Function to submit the form
function submitForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const termsChecked = document.getElementById('terms').checked;

  // Additional validation for date of birth
  const dobDate = new Date(dob);
  const currentDate = new Date();
  const minDobDate = new Date(currentDate.getFullYear() - 55, currentDate.getMonth(), currentDate.getDate());
  const maxDobDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

  if (name && isValidEmail(email) && password && dob && termsChecked && dobDate >= minDobDate && dobDate <= maxDobDate) {
    const userData = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      terms: termsChecked
    };

    // Load existing data from storage
    const allUserData = JSON.parse(localStorage.getItem('allUserData')) || [];

    // Add new user data
    allUserData.push(userData);

    // Save all user data to web storage
    localStorage.setItem('allUserData', JSON.stringify(allUserData));

    // Load all saved data
    loadAllSavedData();
  } else {
    alert('Please fill in all details, accept the Terms and Conditions, provide a valid Email, and enter a Date of Birth between 18 and 55 years old.');
  }
}

// Email validation function
function isValidEmail(email) {
  // Use a simple email validation regex for demonstration
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Load all saved data on page load
loadAllSavedData();
