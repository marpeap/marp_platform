/**
 * MARPEAP DIGITALS - Contact Form with EmailJS
 * Template ID: template_k5lgn2g
 */

(function() {
  'use strict';

  // EmailJS Configuration
  const EMAILJS_PUBLIC_KEY = 'FDKh_5nUofVZbjniz';
  const EMAILJS_SERVICE_ID = 'default_service'; // Service par défaut EmailJS
  const EMAILJS_TEMPLATE_ID = 'template_k5lgn2g';

  // Initialize EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);

  // Form elements
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');

  // Form validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateForm(formData) {
    let isValid = true;
    const errors = {};

    // Validate name
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Le nom doit contenir au moins 2 caractères';
      isValid = false;
    }

    // Validate email
    if (!formData.email || !validateEmail(formData.email)) {
      errors.email = 'Veuillez entrer une adresse email valide';
      isValid = false;
    }

    // Validate message
    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères';
      isValid = false;
    }

    return { isValid, errors };
  }

  function showError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
      el.textContent = '';
      el.style.display = 'none';
    });
  }

  function showFormMessage(message, type = 'success') {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }

  function setButtonLoading(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Envoi en cours...';
    } else {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Envoyer le message';
    }
  }

  // Handle form submission
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    formMessage.style.display = 'none';

    // Get form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    // Validate form
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
      // Show errors
      Object.keys(validation.errors).forEach(field => {
        showError(field, validation.errors[field]);
      });
      return;
    }

    // Set loading state
    setButtonLoading(true);

    try {
      // Send email via EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Marpeap Digitals',
          reply_to: formData.email
        }
      );

      console.log('EmailJS Response:', response);

      // Show success message
      showFormMessage('✅ Message envoyé avec succès ! Je vous répondrai sous 24h.', 'success');
      
      // Reset form
      contactForm.reset();

      // Track event (Google Analytics)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          'event_category': 'Contact',
          'event_label': 'Contact Form Submission'
        });
      }

    } catch (error) {
      console.error('EmailJS Error:', error);
      
      // Show error message
      showFormMessage('❌ Une erreur est survenue. Veuillez réessayer ou me contacter directement par téléphone.', 'error');
      
      // Track error
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_error', {
          'event_category': 'Contact',
          'event_label': 'Contact Form Error',
          'value': error.text || error.message
        });
      }
    } finally {
      // Reset button state
      setButtonLoading(false);
    }
  });

  // Real-time validation
  document.getElementById('email').addEventListener('blur', function() {
    const email = this.value.trim();
    if (email && !validateEmail(email)) {
      showError('email', 'Adresse email invalide');
    } else {
      document.getElementById('emailError').style.display = 'none';
    }
  });

  document.getElementById('name').addEventListener('blur', function() {
    const name = this.value.trim();
    if (name && name.length < 2) {
      showError('name', 'Le nom doit contenir au moins 2 caractères');
    } else {
      document.getElementById('nameError').style.display = 'none';
    }
  });

  document.getElementById('message').addEventListener('blur', function() {
    const message = this.value.trim();
    if (message && message.length < 10) {
      showError('message', 'Le message doit contenir au moins 10 caractères');
    } else {
      document.getElementById('messageError').style.display = 'none';
    }
  });

  console.log('✅ Contact form EmailJS initialized');

})();
