
//V_1_00 mit Spinner und Fehlermeldung, ohne Js Validierung

// (1) Variablen initialisieren
const submitButton = document.getElementById("submit");   // Variablen greifen auf HTML Klasse zu
const vorname = document.getElementById("vorname");
const nachname = document.getElementById("nachname");
const email = document.getElementById("email");
const telefonnummer = document.getElementById("telefonnummer");
const tour = document.getElementById("tour");
const date = document.getElementById("date");
const spinner = document.getElementById("spinner");
const form = document.getElementById("form");

submitButton.addEventListener("click", async (event) => {   // beim Klicken auf Sumbmit, wird Formularabsenden verhindert und Funktion onClickSubmit aufgerufen
  event.preventDefault();
  await onClickSubmit();
});

const onClickSubmit = async () => {     //Spinner wird angezeigt angezeigt, Form versteckt
  // Spinner anzeigen
  spinner.style.display = 'block';
  form.style.display = 'none';

  // validierung der Eingaben         //èberprüfen, ob alle Felder ausgefüllt und Werte gültig
  if (vorname.value === '' || vorname.value.length > 20 ||    // Vorname ist ausgefühllt und hat weniger als 20 Buchstaben
    nachname.value === '' || nachname.value.length > 50 ||
    email.value === '' || email.value.length > 200 ||
    telefonnummer.value === '' ||
    tour.value === '' ||
    date.value === '') {
    // Handle invalid input     /// nicht vollständig ausgefüllt
    showPopup('Bitte füllen Sie alle Felder aus.');     //zeigt Popup Fenster an, wenn etw. nicht stimmmt
    spinner.style.display = 'none';                     // Spinner wird ausgeblendet
    form.style.display = 'flex';                       // Formular wieder anzeigen, damit User korrigieren kann
    return;
  }

  // email validierung
  if (!isValidEmail(email.value)) {                   // Funktion prüft, ob Eingabe richtig
    showPopup('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
    spinner.style.display = 'none';
    form.style.display = 'flex'; return;              // Formular wieder anzeigen, damit User korrigieren kann
  }

  // Telefonnummer validierung
  if (!isValidPhoneNumber(telefonnummer.value)) {
    showPopup('Bitte geben Sie eine gültige Telefonnummer mit genau 10 Ziffern ein.');
    spinner.style.display = 'none';
    form.style.display = 'flex'; return;
  }

  // Datum validierung
  if (new Date(date.value) < new Date()) {        // vergleich eingegebenes Datum mit neuem, wenn neues Datum < aktueles Datum = true
    showPopup('Bitte geben Sie ein gültiges Datum ein.');
    spinner.style.display = 'none';
    form.style.display = 'flex'; return;
  }


  //Datenbank interaktion
  try {
    // überprüfen, ob email bereits existiert
    const user = await databaseClient.executeSqlQuery(`SELECT * FROM kontaktformular_mtdolomites WHERE email = '${email.value}'`);      //SQL Abfrage, ob EMail schon vorhanden, Ergebnis in User gespeichert

    if (user[1].length > 0) {       // Ergebnis = höher als Null = Email existiert bereits
      showPopup('Diese E-Mail-Adresse wurde bereits verwendet.');     
      spinner.style.display = 'none';
      form.style.display = 'flex'; return;
    }

    // Speichert die Daten in der Datenbank
    await databaseClient.insertInto("kontaktformular_mtdolomites", {        //databankclientinserto fügt Daten in Datenbank ein
      email: email.value,
      vorname: vorname.value,
      nachname: nachname.value,
      telefonnummer: telefonnummer.value,
      tour: tour.value,
      date: date.value
    });

    // Anzeigen einer Erfolgsmeldung 
    showPopup('Daten erfolgreich gespeichert!');     // Erfolgreiche Speicherung --> Popup

    // Formular zurücksetzen      // alle Eingabefelder werden geleert
    vorname.value = '';
    nachname.value = '';
    email.value = '';
    telefonnummer.value = '';
    tour.value = '';
    date.value = '';

  } catch (error) {     //fängt Fehler ab, die im try auftreten
    // Anzeigen einer Fehlermeldung
    console.error('Fehler beim Einfügen der Daten:', error);      // Fehler in Console, für debugging
    showPopup('Fehler beim Einfügen der Daten. Bitte versuchen Sie es erneut.');      // Popup Fehlermeldung
  } finally {
    // Spinner ausblenden
    spinner.style.display = 'none';
    form.style.display = 'flex';
  }
};

function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;       // Format einer Emailadresse wird überprüft
  return re.test(String(email).toLowerCase());      //prüft, ob Email dem regulären Ausdruck entspricht, wenn richtig --> true
}

function isValidPhoneNumber(phoneNumber) {
  var re = /^\d{10}$/;                        //Nr. enthält genau 10 Ziffern
  return re.test(String(phoneNumber));       //prüft, ob Tel dem regulären Ausdruck entspricht, wenn richtig --> true
}


function showPopup(message) {
  document.getElementById('overlay').classList.remove('hidden');      //entfernt hidden Klasse von overlay  --> sichtbar
  document.getElementById('form-popup').classList.remove('hidden');   //entfernt hidden Klasse von Popup --->sichtbar
  document.getElementById('popup-message').textContent = message;     // setzt Textinhalt von Pupup auf Nachricht
}

document.getElementById('popup-button').addEventListener('click', () => {     //wenn Button geklickt, schliesst Popup
  document.getElementById('overlay').classList.add('hidden');                 //hinzufügen hidden Klasse von overlay  --> verbergen
  document.getElementById('form-popup').classList.add('hidden');              //hinzufügen hidden Klasse von form-popup  --> verbergen
  restartGame();                                                              // Formularstand zurücksetzen
});