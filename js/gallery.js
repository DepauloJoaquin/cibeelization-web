
import { siteConfig } from './config.js';

export function initGallery() {
    const gallery = document.querySelector('#gallery-grid');
    const modal = document.querySelector('#lightbox');

    if (!modal) return;

    const image = modal.querySelector('#lightbox-image');
    const caption = modal.querySelector('#lightbox-caption');
    const closeButton = modal.querySelector('.lightbox-close');
    const prevButton = modal.querySelector('.lightbox-prev');
    const nextButton = modal.querySelector('.lightbox-next');

    if (!image || !caption || !closeButton ||
        !prevButton || !nextButton) return;

    // Cada galería mantiene sus propias imágenes.
    const gameplayItems = (siteConfig.gallery || [])
        .filter(item => item.src)
        .map(item => ({
            src: item.src,
            title: item.title,
            description: item.description || item.title
        }));

    const conceptLinks = Array.from(
        document.querySelectorAll(
            '#arte-conceptual a.concept-artwork, ' +
            '#arte-conceptual a.concept-extra-card'
        )
    );

    const conceptItems = conceptLinks.map(link => ({
        src: link.getAttribute('href'),
        title: link.querySelector('img')?.alt || 'Arte conceptual',
        description: link.querySelector('img')?.alt || 'Arte conceptual'
    }));

    let activeItems = [];
    let currentIndex = 0;
    let trigger = null;

    // Mostrar una imagen de la galería activa.
    function display(index) {
        if (!activeItems.length) return;

        currentIndex =
            (index + activeItems.length) % activeItems.length;

        const item = activeItems[currentIndex];

        image.src = item.src;
        image.alt = item.description;

        caption.textContent =
            `${currentIndex + 1} / ${activeItems.length} — ${item.title}`;
    }

    // Abrir el lightbox.
    function open(items, index, element, isConcept = false) {
        if (!items.length) return;

        activeItems = items;
        trigger = element;

        display(index);

        modal.classList.toggle('concept-mode', isConcept);
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';

        closeButton.focus();
    }

    // Cerrar el lightbox.
    function close() {
        if (!modal.classList.contains('open')) return;

        modal.classList.remove('open', 'concept-mode');
        modal.setAttribute('aria-hidden', 'true');

        document.body.style.overflow = '';

        image.removeAttribute('src');
        image.alt = '';
        caption.textContent = '';

        activeItems = [];

        const lastTrigger = trigger;
        trigger = null;

        lastTrigger?.focus();
    }

    // =========================================
    // GALERÍA DE GAMEPLAY
    // =========================================

    if (gallery) {
        gameplayItems.forEach((item, index) => {
            const button = document.createElement('button');

            button.type = 'button';
            button.className = 'gallery-item reveal';
            button.setAttribute(
                'aria-label',
                `Ver imagen ${index + 1}: ${item.title}`
            );

            const img = document.createElement('img');

            img.src = item.src;
            img.alt = item.description;
            img.loading = 'lazy';
            img.decoding = 'async';

            const title = document.createElement('span');
            title.textContent = item.title;

            button.append(img, title);

            button.addEventListener('click', () => {
                open(gameplayItems, index, button);
            });

            gallery.appendChild(button);
        });
    }

    // =========================================
    // GALERÍA DE ARTE CONCEPTUAL
    // =========================================

    conceptLinks.forEach((link, index) => {
        link.addEventListener('click', event => {
            event.preventDefault();

            open(conceptItems, index, link, true);
        });
    });

    // =========================================
    // CONTROLES COMPARTIDOS
    // =========================================

    closeButton.addEventListener('click', close);

    prevButton.addEventListener('click', () => {
        display(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        display(currentIndex + 1);
    });

    // Cerrar al tocar el fondo oscuro.
    modal.addEventListener('click', event => {
        if (event.target === modal) {
            close();
        }
    });

    // Navegación por teclado.
    modal.addEventListener('keydown', event => {
        if (!modal.classList.contains('open')) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            close();
            return;
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            display(currentIndex - 1);
            return;
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            display(currentIndex + 1);
            return;
        }

        // Mantener el foco dentro del lightbox.
        if (event.key === 'Tab') {
            const controls = [
                closeButton,
                prevButton,
                nextButton
            ];

            const focusedIndex =
                controls.indexOf(document.activeElement);

            if (event.shiftKey && focusedIndex === 0) {
                event.preventDefault();
                controls.at(-1).focus();
            }

            if (!event.shiftKey &&
                focusedIndex === controls.length - 1) {
                event.preventDefault();
                controls[0].focus();
            }
        }
    });
}
