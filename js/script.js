// Declaramos las variables principales
let temporizadorAuto = null;
const TIEMPO_CAMBIO = 5000; // 5000 milisegundos = 5 segundos

// 1. Función para mover el slider a un índice específico
function irASlide(index) {
    const slider = document.getElementById('slider');
    if (!slider) return;

    const slideWidth = slider.clientWidth;
    slider.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
    });

    // Reiniciamos el temporizador de 5s cuando el usuario hace clic manualmente
    reiniciarAutoplay();
}

// 2. Función para avanzar automáticamente al siguiente slide
function siguienteSlide() {
    const slider = document.getElementById('slider');
    const imagenes = slider ? slider.querySelectorAll('img') : [];
    if (!slider || imagenes.length === 0) return;

    const slideWidth = slider.clientWidth;
    const indiceActual = Math.round(slider.scrollLeft / slideWidth);
    
    // Si estamos en la última imagen vuelve a la 0; si no, avanza 1
    const siguienteIndice = (indiceActual + 1) % imagenes.length;

    slider.scrollTo({
        left: slideWidth * siguienteIndice,
        behavior: 'smooth'
    });
}

// 3. Funciones para controlar el temporizador automático
function iniciarAutoplay() {
    detenerAutoplay(); // Evitamos duplicar temporizadores
    temporizadorAuto = setInterval(siguienteSlide, TIEMPO_CAMBIO);
}

function detenerAutoplay() {
    if (temporizadorAuto) {
        clearInterval(temporizadorAuto);
    }
}

function reiniciarAutoplay() {
    iniciarAutoplay();
}

// 4. Configuración inicial y eventos cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    const botones = document.querySelectorAll('.Slider-nav .nav-btn');

    if (!slider || botones.length === 0) return;

    // Actualiza qué punto/botón está activo en pantalla
    function actualizarBotonActivo() {
        const slideWidth = slider.clientWidth;
        const indiceActual = Math.round(slider.scrollLeft / slideWidth);

        botones.forEach((btn, index) => {
            if (index === indiceActual) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Escuchamos el scroll para cambiar los puntos activos
    slider.addEventListener('scroll', actualizarBotonActivo);

    // Pausar el carrusel si el usuario pasa el mouse por encima
    slider.addEventListener('mouseenter', detenerAutoplay);
    slider.addEventListener('mouseleave', iniciarAutoplay);

    // Iniciar el temporizador automático de 5 segundos
    iniciarAutoplay();
});