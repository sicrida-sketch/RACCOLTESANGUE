// Storage Key
const STORAGE_KEY = 'raccoltaSangueData';

// State
let punti = [];
let currentEditId = null;
let tempFoto = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderPunti();
    setupEventListeners();
});

// Load data from localStorage
function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        punti = JSON.parse(saved);
    } else {
        // Dati demo iniziali
        punti = [
            {
                id: generateId(),
                nome: "Centro Raccolta Milano Nord",
                associazione: "AVIS Milano",
                indirizzo: "Via Example 123, Milano, 20100",
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

// Save data to localStorage
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(punti));
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

    // Modal close
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Cancel button
    document.getElementById('cancelBtn').addEventListener('click', closeModal);

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

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });

    // Detail modal close
    document.getElementById('closeDetail').addEventListener('click', () => {
        document.getElementById('detailModal').style.display = 'none';
    });
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
            <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(punto.indirizzo)}" 
               class="indirizzo" 
               target="_blank" 
               onclick="event.stopPropagation()">
                🗺️ ${punto.indirizzo}
            </a>
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
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(punto.indirizzo)}" 
                       target="_blank" 
                       style="color:#2563eb; text-decoration:none;">
                        ${punto.indirizzo} 🗺️
                    </a>
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
    showNotification('Dati esportati con successo!', 'success');
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
                if (confirm('Vuoi sostituire i dati esistenti o aggiungerli?\\n\\nOK = Sostituire\\nAnnulla = Aggiungere')) {
                    punti = imported;
                } else {
                    punti = [...punti, ...imported];
                }
                saveData();
                renderPunti();
                showNotification('Dati importati con successo!', 'success');
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