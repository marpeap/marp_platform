// Admin functionality with localStorage
document.addEventListener('DOMContentLoaded', function() {
  const ADMIN_USERNAME = 'Marpeap';
  const ADMIN_PASSWORD = 'MySiteIsDirty'; // In production, use environment variable or more secure method

  const loginScreen = document.getElementById('loginScreen');
  const adminContent = document.getElementById('adminContent');
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');

  // Check if user is logged in
  function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
      showAdminContent();
    } else {
      showLoginScreen();
    }
  }

  function showLoginScreen() {
    if (loginScreen) loginScreen.style.display = 'flex';
    if (adminContent) adminContent.style.display = 'none';
  }

  function showAdminContent() {
    if (loginScreen) loginScreen.style.display = 'none';
    if (adminContent) adminContent.style.display = 'block';
    loadDashboard();
    loadClients();
  }

  // Login form
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const loginMessage = document.getElementById('loginMessage');

      // Clear previous errors
      ['loginEmail', 'loginPassword'].forEach(id => {
        const errorEl = document.getElementById(id + 'Error');
        if (errorEl) errorEl.classList.remove('show');
      });

      // Validate
      if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        if (loginMessage) {
          loginMessage.textContent = 'Nom d\'utilisateur ou mot de passe incorrect';
          loginMessage.className = 'form-message show error';
        }
        return;
      }

      // Login successful
      localStorage.setItem('adminLoggedIn', 'true');
      showAdminContent();
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('adminLoggedIn');
      showLoginScreen();
      if (loginForm) loginForm.reset();
    });
  }

  // Load dashboard data
  function loadDashboard() {
    // Load contacts count
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const contactsCount = document.getElementById('contactsCount');
    if (contactsCount) {
      contactsCount.textContent = contacts.length;
    }

    // Load clients count
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const clientsCount = document.getElementById('clientsCount');
    if (clientsCount) {
      clientsCount.textContent = clients.length;
    }

    // Load recent contacts
    const recentContacts = document.getElementById('recentContacts');
    if (recentContacts) {
      if (contacts.length === 0) {
        recentContacts.innerHTML = '<p class="empty-message">Aucun message pour le moment</p>';
      } else {
        const recent = contacts.slice(-5).reverse();
        recentContacts.innerHTML = recent.map(contact => `
          <div class="contact-item">
            <div class="contact-item-header">
              <span class="contact-item-name">${escapeHtml(contact.name)}</span>
              <span class="contact-item-email">${escapeHtml(contact.email)}</span>
            </div>
            <div class="contact-item-meta">
              <span class="contact-badge">${escapeHtml(contact.service || 'N/A')}</span>
              <span class="contact-badge">${escapeHtml(contact.projectType || 'N/A')}</span>
              <span class="contact-badge">${escapeHtml(contact.budget || 'N/A')}</span>
            </div>
            <p class="contact-item-message">${escapeHtml(contact.message)}</p>
            <p class="contact-item-date">${formatDate(contact.created_at)}</p>
          </div>
        `).join('');
      }
    }
  }

  // Load clients
  function loadClients() {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const clientsListCount = document.getElementById('clientsListCount');
    const clientsTableBody = document.getElementById('clientsTableBody');

    if (clientsListCount) {
      clientsListCount.textContent = clients.length;
    }

    if (clientsTableBody) {
      if (clients.length === 0) {
        clientsTableBody.innerHTML = '<tr><td colspan="5" class="empty-message">Aucun client pour le moment</td></tr>';
      } else {
        clientsTableBody.innerHTML = clients.map(client => `
          <tr>
            <td>${escapeHtml(client.name)}</td>
            <td>${escapeHtml(client.email)}</td>
            <td>
              <span class="status-badge ${client.status || 'active'}">
                ${client.status === 'active' ? 'Actif' : 'Inactif'}
              </span>
            </td>
            <td>${formatDate(client.created_at)}</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-outline btn-sm" onclick="toggleClientStatus('${client.id}')">
                  ${client.status === 'active' ? 'Désactiver' : 'Activer'}
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteClient('${client.id}')">
                  Supprimer
                </button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }
  }

  // Client form
  const clientForm = document.getElementById('clientForm');
  if (clientForm) {
    clientForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const email = document.getElementById('clientEmail').value.trim();
      const clientMessage = document.getElementById('clientMessage');

      // Validate
      if (name.length < 2) {
        if (clientMessage) {
          clientMessage.textContent = 'Le nom doit contenir au moins 2 caractères';
          clientMessage.className = 'form-message show error';
        }
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (clientMessage) {
          clientMessage.textContent = 'Email invalide';
          clientMessage.className = 'form-message show error';
        }
        return;
      }

      // Check if email already exists
      const clients = JSON.parse(localStorage.getItem('clients') || '[]');
      if (clients.some(c => c.email === email)) {
        if (clientMessage) {
          clientMessage.textContent = 'Un client avec cet email existe déjà';
          clientMessage.className = 'form-message show error';
        }
        return;
      }

      // Create client
      const client = {
        id: Date.now().toString(),
        name: name,
        email: email,
        status: 'active',
        created_at: new Date().toISOString()
      };

      clients.push(client);
      localStorage.setItem('clients', JSON.stringify(clients));

      // Show success
      if (clientMessage) {
        clientMessage.textContent = 'Client créé avec succès !';
        clientMessage.className = 'form-message show success';
      }

      // Reset form
      clientForm.reset();

      // Reload clients list
      loadClients();

      // Clear message after 3 seconds
      setTimeout(() => {
        if (clientMessage) {
          clientMessage.classList.remove('show');
        }
      }, 3000);
    });
  }

  // Toggle client status
  window.toggleClientStatus = function(clientId) {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const client = clients.find(c => c.id === clientId);
    if (client) {
      client.status = client.status === 'active' ? 'inactive' : 'active';
      localStorage.setItem('clients', JSON.stringify(clients));
      loadClients();
    }
  };

  // Delete client
  window.deleteClient = function(clientId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      return;
    }
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const filtered = clients.filter(c => c.id !== clientId);
    localStorage.setItem('clients', JSON.stringify(filtered));
    loadClients();
  };

  // Utility functions
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize
  checkAuth();
});

