
// === Seleccionar todos los testimonios ===
const testimonios = document.querySelectorAll('.testimonio');

// === Seleccionar las flechas ===
const btnIzq = document.querySelector('.flecha.izquierda');
const btnDer = document.querySelector('.flecha.derecha');

// === Contenedor de indicadores (puntos) ===
const indicadoresContainer = document.querySelector('.indicadores');

// === Índice del testimonio actual ===
let indice = 0;

/*
    === Crear los indicadores dinámicamente ===
    Esto hace un punto por cada testimonio
*/
testimonios.forEach((_, i) => {
    const punto = document.createElement('div');
    if (i === 0) punto.classList.add('activo'); // el primero activo
    indicadoresContainer.appendChild(punto);
});

const puntos = document.querySelectorAll('.indicadores div');

/*
    === Función que actualiza el slider ===
    Muestra el testimonio correspondiente al índice
*/
function actualizarSlider() {

    // Ocultamos todos
    testimonios.forEach(t => t.classList.remove('active'));
    puntos.forEach(p => p.classList.remove('activo'));

    // Mostramos solo el actual
    testimonios[indice].classList.add('active');
    puntos[indice].classList.add('activo');
}

/*
    === Función que avanza ===
*/
function siguiente() {
    indice++;
    if (indice >= testimonios.length) indice = 0;
    actualizarSlider();
}

/*
    === Función que retrocede ===
*/
function anterior() {
    indice--;
    if (indice < 0) indice = testimonios.length - 1;
    actualizarSlider();
}

/*
    === Auto-slide cada 6 segundos ===
*/
let intervalo = setInterval(siguiente, 6000);

/*
    === Pausar cuando el mouse está encima del slider ===
*/
slider = document.querySelector('.slider-container');

slider.addEventListener('mouseenter', () => {
    clearInterval(intervalo);
});

slider.addEventListener('mouseleave', () => {
    intervalo = setInterval(siguiente, 6000);
});

/*
    === Click en flechas ===
*/
btnDer.addEventListener('click', siguiente);
btnIzq.addEventListener('click', anterior);

/*
    === Click en puntos ===
*/
puntos.forEach((punto, i) => {
    punto.addEventListener('click', () => {
        indice = i; // saltar directo al índice del punto
        actualizarSlider();
    });
});

// Mostrar el primer testimonio
actualizarSlider();




// ======================================== 
// portafolio
// ========================================


// === Seleccionamos los filtros (li) ===
const filtros = document.querySelectorAll('.filtros li');

// === Seleccionamos todos los items de la galería ===
const items = document.querySelectorAll('.galeria .item');

// === Recorremos cada filtro ===
filtros.forEach(filtro => {

    filtro.addEventListener('click', () => {

        // Quitamos la clase "activo" a todos los filtros
        filtros.forEach(f => f.classList.remove('activo'));
        filtro.classList.add('activo');

        // Obtenemos el valor del filtro
        const categoria = filtro.getAttribute('data-filter');

        // Si la categoría es TODOS, mostramos todo
        if (categoria === 'todos') {
            items.forEach(item => {
                item.style.display = 'block';
            });
            return;
        }

        // Si no, mostramos solo los que coincidan
        items.forEach(item => {
            const itemCat = item.getAttribute('data-category');

            // Mostrar solo si coincide
            if (itemCat === categoria) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

    });
});


// ======================================== 
// abrir/cerrar fotos
// ========================================


// === Lightbox ===
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const cerrar = document.getElementById('cerrar');

// Para cada item del portafolio...
items.forEach(item => {
    item.addEventListener('click', () => {

        // Obtenemos la imagen del item
        const imgSrc = item.querySelector('img').src;

        // La cargamos en el lightbox
        lightboxImg.src = imgSrc;

        // Lo mostramos
        lightbox.style.display = 'flex';
    });
});

// Botón cerrar
cerrar.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Cerrar haciendo clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});




// ======================================== 
// active section highlight
// ========================================

// Seleccionamos todos los links del navbar
const navLinks = document.querySelectorAll('.nav-link');

// Obtenemos todas las secciones que tienen ID (las del sitio)
const sections = document.querySelectorAll('section[id]');

// Creamos el observador que detecta que sección está visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.id;

        // Si la sección está visible
        if (entry.isIntersecting) {
            // Quitamos "active" de todos
            navLinks.forEach(link => link.classList.remove('active'));

            // Activamos solo el correcto
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            activeLink.classList.add('active');
        }
    });
}, {
    threshold: 0.5  // 50% de la sección visible
});

// Le decimos al observador que vigile cada sección
sections.forEach(section => observer.observe(section));





// =============================
// fomulario + whatsapp
// =============================
document.getElementById('form-whatsapp').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario se envíe normal

    let nombre = document.getElementById('nombre').value;
    let mensaje = document.getElementById('mensaje').value;

    // Número de WhatsApp al que quieres enviar
    let telefono = "573015510283"; // <-- cámbialo por el tuyo

    // Construir mensaje final
    let texto = `Hola, soy ${nombre}. ${mensaje}`;

    // URL final
    let url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;

    // Redirigir
    window.open(url, '_blank');
});

