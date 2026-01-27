# 🩸 Archivio Punti Raccolta Sangue

Web application per la gestione dei punti di raccolta sangue esterni sparsi nella regione.

## ✨ Funzionalità

### Gestione Punti di Raccolta
- ➕ **Aggiungi** nuovi punti di raccolta
- ✏️ **Modifica** punti esistenti
- 🗑️ **Elimina** punti di raccolta
- 🔍 **Ricerca** con filtro per nome
- 👁️ **Visualizza dettagli** completi di ogni punto

### Informazioni per Punto
Ogni punto di raccolta contiene:

#### 📋 Informazioni Base
- **Nome** del punto di raccolta
- **Associazione di appartenenza**
- **Indirizzo completo**
  - Cliccabile per aprire Google Maps
  - Apre automaticamente le **indicazioni** nell'app Google Maps

#### 🔧 Attrezzature
- 🛏️ **Numero di lettini**
- ⚖️ **Numero di bilance**
- 🔌 **Numero di alimentatori**

#### 📷 Archivio Fotografico
- Caricamento multiplo di foto
- Descrizione per ogni foto con:
  - Istruzioni di montaggio
  - Informazioni prese elettriche
  - Posizionamento veicolo

### Altre Funzionalità
- 💾 **Export dati** in formato JSON
- 📂 **Import dati** da file JSON
- 💿 **Salvataggio automatico** nel browser (localStorage)
- 📱 **Design responsive** (funziona su mobile, tablet e desktop)

## 🚀 Come Usare

### Installazione
1. Scarica i file: `index.html`, `styles.css`, `app.js`
2. Metti tutti i file nella stessa cartella
3. Apri `index.html` con un browser web

### Utilizzo
1. **Aggiungere un punto**: Clicca su "➕ Aggiungi Punto"
2. **Cercare**: Usa la barra di ricerca per filtrare per nome
3. **Visualizzare dettagli**: Clicca su "👁️ Dettagli" su una card
4. **Modificare**: Clicca su "✏️ Modifica" su una card
5. **Eliminare**: Clicca su "🗑️ Elimina" (verrà chiesta conferma)
6. **Esportare dati**: Clicca su "💾 Esporta Dati" per scaricare un backup
7. **Importare dati**: Clicca su "📂 Importa Dati" per caricare un backup

### Aggiungere Foto
1. Nel form di aggiunta/modifica, clicca su "Aggiungi Foto"
2. Seleziona una o più immagini
3. Per ogni foto, aggiungi una descrizione con:
   - Istruzioni di montaggio
   - Informazioni sulle prese elettriche
   - Indicazioni per il posizionamento del veicolo

### Google Maps
- Clicca sull'indirizzo in qualsiasi card
- Si aprirà automaticamente Google Maps con le indicazioni
- Su mobile, apre direttamente l'app Google Maps
- Su desktop, apre il sito web di Google Maps

## 💾 Gestione Dati

I dati vengono salvati automaticamente nel browser (localStorage). Questo significa:
- ✅ I dati persistono anche dopo la chiusura del browser
- ✅ Funziona offline dopo il primo caricamento
- ⚠️ I dati sono salvati localmente sul dispositivo
- 💡 Usa Export/Import per fare backup o trasferire dati

## 🎨 Design

- **Colori**: Tema rosso/bianco associato alla donazione sangue
- **Responsive**: Si adatta automaticamente a smartphone, tablet e computer
- **Moderno**: Interfaccia pulita e intuitiva
- **Accessibile**: Icone e testi chiari

## 🔧 Requisiti Tecnici

- Browser moderno (Chrome, Firefox, Safari, Edge)
- JavaScript abilitato
- Nessun server richiesto (funziona in locale)

## 📝 Note

- Le foto vengono salvate in formato Base64 nel localStorage
- Il localStorage ha un limite di circa 5-10MB (dipende dal browser)
- Per grandi quantità di foto, considera di usare un server esterno
- I dati demo iniziali vengono caricati al primo avvio

## 🆘 Supporto

Per problemi o domande, contattare l'amministratore del sistema.

## 📄 Licenza

Uso interno per la gestione delle raccolte sangue.

---

**Versione**: 1.0.0  
**Data**: Gennaio 2026  
**Sviluppato per**: Gestione Autoparco - Raccolte Sangue