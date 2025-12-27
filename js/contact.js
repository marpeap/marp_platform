// Function to send auto-reply email to client via EmailJS
async function sendAutoReply(contactData) {
  const config = window.EMAILJS_CONFIG;
  
  // Vérifier que EmailJS est configuré
  if (!config || !config.AUTOREPLY_TEMPLATE_ID || !window.emailjs) {
    console.warn('⚠️ Auto-réponse non configurée ou EmailJS SDK non disponible');
    return { success: false, reason: 'Auto-reply not configured' };
  }
  
  try {
    // Préparer les paramètres du template d'auto-réponse
    const autoReplyParams = {
      from_name: contactData.name,
      from_email: contactData.email, // Destinataire de l'auto-réponse
      message: contactData.message,
      date: new Date().toLocaleString('fr-FR')
    };
    
    // Envoyer l'auto-réponse via EmailJS
    const response = await window.emailjs.send(
      config.SERVICE_ID,
      config.AUTOREPLY_TEMPLATE_ID,
      autoReplyParams,
      config.PUBLIC_KEY
    );
    
    console.log('✅ Auto-réponse envoyée avec succès:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'auto-réponse:', error);
    // Ne pas bloquer le processus si l'auto-réponse échoue
    return { success: false, error: error.message || error };
  }
}

// Function to send email notification via EmailJS
async function sendEmailNotification(contactData) {
  // Vérifier si EmailJS est configuré et disponible
  if (!window.EMAILJS_CONFIG || !window.isEmailJSConfigured || !window.isEmailJSConfigured()) {
    console.warn('⚠️ EmailJS non configuré. Les notifications par email ne seront pas envoyées.');
    console.warn('💡 Pour configurer EmailJS, modifiez js/emailjs-config.js avec vos identifiants.');
    
    // Diagnostic détaillé
    if (window.EMAILJS_CONFIG) {
      console.warn('📋 État de la configuration:');
      console.warn('  - Public Key:', window.EMAILJS_CONFIG.PUBLIC_KEY === 'FDKh_5nUofVZbjniz' ? '✅' : '❌');
      console.warn('  - Service ID:', window.EMAILJS_CONFIG.SERVICE_ID === 'service_gvyrpik' ? '✅' : '❌');
      console.warn('  - Template ID (Notification):', window.EMAILJS_CONFIG.TEMPLATE_ID === 'template_k5lgn2g' ? '✅' : '❌');
      console.warn('  - Template ID (Auto-Reply):', window.EMAILJS_CONFIG.AUTOREPLY_TEMPLATE_ID === 'template_didr2ab' ? '✅' : '❌');
      console.warn('  - EmailJS SDK:', typeof window.emailjs !== 'undefined' ? '✅' : '❌ NON CHARGÉ');
      
      if (window.EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
        console.error('❌ PROBLÈME PRINCIPAL: Template ID non configuré !');
        console.error('💡 Solution: Créez un template dans EmailJS Dashboard et ajoutez le Template ID dans js/emailjs-config.js');
        console.error('💡 Consultez DEBUG_EMAILJS.md pour les instructions détaillées');
      }
    }
    
    return { success: false, reason: 'EmailJS not configured' };
  }
  
  const config = window.EMAILJS_CONFIG;
  
  // Vérifier que window.emailjs est disponible
  if (!window.emailjs || typeof window.emailjs.send !== 'function') {
    console.error('❌ EmailJS SDK non chargé. Vérifiez que le script EmailJS est inclus dans contact.html');
    return { success: false, reason: 'EmailJS SDK not loaded' };
  }
  
  try {
    // Préparer les paramètres du template
    const templateParams = {
      to_email: config.RECIPIENT_EMAIL,
      from_name: contactData.name,
      from_email: contactData.email,
      message: contactData.message,
      reply_to: contactData.email,
      subject: `Nouveau message de contact - ${contactData.name}`,
      date: new Date().toLocaleString('fr-FR')
    };
    
    console.log('📧 Envoi de l\'email de notification...');
    console.log('📋 Paramètres:', {
      serviceId: config.SERVICE_ID,
      templateId: config.TEMPLATE_ID,
      recipientEmail: config.RECIPIENT_EMAIL,
      publicKey: config.PUBLIC_KEY ? '✅ Configurée' : '❌ Manquante'
    });
    
    // Envoyer l'email via EmailJS
    const response = await window.emailjs.send(
      config.SERVICE_ID,
      config.TEMPLATE_ID,
      templateParams,
      config.PUBLIC_KEY
    );
    
    console.log('✅ Email de notification envoyé avec succès:', response);
    console.log('📬 Email envoyé à:', config.RECIPIENT_EMAIL);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    console.error('📋 Détails de l\'erreur:', {
      message: error.message,
      text: error.text,
      status: error.status
    });
    // Ne pas bloquer le processus si l'email échoue
    return { success: false, error: error.message || error };
  }
}

// Contact form validation and submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  // Validation functions
  function validateName(name) {
    if (name.length < 2) {
      return 'Le nom doit contenir au moins 2 caractères';
    }
    if (name.length > 100) {
      return 'Le nom ne peut pas dépasser 100 caractères';
    }
    return '';
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email invalide';
    }
    return '';
  }

  function validateMessage(message) {
    if (message.length < 10) {
      return 'Le message doit contenir au moins 10 caractères';
    }
    if (message.length > 2000) {
      return 'Le message ne peut pas dépasser 2000 caractères';
    }
    return '';
  }

  // Show error
  function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
    const input = document.getElementById(fieldId);
    if (input) {
      input.style.borderColor = '#ef4444';
    }
  }

  // Clear error
  function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }
    const input = document.getElementById(fieldId);
    if (input) {
      input.style.borderColor = '';
    }
  }

  // Modal functionality
  function initModals() {
    const modals = document.querySelectorAll('.modal');
    const triggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.modal-close');

    console.log('🔧 Initialisation des modals:', {
      modals: modals.length,
      triggers: triggers.length,
      closeButtons: closeButtons.length
    });

    // Open modal
    triggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        console.log('🔘 Clic sur trigger:', modalId, 'Modal trouvé:', !!modal);
        if (modal) {
          modal.classList.add('active');
          this.classList.add('active');
          document.body.style.overflow = 'hidden';
          console.log('✅ Modal ouvert:', modalId);
        } else {
          console.error('❌ Modal non trouvé:', modalId);
        }
      });
    });

    // Close modal
    closeButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
          modal.classList.remove('active');
          const trigger = document.querySelector(`[data-modal="${modal.id}"]`);
          if (trigger) trigger.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on backdrop click
    modals.forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.remove('active');
          const trigger = document.querySelector(`[data-modal="${this.id}"]`);
          if (trigger) trigger.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        modals.forEach(modal => {
          if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            const trigger = document.querySelector(`[data-modal="${modal.id}"]`);
            if (trigger) trigger.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      }
    });

    // Handle option selection
    const optionButtons = document.querySelectorAll('.modal-option');
    optionButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        const modal = this.closest('.modal');
        const modalId = modal.id;
        
        // Update hidden input
        let inputId = '';
        let displayId = '';
        
        if (modalId === 'serviceModal') {
          inputId = 'service';
          displayId = 'serviceDisplay';
        } else if (modalId === 'projectTypeModal') {
          inputId = 'projectType';
          displayId = 'projectTypeDisplay';
        } else if (modalId === 'timelineModal') {
          inputId = 'timeline';
          displayId = 'timelineDisplay';
        } else if (modalId === 'budgetModal') {
          inputId = 'budget';
          displayId = 'budgetDisplay';
        }

        if (inputId && displayId) {
          const input = document.getElementById(inputId);
          const display = document.getElementById(displayId);
          
          if (input && display) {
            input.value = value;
            display.textContent = value;
            
            // Update trigger button
            const trigger = document.querySelector(`[data-modal="${modalId}"]`);
            if (trigger) {
              trigger.classList.add('has-value');
              clearError(inputId);
            }
          }
        }

        // Remove selected class from all options
        modal.querySelectorAll('.modal-option').forEach(opt => {
          opt.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        this.classList.add('selected');

        // Close modal after short delay
        setTimeout(() => {
          modal.classList.remove('active');
          const trigger = document.querySelector(`[data-modal="${modalId}"]`);
          if (trigger) trigger.classList.remove('active');
          document.body.style.overflow = '';
        }, 300);
      });
    });
  }

  // Initialiser les modals après un court délai pour s'assurer que le DOM est complètement chargé
  setTimeout(() => {
    initModals();
  }, 100);

  // Real-time validation
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  if (nameInput) {
    nameInput.addEventListener('blur', function() {
      const error = validateName(this.value);
      if (error) {
        showError('name', error);
      } else {
        clearError('name');
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      const error = validateEmail(this.value);
      if (error) {
        showError('email', error);
      } else {
        clearError('email');
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', function() {
      const error = validateMessage(this.value);
      if (error) {
        showError('message', error);
      } else {
        clearError('message');
      }
    });
  }

  // Form submission
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Clear previous errors
    ['name', 'email', 'message'].forEach(field => clearError(field));

    // Get form values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Validate all fields
    let hasError = false;
    const nameError = validateName(name);
    if (nameError) {
      showError('name', nameError);
      hasError = true;
    }

    const emailError = validateEmail(email);
    if (emailError) {
      showError('email', emailError);
      hasError = true;
    }

    if (!projectType) {
      showError('projectType', 'Veuillez sélectionner un type de projet');
      hasError = true;
    }

    if (!budget) {
      showError('budget', 'Veuillez sélectionner une tranche de budget');
      hasError = true;
    }

    if (!timeline) {
      showError('timeline', 'Veuillez sélectionner un délai');
      hasError = true;
    }

    const messageError = validateMessage(message);
    if (messageError) {
      showError('message', messageError);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Disable submit button
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';
    }

    // Prepare contact data
    const contactData = {
      name: name,
      email: email,
      phone: phone,
      service: service,
      projectType: projectType,
      budget: budget,
      timeline: timeline,
      message: message
    };

    // Try to send via Supabase
    const formMessage = document.getElementById('formMessage');
    let success = false;

    // IMPORTANT : Envoyer l'email AVANT d'essayer de sauvegarder dans Supabase
    // Ainsi, l'email sera envoyé même si Supabase échoue
    let emailSent = false;
    let autoReplySent = false;
    
    // Envoyer l'email de notification
    const emailResult = await sendEmailNotification(contactData);
    if (emailResult.success) {
      emailSent = true;
      console.log('✅ Email de notification envoyé avec succès à marpeap@gmail.com');
    } else {
      console.warn('⚠️ L\'email de notification n\'a pas pu être envoyé.');
      console.warn('💡 Raison:', emailResult.reason || emailResult.error);
    }
    
    // Envoyer l'auto-réponse au client
    const autoReplyResult = await sendAutoReply(contactData);
    if (autoReplyResult.success) {
      autoReplySent = true;
      console.log('✅ Auto-réponse envoyée au client');
    } else {
      console.warn('⚠️ L\'auto-réponse n\'a pas pu être envoyée au client.');
    }

    // Maintenant, essayer de sauvegarder dans Supabase (optionnel)
    try {
      // Check if Supabase client is available
      if (typeof window !== 'undefined' && window.supabaseClient) {
        try {
          await window.supabaseClient.insertContact(contactData);
          success = true;
          console.log('✅ Message sauvegardé dans Supabase');
        } catch (supabaseError) {
          console.warn('⚠️ Erreur Supabase (non bloquant):', supabaseError.message);
          console.warn('💡 Le message a été envoyé par email, mais n\'a pas été sauvegardé dans Supabase.');
          console.warn('💡 Pour corriger, exécutez supabase-permissions.sql dans le SQL Editor de Supabase');
          // Continuer même si Supabase échoue
          success = true;
        }
      } else {
        console.warn('Supabase non configuré, utilisation de localStorage comme fallback');
      }
      
      // Fallback to localStorage si Supabase n'est pas configuré ou a échoué
      if (!success) {
        try {
          const contact = {
            id: Date.now().toString(),
            ...contactData,
            created_at: new Date().toISOString()
          };
          let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
          contacts.push(contact);
          localStorage.setItem('contacts', JSON.stringify(contacts));
          success = true;
          console.log('✅ Message sauvegardé dans localStorage');
        } catch (localStorageError) {
          console.error('Erreur localStorage:', localStorageError);
        }
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
      // Même en cas d'erreur, on considère que c'est un succès si l'email a été envoyé
      if (emailSent) {
        success = true;
      }
    }

    // Show success message
    if (success && formMessage) {
      formMessage.textContent = 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
      formMessage.className = 'form-message show success';
    }

    // Reset form
    contactForm.reset();
    
    // Reset modal triggers
    document.querySelectorAll('.modal-trigger').forEach(trigger => {
      trigger.classList.remove('has-value');
      const displayId = trigger.querySelector('span').id;
      if (displayId) {
        const display = document.getElementById(displayId);
        if (display) {
          if (displayId === 'serviceDisplay') display.textContent = 'Sélectionnez un service';
          else if (displayId === 'projectTypeDisplay') display.textContent = 'Sélectionnez un type';
          else if (displayId === 'timelineDisplay') display.textContent = 'Sélectionnez un délai';
          else if (displayId === 'budgetDisplay') display.textContent = 'Sélectionnez une tranche de budget';
        }
      }
    });

    // Re-enable submit button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';
    }

    // Hide message after 5 seconds
    setTimeout(() => {
      if (formMessage) {
        formMessage.classList.remove('show');
      }
    }, 5000);
  });
});

// ============================================
// GESTION DU MODAL DE RENDEZ-VOUS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const appointmentModal = document.getElementById('appointmentModal');
  const btnAppointment = document.getElementById('btnAppointment');
  const btnCancelAppointment = document.getElementById('btnCancelAppointment');
  const appointmentModalClose = document.querySelector('.appointment-modal-close');
  const appointmentModalOverlay = document.querySelector('.appointment-modal-overlay');
  const appointmentForm = document.getElementById('appointmentForm');
  const appointmentDateInput = document.getElementById('appointmentDate');
  const btnSubmitAppointment = document.getElementById('btnSubmitAppointment');

  // Définir la date minimale (aujourd'hui)
  if (appointmentDateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    appointmentDateInput.min = tomorrow.toISOString().split('T')[0];
  }

  // Ouvrir le modal
  if (btnAppointment) {
    btnAppointment.addEventListener('click', function() {
      if (appointmentModal) {
        appointmentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Fermer le modal
  function closeAppointmentModal() {
    if (appointmentModal) {
      appointmentModal.classList.remove('active');
      document.body.style.overflow = '';
      if (appointmentForm) {
        appointmentForm.reset();
        // Clear errors
        document.querySelectorAll('#appointmentForm .error-message').forEach(err => {
          err.textContent = '';
          err.classList.remove('show');
        });
        const appointmentFormMessage = document.getElementById('appointmentFormMessage');
        if (appointmentFormMessage) {
          appointmentFormMessage.textContent = '';
          appointmentFormMessage.classList.remove('show');
        }
      }
    }
  }

  if (btnCancelAppointment) {
    btnCancelAppointment.addEventListener('click', closeAppointmentModal);
  }

  if (appointmentModalClose) {
    appointmentModalClose.addEventListener('click', closeAppointmentModal);
  }

  if (appointmentModalOverlay) {
    appointmentModalOverlay.addEventListener('click', closeAppointmentModal);
  }

  // Fermer avec Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && appointmentModal && appointmentModal.classList.contains('active')) {
      closeAppointmentModal();
    }
  });

  // Empêcher la fermeture en cliquant dans le contenu
  if (appointmentModal) {
    const appointmentModalContent = appointmentModal.querySelector('.appointment-modal-content');
    if (appointmentModalContent) {
      appointmentModalContent.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  }

  // Validation du formulaire de rendez-vous
  function validateAppointmentField(fieldId, value, validator) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const error = validator(value);
    
    if (error) {
      if (errorElement) {
        errorElement.textContent = error;
        errorElement.classList.add('show');
      }
      return false;
    } else {
      if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
      }
      return true;
    }
  }

  function validateAppointmentName(name) {
    if (name.length < 2) return 'Le nom doit contenir au moins 2 caractères';
    if (name.length > 100) return 'Le nom ne peut pas dépasser 100 caractères';
    return '';
  }

  function validateAppointmentEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Email invalide';
    return '';
  }

  function validateAppointmentDate(date) {
    if (!date) return 'Veuillez sélectionner une date';
    const selectedDate = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    if (selectedDate < tomorrow) return 'La date doit être au moins demain';
    return '';
  }

  function validateAppointmentTime(time) {
    if (!time) return 'Veuillez sélectionner une heure';
    return '';
  }

  function validateAppointmentType(type) {
    if (!type) return 'Veuillez sélectionner un type de rendez-vous';
    return '';
  }

  // Soumission du formulaire de rendez-vous
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const appointmentName = document.getElementById('appointmentName').value.trim();
      const appointmentEmail = document.getElementById('appointmentEmail').value.trim();
      const appointmentPhone = document.getElementById('appointmentPhone').value.trim();
      const appointmentDate = document.getElementById('appointmentDate').value;
      const appointmentTime = document.getElementById('appointmentTime').value;
      const appointmentType = document.getElementById('appointmentType').value;
      const appointmentMessage = document.getElementById('appointmentMessage').value.trim();

      // Validation
      let isValid = true;
      isValid = validateAppointmentField('appointmentName', appointmentName, validateAppointmentName) && isValid;
      isValid = validateAppointmentField('appointmentEmail', appointmentEmail, validateAppointmentEmail) && isValid;
      isValid = validateAppointmentField('appointmentDate', appointmentDate, validateAppointmentDate) && isValid;
      isValid = validateAppointmentField('appointmentTime', appointmentTime, validateAppointmentTime) && isValid;
      isValid = validateAppointmentField('appointmentType', appointmentType, validateAppointmentType) && isValid;

      if (!isValid) {
        return;
      }

      // Désactiver le bouton
      if (btnSubmitAppointment) {
        btnSubmitAppointment.disabled = true;
        btnSubmitAppointment.textContent = 'Envoi en cours...';
      }

      const appointmentFormMessage = document.getElementById('appointmentFormMessage');

      try {
        // Préparer les données
        const appointmentData = {
          name: appointmentName,
          email: appointmentEmail,
          phone: appointmentPhone || 'Non renseigné',
          date: appointmentDate,
          time: appointmentTime,
          type: appointmentType,
          message: appointmentMessage || 'Aucun message',
          submittedAt: new Date().toLocaleString('fr-FR')
        };

        // Envoyer via EmailJS (si configuré)
        if (window.EMAILJS_CONFIG && window.emailjs) {
          const templateParams = {
            from_name: appointmentData.name,
            from_email: appointmentData.email,
            phone: appointmentData.phone,
            appointment_date: new Date(appointmentData.date).toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            appointment_time: appointmentData.time,
            appointment_type: appointmentData.type,
            message: appointmentData.message,
            date: appointmentData.submittedAt
          };

          await window.emailjs.send(
            window.EMAILJS_CONFIG.SERVICE_ID,
            window.EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams,
            window.EMAILJS_CONFIG.PUBLIC_KEY
          );
        }

        // Sauvegarder dans Supabase (si configuré)
        if (window.supabase) {
          const { error } = await window.supabase
            .from('appointments')
            .insert([{
              name: appointmentData.name,
              email: appointmentData.email,
              phone: appointmentData.phone,
              appointment_date: appointmentData.date,
              appointment_time: appointmentData.time,
              appointment_type: appointmentData.type,
              message: appointmentData.message,
              created_at: new Date().toISOString()
            }]);

          if (error) {
            console.error('Erreur Supabase:', error);
          }
        }

        // Afficher le message de succès
        if (appointmentFormMessage) {
          appointmentFormMessage.textContent = '✅ Votre demande de rendez-vous a été envoyée avec succès ! Je vous confirmerai rapidement par email.';
          appointmentFormMessage.className = 'form-message show success';
        }

        // Réinitialiser le formulaire
        appointmentForm.reset();
        
        // Fermer le modal après 3 secondes
        setTimeout(() => {
          closeAppointmentModal();
        }, 3000);

      } catch (error) {
        console.error('Erreur lors de l\'envoi de la demande de rendez-vous:', error);
        
        if (appointmentFormMessage) {
          appointmentFormMessage.textContent = '❌ Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.';
          appointmentFormMessage.className = 'form-message show error';
        }
      } finally {
        // Réactiver le bouton
        if (btnSubmitAppointment) {
          btnSubmitAppointment.disabled = false;
          btnSubmitAppointment.textContent = 'Confirmer la réservation';
        }
      }
    });
  }
});

