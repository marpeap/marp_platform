// Configuration EmailJS
// IMPORTANT: Remplacez les valeurs ci-dessous par vos identifiants EmailJS
// Obtenez-les sur https://www.emailjs.com/

const EMAILJS_CONFIG = {
  // Public Key EmailJS (trouvable dans Account > API Keys)
  PUBLIC_KEY: 'VOTRE_PUBLIC_KEY_EMAILJS',

  // Service ID EmailJS (trouvable dans Email Services)
  SERVICE_ID: 'VOTRE_SERVICE_ID_EMAILJS',

  // Template ID EmailJS - Notification pour le propriétaire
  TEMPLATE_ID: 'VOTRE_TEMPLATE_ID_NOTIFICATION',

  // Template ID EmailJS - Auto-réponse pour le client
  AUTOREPLY_TEMPLATE_ID: 'VOTRE_TEMPLATE_ID_AUTOREPLY',

  // Email du destinataire
  RECIPIENT_EMAIL: 'votre-email@domaine.com'
};

// Vérifier si EmailJS est configuré
function isEmailJSConfigured() {
  return EMAILJS_CONFIG.PUBLIC_KEY !== 'VOTRE_PUBLIC_KEY_EMAILJS' && // Public Key configurée
         EMAILJS_CONFIG.SERVICE_ID !== 'VOTRE_SERVICE_ID_EMAILJS' && // Service ID configuré
         EMAILJS_CONFIG.TEMPLATE_ID !== 'VOTRE_TEMPLATE_ID_NOTIFICATION' && // Template ID notification configuré
         EMAILJS_CONFIG.AUTOREPLY_TEMPLATE_ID !== 'VOTRE_TEMPLATE_ID_AUTOREPLY' && // Template ID auto-réponse configuré
         typeof window !== 'undefined' &&
         typeof window.emailjs !== 'undefined';
}

// Initialiser EmailJS si configuré
if (typeof window !== 'undefined') {
  // Exporter la configuration immédiatement
  window.EMAILJS_CONFIG = EMAILJS_CONFIG;
  window.isEmailJSConfigured = isEmailJSConfigured;

  // Fonction pour initialiser EmailJS une fois le SDK chargé
  function initEmailJS() {
    if (EMAILJS_CONFIG.PUBLIC_KEY !== 'VOTRE_PUBLIC_KEY_EMAILJS' && typeof window.emailjs !== 'undefined') {
      try {
        window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('✅ EmailJS initialisé avec succès');
        return true;
      } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation EmailJS:', error);
        return false;
      }
    } else {
      if (EMAILJS_CONFIG.PUBLIC_KEY === 'VOTRE_PUBLIC_KEY_EMAILJS') {
        console.warn('⚠️ EmailJS non configuré. Les emails ne seront pas envoyés.');
        console.warn('   Remplacez les valeurs dans js/emailjs-config.js par vos vraies clés.');
      } else if (typeof window.emailjs === 'undefined') {
        console.warn('⚠️ EmailJS SDK non chargé. Vérifiez que le script EmailJS est inclus dans contact.html');
      }
      return false;
    }
  }

  // Essayer d'initialiser immédiatement si le SDK est déjà chargé
  if (typeof window.emailjs !== 'undefined') {
    initEmailJS();
  } else {
    // Attendre que le SDK soit chargé
    window.addEventListener('load', function() {
      if (typeof window.emailjs !== 'undefined') {
        initEmailJS();
      } else {
        // Attendre un peu plus si le SDK n'est pas encore chargé
        setTimeout(function() {
          if (typeof window.emailjs !== 'undefined') {
            initEmailJS();
          } else {
            console.warn('⚠️ EmailJS SDK non chargé après le chargement de la page.');
          }
        }, 1000);
      }
    });
  }
}