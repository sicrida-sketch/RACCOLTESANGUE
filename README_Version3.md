# 🩸 Archivio Punti Raccolta Sangue

Web application sicura per la gestione dei punti di raccolta sangue esterni sparsi nella regione.

## 🔐 Sicurezza

### Sistema PIN
- **Accesso protetto** con PIN a 6 cifre
- **PIN predefinito**: `000000` (da cambiare al primo accesso!)
- Cambio PIN nelle impostazioni
- Logout sicuro per proteggere i dati

### Primo Accesso
1. Apri l'applicazione
2. Inserisci il PIN predefinito: **000000**
3. Vai in **⚙️ Impostazioni**
4. Cambia il PIN con uno personalizzato

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
  - Visualizzazione dell'indirizzo
  - **Pulsante "Indicazioni"** che apre Google Maps
  - Apre automaticamente le **indicazioni stradali** nell'app Google Maps

#### 🚗 Logistica
- **Tipo Mezzo**: Furgone 🚐 o Autoemoteca 🚑
- **Orario di Partenza** 🕐

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

### ⚙️ Impostazioni
- **Cambio PIN**: Modifica il PIN di accesso
  - Richiede PIN attuale
  - Doppia conferma nuovo PIN
  - Validazione a 6 cifre
- **Informazioni App**: 
  - Versione corrente
  - Numero totale punti
  - Data ultimo backup
- **Reset Completo**: Elimina tutti i dati (richiede doppia conferma)

### Altre Funzionalità
- 💾 **Export dati** in formato JSON (crea backup)
- 📂 **Import dati** da file JSON
- 💿 **Salvataggio automatico** nel browser (localStorage)
- 🔒 **Logout** per proteggere i dati
- 📱 **Design responsive** (funziona su mobile, tablet e desktop)

## 🚀 Come Usare

### Installazione
1. Scarica i file: `index.html`, `styles.css`, `app.js`, `README.md`
2. Metti tutti i file nella stessa cartella
3. Apri `index.html` con un browser web

### Primo Accesso
1. **PIN predefinito**: `000000`
2. Inserisci il PIN usando il tastierino numerico
3. **IMPORTANTE**: Vai subito in Impostazioni e cambia il PIN!

### Cambio PIN
1. Clicca su **⚙️ Impostazioni** nella barra superiore
2. Sezione **🔐 Cambio PIN**
3. Inserisci:
   - PIN attuale
   - Nuovo PIN (6 cifre)
   - Conferma nuovo PIN (6 cifre)
4. Clicca su **Cambia PIN**

### Utilizzo Base
1. **Aggiungere un punto**: Clicca su "➕ Aggiungi Punto"
2. **Cercare**: Usa la barra di ricerca per filtrare per nome
3. **Visualizzare dettagli**: Clicca su "👁️ Dettagli" su una card
4. **Modificare**: Clicca su "✏️ Modifica" su una card
5. **Eliminare**: Clicca su "🗑️ Elimina" (verrà chiesta conferma)
6. **Esci**: Clicca su "🔒 Esci" per bloccare l'app

### Compilare un Punto di Raccolta

#### Informazioni Base
- **Nome**: Es. "Centro Raccolta Milano Nord"
- **Associazione**: Es. "AVIS Milano"
- **Indirizzo**: Indirizzo completo con via, città e CAP

#### Logistica
- **Tipo Mezzo**: Seleziona tra:
  - 🚐 **Furgone**: Per trasporti piccoli
  - 🚑 **Autoemoteca**: Per unità mobili complete
- **Orario Partenza**: Seleziona l'orario di partenza verso il punto

#### Attrezzature
- Inserisci il numero di lettini, bilance e alimentatori disponibili

### Backup e Sicurezza
- **Esporta regolarmente** i dati per avere un backup
- **Non condividere** il PIN con persone non autorizzate
- **Cambia il PIN** se sospetti accessi non autorizzati
- Clicca su **🔒 Esci** quando non usi l'app

## 💾 Gestione Dati

I dati vengono salvati automaticamente nel browser (localStorage). Questo significa:
- ✅ I dati persistono anche dopo la chiusura del browser
- ✅ Il PIN è memorizzato in modo sicuro localmente
- ✅ Funziona offline dopo il primo caricamento
- ⚠️ I dati sono salvati localmente sul dispositivo
- 💡 Usa Export per fare backup regolari

## 🌐 Pubblicare l'App Online

Hai diverse opzioni per pubblicare l'app e renderla accessibile tramite un link:

### Opzione 1: GitHub Pages (GRATIS) ⭐ Consigliata
1. Crea un account su [GitHub](https://github.com)
2. Crea un nuovo repository chiamato `raccolta-sangue`
3. Carica i file: `index.html`, `styles.css`, `app.js`
4. Vai in **Settings** → **Pages**
5. In "Source" seleziona **main branch**
6. Salva e ottieni il link: `https://tuo-username.github.io/raccolta-sangue`

**Pro**: Gratis, veloce, affidabile, HTTPS automatico
**Contro**: Repository pubblico (ma dati protetti da PIN)

### Opzione 2: Netlify (GRATIS)
1. Vai su [netlify.com](https://www.netlify.com)
2. Trascina la cartella con i file
3. Ottieni subito un link: `https://tuo-sito.netlify.app`
4. Opzionale: collega un dominio personalizzato

**Pro**: Semplicissimo, gratis, HTTPS automatico
**Contro**: Nessuno!

### Opzione 3: Vercel (GRATIS)
1. Vai su [vercel.com](https://vercel.com)
2. Importa da GitHub o carica i file
3. Deploy automatico
4. Link: `https://tuo-sito.vercel.app`

**Pro**: Velocissimo, ottimizzato, gratis
**Contro**: Richiede account

### Opzione 4: Hosting Tradizionale
Carica i file su qualsiasi hosting web (Aruba, SiteGround, ecc.)

**Pro**: Controllo totale
**Contro**: Spesso a pagamento

### 🎯 Guida Passo-Passo GitHub Pages (Più Semplice)

1. **Crea account GitHub**
   - Vai su github.com
   - Clicca "Sign up"
   - Segui la procedura

2. **Crea repository**
   - Clicca il "+" in alto a destra
   - "New repository"
   - Nome: `raccolta-sangue`
   - Clicca "Create repository"

3. **Carica i file**
   - Clicca "uploading an existing file"
   - Trascina: `index.html`, `styles.css`, `app.js`
   - Clicca "Commit changes"

4. **Attiva GitHub Pages**
   - Vai in "Settings"
   - Clicca "Pages" nel menu laterale
   - In "Source" seleziona "main"
   - Clicca "Save"

5. **Ottieni il link**
   - Dopo 1-2 minuti apparirà il link
   - Esempio: `https://sicrida-sketch.github.io/raccolta-sangue`
   - **Questo è il tuo link pubblico!**

### 📱 Condividere il Link
Una volta pubblicata, puoi:
- Condividere il link via email, WhatsApp, ecc.
- Salvare come bookmark sul telefono
- Aggiungere alla home screen su mobile (funziona come app!)

### 🔒 Sicurezza Online
- ✅ Il PIN protegge i tuoi dati anche online
- ✅ I dati rimangono nel browser di chi accede
- ✅ Usa HTTPS (automatico con GitHub Pages/Netlify/Vercel)
- ⚠️ Cambia il PIN predefinito immediatamente!
- ⚠️ Non usare su computer pubblici senza fare logout

## 📝 Note Tecniche

- Le foto vengono salvate in formato Base64 nel localStorage
- Il localStorage ha un limite di circa 5-10MB
- PIN salvato in localStorage (solo locale, non in server)
- Compatibile con tutti i browser moderni
- Nessun server backend necessario
- Completamente client-side

## 🆘 Supporto

### Ho dimenticato il PIN!
Se hai dimenticato il PIN:
1. Esporta i dati (se possibile)
2. Usa la funzione "Reset Completo" nelle impostazioni
3. Il PIN tornerà a `000000`
4. Reimporta i dati se li hai esportati

### L'app non carica i dati
- Verifica di essere sullo stesso browser/dispositivo
- Controlla di non aver cancellato i dati del browser
- Importa l'ultimo backup se disponibile

### Problemi con Google Maps
- Verifica la connessione internet
- Controlla che l'indirizzo sia corretto
- Su mobile, verifica che Google Maps sia installato

## 📄 Licenza

Uso interno per la gestione delle raccolte sangue.

---

**Versione**: 3.0.0  
**Data**: Gennaio 2026  
**Sviluppato per**: Gestione Autoparco - Raccolte Sangue  
**Changelog v3.0**:
- ✅ Aggiunto sistema PIN a 6 cifre
- ✅ Schermata login sicura
- ✅ Funzione cambio PIN con validazione
- ✅ Pannello impostazioni completo
- ✅ Funzione logout
- ✅ Reset app con doppia conferma
- ✅ Tracking ultimo backup