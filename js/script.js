document.addEventListener('DOMContentLoaded', function () {
  // Mobile Navigation Toggle
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener('click', function () {
      mainNav.classList.toggle('active');
      // Accessibility: Toggle aria-expanded attribute
      const isExpanded = mainNav.classList.contains('active');
      mobileNavToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Active Navigation Link Styling
  const currentLocation = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.main-nav ul li a');

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (
      linkPage === currentLocation ||
      (currentLocation === '' && linkPage === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      let isValid = true;
      clearErrors();

      // Name validation
      const name = document.getElementById('name');
      if (name.value.trim() === '') {
        showError(name, 'Name is required.');
        isValid = false;
      }

      // Email validation
      const email = document.getElementById('email');
      if (email.value.trim() === '') {
        showError(email, 'Email is required.');
        isValid = false;
      } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address.');
        isValid = false;
      }

      // Phone validation (optional, but if filled, basic check)
      const phone = document.getElementById('phone');
      if (phone.value.trim() !== '' && !isValidPhone(phone.value.trim())) {
        showError(phone, 'Please enter a valid phone number.');
        isValid = false;
      }

      // Message validation
      const message = document.getElementById('message');
      if (message.value.trim() === '') {
        showError(message, 'Message is required.');
        isValid = false;
      }

      if (!isValid) {
        event.preventDefault(); // Prevent form submission if validation fails
      } else {
        // Optional: Add code here to handle form submission via AJAX
        // For this example, we'll let the default form action proceed
        // Or display a success message
        // alert('Form submitted successfully!');
      }
    });
  }

  function showError(inputElement, message) {
    const formGroup = inputElement.parentElement;
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
    inputElement.classList.add('input-error'); // Optional: add class to highlight input
  }

  function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((error) => error.remove());

    const inputErrors = document.querySelectorAll('.input-error');
    inputErrors.forEach((input) => input.classList.remove('input-error'));
  }

  function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    // Basic phone validation regex (allows for numbers, spaces, hyphens, parentheses)
    // Adjust for specific US or international formats if needed
    const phoneRegex = /^[0-9\s\-\(\)]{7,15}$/;
    return phoneRegex.test(phone);
  }
});
