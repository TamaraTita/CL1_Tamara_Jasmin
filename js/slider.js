// Slideshow Home

// Variablen definieren
var slideIndex = 0;     //speichert aktuelle Folie, Startindex = 0 
showSlides();           // ruft erste Folie auf

function showSlides() {
    console.log(slideIndex)     // aktuelle FOliennummer in Console
    var i;
    var slides = document.getElementsByClassName("mySlides");  //sammelt Elemente mit Klasse myslides (Bilder)
    var dots = document.getElementsByClassName("dot");         // sammelt Elemente mit Klasse dot (Navigationspunkte)
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";      // Folien werden unsichtbar
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}        //SlideIndex wird um 1 erhöht, geht zur nächsten Folie
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-slide", ""); // active Slide wird von Navigationspunkten entfernt, verliert aktiven Zustand
    }
    slides[slideIndex-1].style.display = "block";  // aktuelle Folie wird sichtbar gemacht (Array bei 0)
    slides[slideIndex-1].className += " fade";    //  Übergangseffekt
    dots[slideIndex-1].className += " active-slide";  // aktuelle Folie bekommt Navigationspunkt active-slide
}

function plusSlides(n) {    //Übergang zur nächsten Slide (manuell)
    showSlides();       
}

function currentSlide(n) {      //Folie direkt manuelle anwöhlen
    showSlides(slideIndex = n);
}