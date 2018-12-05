// Listen on submit
document
  .getElementById('loan-form')
  .addEventListener('submit', calculateResults);

// Calculate Results
function calculateResults(e) {
  // UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterests = document.getElementById('total-interests');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Compute montly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterests.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );
  } else {
    showError('Please check your numbers');
  }

  e.preventDefault();
}

function showError(error) {
  // Create a div
  const errorDiv = document.createElement('div');
  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Add class
  errorDiv.className = 'alert alert-danger dis';
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error above heading
  card.insertBefore(errorDiv, heading);
  // Clear error after 3 secods
  setTimeout(clearError, 4000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
