
//V_1_00 mit Spinner und Fehlermeldung, ohne Js Validierung

// (1) Variablen initialisieren
const submitButton = document.getElementById("submit");
const vorname = document.getElementById("vorname");
const nachname = document.getElementById("nachname");
const email = document.getElementById("email");
const telefonnummer = document.getElementById("telefonnummer");
const tour = document.getElementById("tour");
const date = document.getElementById("date");
const spinner = document.getElementById("spinner");
const form = document.getElementById("form");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  await onClickSubmit();
});

const onClickSubmit = async () => {
  // Spinner anzeigen
  spinner.style.display = 'block';
  form.style.display = 'none';

  // validierung der Eingaben
  if (vorname.value === '' || vorname.value.length > 20 ||
    nachname.value === '' || nachname.value.length > 50 ||
    email.value === '' || email.value.length > 200 ||
    telefonnummer.value === '' ||
    tour.value === '' ||
    date.value === '') {
    // Handle invalid input
    showPopup('Bitte füllen Sie alle Felder aus.');
    spinner.style.display = 'none';
    form.style.display = 'flex';
    return;
  }

  // email validierung
  if (!isValidEmail(email.value)) {
    showPopup('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
    spinner.style.display = 'none';
    form.style.display = 'flex'; return;
  }

  // Telefonnummer validierung
  if (!isValidPhoneNumber(telefonnummer.value)) {
    showPopup('Bitte geben Sie eine gültige Telefonnummer mit genau 10 Ziffern ein.');
    spinner.style.display = 'none';
    form.style.display = 'flex'; return;
  }

  // Datum validierung
  if (new Date(date.value) < new Date()) {
    showPopup('Bitte geben Sie ein gültiges Datum ein.');
    spinner.style.display = 'none';
    form.style.display = 'flex'; return;
  }

  try {
    // überprüfen ob email bereits existiert
    const user = await databaseClient.executeSqlQuery(`SELECT * FROM kontaktformular_mtdolomites WHERE email = '${email.value}'`);

    if (user[1].length > 0) {
      showPopup('Diese E-Mail-Adresse wurde bereits verwendet.');
      spinner.style.display = 'none';
      form.style.display = 'flex'; return;
    }

    // Speichert die Daten in der Datenbank
    await databaseClient.insertInto("kontaktformular_mtdolomites", {
      email: email.value,
      vorname: vorname.value,
      nachname: nachname.value,
      telefonnummer: telefonnummer.value,
      tour: tour.value,
      date: date.value
    });

    // Anzeigen einer Erfolgsmeldung 
    showPopup('Daten erfolgreich gespeichert!');

    // Formular zurücksetzen
    vorname.value = '';
    nachname.value = '';
    email.value = '';
    telefonnummer.value = '';
    tour.value = '';
    date.value = '';

  } catch (error) {
    // Anzeigen einer Fehlermeldung
    console.error('Fehler beim Einfügen der Daten:', error);
    showPopup('Fehler beim Einfügen der Daten. Bitte versuchen Sie es erneut.');
  } finally {
    // Spinner ausblenden
    spinner.style.display = 'none';
    form.style.display = 'flex';
  }
};

function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isValidPhoneNumber(phoneNumber) {
  var re = /^\d{10}$/;
  return re.test(String(phoneNumber));
}

function showPopup(message) {
  document.getElementById('overlay').classList.remove('hidden');
  document.getElementById('form-popup').classList.remove('hidden');
  document.getElementById('popup-message').textContent = message;
}

document.getElementById('popup-button').addEventListener('click', () => {
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('form-popup').classList.add('hidden');
  restartGame();
});