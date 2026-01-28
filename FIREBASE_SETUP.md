# 🔄 Guida alla Configurazione della Sincronizzazione Dati Condivisi

## 📖 Panoramica

Questa guida ti aiuterà a configurare la sincronizzazione dei dati in modo che **tutti gli utenti possano vedere e modificare gli stessi dati** in tempo reale.

### Come Funziona?

- **Senza sincronizzazione**: Ogni utente ha i propri dati salvati solo sul proprio dispositivo
- **Con sincronizzazione**: Tutti gli utenti vedono gli stessi dati in tempo reale. Quando qualcuno aggiunge o modifica un punto, appare immediatamente per tutti!

## 🚀 Configurazione Passo-Passo

### Passo 1: Creare un Progetto Firebase (GRATIS)

1. Vai su [Firebase Console](https://console.firebase.google.com/)
2. Clicca su **"Aggiungi progetto"** o **"Create a project"**
3. Inserisci un nome per il progetto (es. "raccolta-sangue")
4. Puoi disabilitare Google Analytics se non ti serve
5. Clicca **"Crea progetto"**
6. Attendi che il progetto venga creato

### Passo 2: Creare un Database Realtime

1. Nel menu laterale, clicca su **"Realtime Database"**
2. Clicca su **"Crea database"** o **"Create Database"**
3. Seleziona una località (scegli quella più vicina, es. "europe-west1")
4. Seleziona **"Avvia in modalità test"** o **"Start in test mode"**
5. Clicca **"Abilita"** o **"Enable"**

### Passo 3: Configurare le Regole di Sicurezza

1. Nel database appena creato, vai alla tab **"Regole"** o **"Rules"**
2. Sostituisci il contenuto con:

```json
{
  "rules": {
    "punti": {
      ".read": true,
      ".write": true
    }
  }
}
```

3. Clicca **"Pubblica"** o **"Publish"**

> **⚠️ Nota sulla sicurezza**: Queste regole permettono a chiunque di leggere e scrivere. È semplice ma non sicuro per dati sensibili. Per un ambiente di produzione, considera di implementare l'autenticazione Firebase.

### Passo 4: Ottenere la Configurazione Firebase

1. Nella Firebase Console, clicca sull'icona **ingranaggio** ⚙️ in alto a sinistra
2. Seleziona **"Impostazioni progetto"** o **"Project settings"**
3. Scorri verso il basso fino a **"Le tue app"** o **"Your apps"**
4. Clicca sull'icona **"</>"** (web)
5. Inserisci un nickname per l'app (es. "raccolta-sangue-web")
6. NON spuntare "Firebase Hosting"
7. Clicca **"Registra app"** o **"Register app"**
8. Vedrai un codice simile a questo:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "tuo-progetto.firebaseapp.com",
  databaseURL: "https://tuo-progetto-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tuo-progetto-id",
  storageBucket: "tuo-progetto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

9. **COPIA** questi valori

### Passo 5: Modificare il File app.js

1. Se hai scaricato i file localmente:
   - Apri il file `app.js` con un editor di testo (Notepad++, VS Code, ecc.)
   
2. Se usi GitHub Pages:
   - Vai su GitHub nel repository
   - Clicca sul file `app.js`
   - Clicca sull'icona della matita ✏️ per modificarlo

3. Trova all'inizio del file questa sezione:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyBxxx-REPLACE-WITH-YOUR-KEY-xxxxxxxxxx",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:xxxxxxxxxxxxx"
};
```

4. **SOSTITUISCI** completamente questa sezione con i valori che hai copiato dal Passo 4

5. Salva il file:
   - Localmente: Salva il file
   - Su GitHub: Scorri in basso e clicca "Commit changes"

### Passo 6: Abilitare la Sincronizzazione nell'App

1. Apri l'app (o ricarica la pagina se era già aperta)
2. Inserisci il PIN per accedere
3. Clicca sul pulsante **"⚙️ Impostazioni"**
4. Scorri fino a **"☁️ Sincronizzazione Dati Condivisi"**
5. Spunta la casella **"Abilita sincronizzazione dati condivisi"**
6. Se hai già dei dati locali, ti chiederà se vuoi caricarli sul database condiviso - clicca **"OK"** se vuoi condividerli

### Passo 7: Condividere con Altri Utenti

Ora che la sincronizzazione è attiva:

1. Condividi il link dell'app con gli altri utenti: `https://sicrida-sketch.github.io/RACCOLTESANGUE/`
2. Condividi anche il PIN (predefinito: `000000`)
3. Tutti gli utenti devono abilitare la sincronizzazione nelle impostazioni (Passo 6)
4. Fatto! Ora tutti vedono gli stessi dati in tempo reale! 🎉

## ✅ Verifica che Funziona

Per verificare che la sincronizzazione funziona:

1. Apri l'app su un dispositivo
2. Aggiungi o modifica un punto di raccolta
3. Apri l'app su un altro dispositivo (o in un'altra finestra del browser in incognito)
4. Dovresti vedere immediatamente il punto aggiunto/modificato!

## 🔧 Risoluzione Problemi

### La casella "Abilita sincronizzazione" non funziona

- Verifica di aver modificato correttamente `app.js` con i tuoi dati Firebase
- Ricarica completamente la pagina (Ctrl+F5 o Cmd+Shift+R)
- Controlla la console del browser (F12) per eventuali errori

### I dati non si sincronizzano tra i dispositivi

- Verifica che tutti gli utenti abbiano abilitato la sincronizzazione
- Controlla che le regole del database siano corrette (Passo 3)
- Verifica la connessione internet
- Ricarica la pagina

### Messaggio "Firebase non configurato"

- Assicurati di aver sostituito TUTTI i valori in `firebaseConfig`
- Verifica che non ci siano errori di sintassi nel codice
- Ricarica completamente la pagina

### Voglio tornare ai dati solo locali

1. Vai nelle Impostazioni
2. Togli la spunta da "Abilita sincronizzazione dati condivisi"
3. I dati torneranno a essere salvati solo localmente

## 📊 Limiti del Piano Gratuito di Firebase

Il piano gratuito (Spark) di Firebase include:

- **1 GB** di spazio database
- **10 GB/mese** di trasferimento dati
- **100 connessioni simultanee**

Questo è più che sufficiente per gestire centinaia di punti di raccolta e decine di utenti!

## 🔒 Considerazioni sulla Sicurezza

⚠️ **Importante**: Con la configurazione attuale, chiunque conosca il link dell'app può:
- Vedere tutti i dati (se conosce il PIN)
- Modificare i dati
- Eliminare i dati

**Per un ambiente di produzione**, considera di:
1. Implementare l'autenticazione Firebase
2. Configurare regole di sicurezza più restrittive
3. Implementare ruoli utente (amministratore, visualizzatore, ecc.)

## 💡 Suggerimenti

- **Backup regolari**: Usa la funzione "💾 Esporta Dati" per creare backup regolari
- **Test prima della produzione**: Prova la configurazione con dati di test prima di usarla in produzione
- **Monitora l'uso**: Controlla periodicamente la Firebase Console per vedere l'utilizzo delle risorse

## 🆘 Supporto

Se hai problemi con la configurazione:
1. Controlla la console del browser (F12) per errori
2. Verifica che tutti i passaggi siano stati seguiti correttamente
3. Apri una Issue nel repository GitHub con i dettagli del problema

---

**Configurato con successo?** Ora tutti gli utenti possono collaborare sui dati in tempo reale! 🎉
