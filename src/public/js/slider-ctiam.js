let indice = 1;
muestraSlides(indice);

function avanzaSlide (n) {
    muestraSlides(indice+=n);
}
function posicionSlide () {
    muestraSlides(indice=n);
}
setInterval(function tiempo(){
    muestraSlides(indice+=1)
}, 4000);
function muestraSlides (n) {
    let i;
    let slides = document.getElementsByClassName('c-slider');
    let lineas = document.getElementsByClassName('container-sliders--line');

    if (n > slides.length) { indice = 1; }

    if (n < 1) {
        indice = slides.length();
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        
    }
    for (i = 0; i < lineas.length; i++) {
        lineas[i].className = lineas[i].className.replace(" line-active", "");
    }
    slides[indice-1].style.display = 'block';
    lineas[indice-1].className += ' line-active';
}