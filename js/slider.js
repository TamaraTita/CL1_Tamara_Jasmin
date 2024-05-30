var slideIndex = 0;
showSlides();

function showSlides() {
    console.log(slideIndex)
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-slide", "");
    }
    slides[slideIndex-1].style.display = "block";  
    slides[slideIndex-1].className += " fade";
    dots[slideIndex-1].className += " active-slide";
}

function plusSlides(n) {
    showSlides();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}