// Client Supabase pour JavaScript vanilla
// IMPORTANT: Remplacez les valeurs ci-dessous par vos vraies configurations Supabase
const SUPABASE_URL = 'VOTRE_URL_SUPABASE';
const SUPABASE_ANON_KEY = 'VOTRE_CLE_ANONYME_SUPABASE';

// Fonction pour créer le client Supabase
function createSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY ||
      SUPABASE_URL === 'VOTRE_URL_SUPABASE' ||
      SUPABASE_ANON_KEY === 'VOTRE_CLE_ANONYME_SUPABASE') {
    console.warn('⚠️ Supabase n\'est pas configuré. Remplacez SUPABASE_URL et SUPABASE_ANON_KEY dans js/supabase-client.js');
    console.warn('   Obtenez ces valeurs sur https://supabase.com/dashboard/project/_/settings/api');
    return null;
  }

  // Utilisation de l'API REST de Supabase directement
  return {
    url: SUPABASE_URL,
    key: SUPABASE_ANON_KEY,

    // Fonction pour insérer un contact
    async insertContact(contactData) {
      try {
        const response = await fetch(`${this.url}/rest/v1/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.key,
            'Authorization': `Bearer ${this.key}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone,
            service: contactData.service || null,
            project_type: contactData.projectType || null,
            budget: contactData.budget || null,
            timeline: contactData.timeline || null,
            message: contactData.message
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
        }

        return { success: true };
      } catch (error) {
        console.error('Erreur Supabase:', error);
        throw error;
      }
    }
  };
}

// Export pour utilisation dans d'autres fichiers
if (typeof window !== 'undefined') {
  window.supabaseClient = createSupabaseClient();

  // Vérifier l'initialisation
  if (window.supabaseClient) {
    console.log('✅ Supabase client initialisé avec succès');
  } else {
    console.warn('⚠️ Supabase client non initialisé. Configurez SUPABASE_URL et SUPABASE_ANON_KEY dans js/supabase-client.js');
  }
}