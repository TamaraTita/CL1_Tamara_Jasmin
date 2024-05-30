// Burger Menü Mobile
const navSlide = () => {
    const burger = document.querySelector('.burger');   // Variable Burger wählt HTML ELement mit .burger aus
    const nav = document.querySelector('.nav-links');   // wählt HTML Element mit Links aus

    burger.addEventListener('click', () => {        //eventlisteneer reagiert auf Klick
        nav.classList.toggle('nav-active');         // beim ANlicken wird Klasse aktiviert, toggle = Ein- und Ausblendeeffekt
    });
}

navSlide();     //Aufrufen der Funktion