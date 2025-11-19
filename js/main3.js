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