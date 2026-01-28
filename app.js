// Firebase Configuration
// IMPORTANT: Replace with your own Firebase project configuration
// Get this from: Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
    apiKey: "AIzaSyBxxx-REPLACE-WITH-YOUR-KEY-xxxxxxxxxx",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:xxxxxxxxxxxxx"
};

// Storage Keys
const STORAGE_KEY = 'raccoltaSangueData';
const PIN_KEY = 'raccoltaSanguePIN';
const BACKUP_KEY = 'raccoltaSangueLastBackup';
const FIREBASE_ENABLED_KEY = 'raccoltaSangueFirebaseEnabled';

// Default PIN
const DEFAULT_PIN = '000000';

// Firebase variables
let db = null;
let dbRef = null;
let isFirebaseEnabled = false;
let isFirebaseInitialized = false;

// State
let punti = [];
let currentEditId = null;
let tempFoto = [];
let currentPin = '';
let isAuthenticated = false;

// Initialize Firebase
function initializeFirebase() {
    try {
        // Check if Firebase config is set (not default)
        if (firebaseConfig.apiKey && !firebaseConfig.apiKey.includes('REPLACE')) {
            firebase.initializeApp(firebaseConfig);
            db = firebase.database();
            dbRef = db.ref('punti');
            isFirebaseInitialized = true;
            
            // Check if user wants to use Firebase (from settings)
            const firebaseEnabled = localStorage.getItem(FIREBASE_ENABLED_KEY);
            isFirebaseEnabled = firebaseEnabled === 'true';
            
            if (isFirebaseEnabled) {
                setupFirebaseSync();
            }
            
            console.log('Firebase initialized successfully');
        } else {
            console.log('Firebase not configured - using localStorage only');
        }
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        isFirebaseInitialized = false;
        isFirebaseEnabled = false;
    }
}

// Setup Firebase real-time sync
function setupFirebaseSync() {
    if (!isFirebaseInitialized || !isFirebaseEnabled) return;
    
    dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            punti = data;
            // Also save to localStorage as cache
            localStorage.setItem(STORAGE_KEY, JSON.stringify(punti));
            if (isAuthenticated) {
                renderPunti();
            }
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Initialize App
function initializeApp() {
    // Initialize Firebase first
    initializeFirebase();
    
    // Check if PIN exists, if not set default
    if (!localStorage.getItem(PIN_KEY)) {
        localStorage.setItem(PIN_KEY, DEFAULT_PIN);
    }
    
    loadData();
    setupEventListeners();
    showPinScreen();
}

// Show PIN Screen
function showPinScreen() {
    document.getElementById('pinScreen').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
    currentPin = '';
    updatePinDots();
}

// Hide PIN Screen
function hidePinScreen() {
    document.getElementById('pinScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    isAuthenticated = true;
    renderPunti();
    updateSettingsInfo();
}

// Update PIN dots display
function updatePinDots() {
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach((dot, index) => {
        if (index < currentPin.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

// Add PIN digit
function addPinDigit(digit) {
    if (currentPin.length < 6) {
        currentPin += digit;
        updatePinDots();
        
        if (currentPin.length === 6) {
            checkPin();
        }
    }
}

// Delete PIN digit
function deletePinDigit() {
    if (currentPin.length > 0) {
        currentPin = currentPin.slice(0, -1);
        updatePinDots();
        document.getElementById('pinError').textContent = '';
    }
}

// Check PIN
function checkPin() {
    const savedPin = localStorage.getItem(PIN_KEY);
    
    if (currentPin === savedPin) {
        document.getElementById('pinError').textContent = '';
        hidePinScreen();
    } else {
        document.getElementById('pinError').textContent = '❌ PIN errato!';
        setTimeout(() => {
            currentPin = '';
            updatePinDots();
            document.getElementById('pinError').textContent = '';
        }, 1000);
    }
}

// Logout
function logout() {
    isAuthenticated = false;
    currentPin = '';
    showPinScreen();
}

// Load data from localStorage or Firebase
async function loadData() {
    // If Firebase is enabled and initialized, data will come via real-time sync
    // So we just load from localStorage cache first
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        punti = JSON.parse(saved);
    } else if (!isFirebaseEnabled) {
        // Only create demo data if Firebase is not enabled
        // (if Firebase is enabled, we'll wait for sync)
        punti = [
            {
                id: generateId(),
                nome: "Centro Raccolta Milano Nord",
                associazione: "AVIS Milano",
                indirizzo: "Via Example 123, Milano, 20100",
                tipoMezzo: "autoemoteca",
                orarioPartenza: "08:00",
                lettini: 5,
                bilance: 2,
                alimentatori: 3,
                foto: [],
                dataCreazione: new Date().toISOString(),
                dataModifica: new Date().toISOString()
            }
        ];
        saveData();
    }
}

// Save data to localStorage and Firebase
async function saveData() {
    // Always save to localStorage as cache
    localStorage.setItem(STORAGE_KEY, JSON.stringify(punti));
    
    // If Firebase is enabled, save to Firebase
    if (isFirebaseEnabled && isFirebaseInitialized && dbRef) {
        try {
            await dbRef.set(punti);
            console.log('Data saved to Firebase');
        } catch (error) {
            console.error('Error saving to Firebase:', error);
            showNotification('Errore nel salvataggio dati condivisi. Dati salvati solo localmente.', 'error');
        }
    }
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Setup Event Listeners
function setupEventListeners() {
    // Add button
    document.getElementById('addBtn').addEventListener('click', () => {
        openModal();
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        renderPunti(e.target.value);
    });

    // Modal close buttons
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Specific close buttons
    document.getElementById('closeDetail').addEventListener('click', () => {
        document.getElementById('detailModal').style.display = 'none';
    });
    
    document.getElementById('closeSettings').addEventListener('click', () => {
        document.getElementById('settingsModal').style.display = 'none';
    });

    // Cancel buttons
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    document.getElementById('cancelPinChange').addEventListener('click', () => {
        document.getElementById('settingsModal').style.display = 'none';
    });

    // Form submit
    document.getElementById('puntoForm').addEventListener('submit', handleSubmit);

    // Photo upload
    document.getElementById('fotoInput').addEventListener('change', handlePhotoUpload);

    // Export/Import
    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importInput').click();
    });
    document.getElementById('importInput').addEventListener('change', importData);

    // Settings
    document.getElementById('settingsBtn').addEventListener('click', openSettings);
    
    // PIN Change Form
    document.getElementById('pinChangeForm').addEventListener('submit', handlePinChange);

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
}

// Open Settings
function openSettings() {
    updateSettingsInfo();
    document.getElementById('settingsModal').style.display = 'block';
}

// Update Settings Info
function updateSettingsInfo() {
    document.getElementById('totalPunti').textContent = punti.length;
    
    const lastBackup = localStorage.getItem(BACKUP_KEY);
    if (lastBackup) {
        const date = new Date(lastBackup);
        document.getElementById('lastBackup').textContent = date.toLocaleString('it-IT');
    } else {
        document.getElementById('lastBackup').textContent = 'Mai eseguito';
    }
    
    // Update Firebase status
    const checkbox = document.getElementById('firebaseEnabledCheckbox');
    const statusDiv = document.getElementById('firebaseStatus');
    
    if (checkbox) {
        checkbox.checked = isFirebaseEnabled;
    }
    
    if (statusDiv) {
        if (!isFirebaseInitialized) {
            statusDiv.innerHTML = '<p style="color: #ff9800;">⚠️ Firebase non configurato. Segui le istruzioni sotto per configurarlo.</p>';
            statusDiv.style.display = 'block';
        } else if (isFirebaseEnabled) {
            statusDiv.innerHTML = '<p style="color: #4caf50;">✅ Sincronizzazione attiva - I dati sono condivisi con tutti gli utenti</p>';
            statusDiv.style.display = 'block';
        } else {
            statusDiv.innerHTML = '<p style="color: #666;">🔒 Sincronizzazione disabilitata - I dati sono salvati solo localmente</p>';
            statusDiv.style.display = 'block';
        }
    }
}

// Toggle Firebase Sync
function toggleFirebaseSync(enabled) {
    if (!isFirebaseInitialized) {
        showNotification('Firebase non è configurato. Segui le istruzioni nelle impostazioni.', 'error');
        document.getElementById('firebaseEnabledCheckbox').checked = false;
        return;
    }
    
    isFirebaseEnabled = enabled;
    localStorage.setItem(FIREBASE_ENABLED_KEY, enabled.toString());
    
    if (enabled) {
        // Setup real-time sync
        setupFirebaseSync();
        
        // Upload current local data to Firebase
        if (punti.length > 0) {
            if (confirm('Vuoi caricare i dati locali su Firebase per condividerli con tutti gli utenti?')) {
                saveData();
                showNotification('Dati caricati! Ora tutti gli utenti possono vederli.', 'success');
            }
        }
        
        showNotification('Sincronizzazione abilitata! I dati saranno condivisi.', 'success');
    } else {
        // Disable sync
        if (dbRef) {
            dbRef.off(); // Stop listening to changes
        }
        showNotification('Sincronizzazione disabilitata. I dati sono ora solo locali.', 'info');
    }
    
    updateSettingsInfo();
}

// Handle PIN Change
function handlePinChange(e) {
    e.preventDefault();
    
    const oldPin = document.getElementById('oldPin').value;
    const newPin = document.getElementById('newPin').value;
    const confirmPin = document.getElementById('confirmPin').value;
    const savedPin = localStorage.getItem(PIN_KEY);
    
    // Validate old PIN
    if (oldPin !== savedPin) {
        showNotification('PIN attuale errato!', 'error');
        return;
    }
    
    // Validate new PIN format
    if (!/^\d{6}$/.test(newPin)) {
        showNotification('Il nuovo PIN deve essere di 6 cifre!', 'error');
        return;
    }
    
    // Validate confirmation
    if (newPin !== confirmPin) {
        showNotification('I PIN non corrispondono!', 'error');
        return;
    }
    
    // Save new PIN
    localStorage.setItem(PIN_KEY, newPin);
    showNotification('PIN cambiato con successo!', 'success');
    
    // Reset form and close
    document.getElementById('pinChangeForm').reset();
    document.getElementById('settingsModal').style.display = 'none';
}

// Reset App
function resetApp() {
    if (confirm('⚠️ ATTENZIONE!\n\nQuesto eliminerà TUTTI i dati e ripristinerà il PIN predefinito (000000).\n\nSei assolutamente sicuro?')) {
        if (confirm('Ultima conferma: vuoi davvero procedere con il reset completo?')) {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(PIN_KEY);
            localStorage.removeItem(BACKUP_KEY);
            showNotification('App resettata! Ricarica la pagina.', 'success');
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }
}

// Get mezzo icon
function getMezzoIcon(tipo) {
    return tipo === 'furgone' ? '🚐' : '🚑';
}

// Get mezzo label
function getMezzoLabel(tipo) {
    return tipo === 'furgone' ? 'Furgone' : 'Autoemoteca';
}

// Render Punti List
function renderPunti(searchTerm = '') {
    const container = document.getElementById('puntiList');
    const emptyState = document.getElementById('emptyState');
    
    let filtered = punti;
    
    if (searchTerm) {
        filtered = punti.filter(p => 
            p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.associazione.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (filtered.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    emptyState.style.display = 'none';
    
    container.innerHTML = filtered.map(punto => `
        <div class="punto-card">
            <h3>${punto.nome}</h3>
            <div class="associazione">📍 ${punto.associazione}</div>
            
            <div class="indirizzo-container">
                <span class="indirizzo" style="pointer-events: none;">
                    📍 ${punto.indirizzo}
                </span>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(punto.indirizzo)}" 
                   class="btn-indicazioni" 
                   target="_blank" 
                   onclick="event.stopPropagation()">
                    🧭 Indicazioni
                </a>
            </div>
            
            <div class="logistica-info">
                <div class="logistica-item mezzo-${punto.tipoMezzo}">
                    ${getMezzoIcon(punto.tipoMezzo)} ${getMezzoLabel(punto.tipoMezzo)}
                </div>
                <div class="logistica-item orario-partenza">
                    🕐 Partenza: ${punto.orarioPartenza}
                </div>
            </div>
            
            <div class="attrezzature">
                <div class="attrezzatura-item">
                    🛏️ <strong>${punto.lettini}</strong> Lettini
                </div>
                <div class="attrezzatura-item">
                    ⚖️ <strong>${punto.bilance}</strong> Bilance
                </div>
                <div class="attrezzatura-item">
                    🔌 <strong>${punto.alimentatori}</strong> Alimentatori
                </div>
            </div>
            
            ${punto.foto.length > 0 ? `<div style="margin-top:10px; color:#6b7280; font-size:0.9em;">📷 ${punto.foto.length} foto</div>` : ''}
            
            <div class="card-actions">
                <button class="btn btn-info btn-small" onclick="viewDetail('${punto.id}')">👁️ Dettagli</button>
                <button class="btn btn-primary btn-small" onclick="editPunto('${punto.id}')">✏️ Modifica</button>
                <button class="btn btn-danger btn-small" onclick="deletePunto('${punto.id}')">🗑️ Elimina</button>
            </div>
        </div>
    `).join('');
}

// Open Modal
function openModal(editId = null) {
    currentEditId = editId;
    tempFoto = [];
    
    const modal = document.getElementById('modal');
    const form = document.getElementById('puntoForm');
    const title = document.getElementById('modalTitle');
    
    form.reset();
    document.getElementById('fotoPreview').innerHTML = '';
    
    if (editId) {
        title.textContent = 'Modifica Punto di Raccolta';
        const punto = punti.find(p => p.id === editId);
        
        if (punto) {
            document.getElementById('nome').value = punto.nome;
            document.getElementById('associazione').value = punto.associazione;
            document.getElementById('indirizzo').value = punto.indirizzo;
            document.getElementById('tipoMezzo').value = punto.tipoMezzo;
            document.getElementById('orarioPartenza').value = punto.orarioPartenza;
            document.getElementById('lettini').value = punto.lettini;
            document.getElementById('bilance').value = punto.bilance;
            document.getElementById('alimentatori').value = punto.alimentatori;
            
            tempFoto = [...punto.foto];
            renderPhotoPreview();
        }
    } else {
        title.textContent = 'Aggiungi Punto di Raccolta';
    }
    
    modal.style.display = 'block';
}

// Close Modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('detailModal').style.display = 'none';
    document.getElementById('settingsModal').style.display = 'none';
    currentEditId = null;
    tempFoto = [];
}

// Handle Photo Upload
function handlePhotoUpload(e) {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
            tempFoto.push({
                id: generateId(),
                url: event.target.result,
                descrizione: ''
            });
            renderPhotoPreview();
        };
        reader.readAsDataURL(file);
    });
    
    e.target.value = '';
}

// Render Photo Preview
function renderPhotoPreview() {
    const container = document.getElementById('fotoPreview');
    
    container.innerHTML = tempFoto.map((foto, index) => `
        <div class="foto-item">
            <button type="button" class="remove-foto" onclick="removeFoto(${index})">×</button>
            <img src="${foto.url}" alt="Foto ${index + 1}">
            <textarea placeholder="Descrizione: istruzioni montaggio, prese elettriche, posizionamento veicolo..." 
                      onchange="updateFotoDescription(${index}, this.value)">${foto.descrizione}</textarea>
        </div>
    `).join('');
}

// Update Photo Description
function updateFotoDescription(index, description) {
    if (tempFoto[index]) {
        tempFoto[index].descrizione = description;
    }
}

// Remove Photo
function removeFoto(index) {
    tempFoto.splice(index, 1);
    renderPhotoPreview();
}

// Handle Form Submit
function handleSubmit(e) {
    e.preventDefault();
    
    const formData = {
        nome: document.getElementById('nome').value.trim(),
        associazione: document.getElementById('associazione').value.trim(),
        indirizzo: document.getElementById('indirizzo').value.trim(),
        tipoMezzo: document.getElementById('tipoMezzo').value,
        orarioPartenza: document.getElementById('orarioPartenza').value,
        lettini: parseInt(document.getElementById('lettini').value),
        bilance: parseInt(document.getElementById('bilance').value),
        alimentatori: parseInt(document.getElementById('alimentatori').value),
        foto: tempFoto
    };
    
    if (currentEditId) {
        // Update existing
        const index = punti.findIndex(p => p.id === currentEditId);
        punti[index] = {
            ...punti[index],
            ...formData,
            dataModifica: new Date().toISOString()
        };
        showNotification('Punto aggiornato con successo!', 'success');
    } else {
        // Create new
        punti.push({
            id: generateId(),
            ...formData,
            dataCreazione: new Date().toISOString(),
            dataModifica: new Date().toISOString()
        });
        showNotification('Punto aggiunto con successo!', 'success');
    }
    
    saveData();
    renderPunti();
    closeModal();
}

// Edit Punto
function editPunto(id) {
    openModal(id);
}

// Delete Punto
function deletePunto(id) {
    if (confirm('Sei sicuro di voler eliminare questo punto di raccolta?')) {
        punti = punti.filter(p => p.id !== id);
        saveData();
        renderPunti();
        showNotification('Punto eliminato con successo!', 'success');
    }
}

// View Detail
function viewDetail(id) {
    const punto = punti.find(p => p.id === id);
    if (!punto) return;
    
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('detailContent');
    
    content.innerHTML = `
        <div class="detail-header">
            <h2>${punto.nome}</h2>
            <div style="color:#6b7280; font-size:0.95em; margin-top:5px;">
                Creato: ${new Date(punto.dataCreazione).toLocaleDateString('it-IT')} | 
                Ultima modifica: ${new Date(punto.dataModifica).toLocaleDateString('it-IT')}
            </div>
        </div>
        
        <div class="detail-section">
            <h3>📋 Informazioni Base</h3>
            <div class="detail-info">
                <div class="detail-item">
                    <strong>Associazione:</strong>
                    <span>${punto.associazione}</span>
                </div>
                <div class="detail-item">
                    <strong>Indirizzo:</strong>
                    <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                        <span>${punto.indirizzo}</span>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(punto.indirizzo)}" 
                           class="btn-indicazioni" 
                           target="_blank">
                            🧭 Indicazioni
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>🚗 Logistica</h3>
            <div class="detail-info">
                <div class="detail-item">
                    <strong>Tipo Mezzo:</strong>
                    <span class="logistica-item mezzo-${punto.tipoMezzo}">
                        ${getMezzoIcon(punto.tipoMezzo)} ${getMezzoLabel(punto.tipoMezzo)}
                    </span>
                </div>
                <div class="detail-item">
                    <strong>Orario Partenza:</strong>
                    <span class="logistica-item orario-partenza">
                        🕐 ${punto.orarioPartenza}
                    </span>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>🔧 Attrezzature</h3>
            <div class="detail-info">
                <div class="detail-item">
                    <strong>Lettini:</strong>
                    <span>🛏️ ${punto.lettini}</span>
                </div>
                <div class="detail-item">
                    <strong>Bilance:</strong>
                    <span>⚖️ ${punto.bilance}</span>
                </div>
                <div class="detail-item">
                    <strong>Alimentatori:</strong>
                    <span>🔌 ${punto.alimentatori}</span>
                </div>
            </div>
        </div>
        
        ${punto.foto.length > 0 ? `
            <div class="detail-section">
                <h3>📷 Archivio Fotografico (${punto.foto.length})</h3>
                <div class="foto-gallery">
                    ${punto.foto.map((foto, index) => `
                        <div class="gallery-item">
                            <img src="${foto.url}" alt="Foto ${index + 1}">
                            <div class="description">
                                ${foto.descrizione || '<em style="color:#9ca3af;">Nessuna descrizione</em>'}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '<div style="text-align:center; color:#9ca3af; padding:20px;">Nessuna foto disponibile</div>'}
        
        <div class="detail-actions">
            <button class="btn btn-primary" onclick="editPunto('${punto.id}'); document.getElementById('detailModal').style.display='none';">
                ✏️ Modifica
            </button>
            <button class="btn btn-danger" onclick="deletePunto('${punto.id}'); document.getElementById('detailModal').style.display='none';">
                🗑️ Elimina
            </button>
            <button class="btn btn-secondary" onclick="document.getElementById('detailModal').style.display='none';">
                Chiudi
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Export Data
function exportData() {
    const dataStr = JSON.stringify(punti, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `raccolta-sangue-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    // Save backup date
    localStorage.setItem(BACKUP_KEY, new Date().toISOString());
    
    showNotification('Dati esportati con successo!', 'success');
    updateSettingsInfo();
}

// Import Data
function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);
            if (Array.isArray(imported)) {
                if (confirm('Vuoi sostituire i dati esistenti o aggiungerli?\n\nOK = Sostituire\nAnnulla = Aggiungere')) {
                    punti = imported;
                } else {
                    punti = [...punti, ...imported];
                }
                saveData();
                renderPunti();
                showNotification('Dati importati con successo!', 'success');
                updateSettingsInfo();
            } else {
                showNotification('File non valido!', 'error');
            }
        } catch (error) {
            showNotification('Errore durante l\'importazione!', 'error');
        }
    };
    reader.readAsText(file);
    e.target.value = '';
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
