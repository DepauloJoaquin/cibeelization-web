import { siteConfig } from './config.js';

export function initGallery() {
  const gallery = document.querySelector('#gallery-grid');
  const modal = document.querySelector('#lightbox');
  if (!gallery || !modal) return;
  const items = siteConfig.gallery.filter(item => item.src);
  const image = document.querySelector('#lightbox-image');
  const caption = document.querySelector('#lightbox-caption');
  const closeButton = modal.querySelector('.lightbox-close');
  let current = 0;
  let trigger = null;

  function display(index) {
    current = (index + items.length) % items.length;
    image.src = items[current].src;
    image.alt = items[current].description || items[current].title;
    caption.textContent = `${current + 1} / ${items.length} — ${items[current].title}`;
  }
  function open(index, element) {
    if (!items.length) return;
    trigger = element;
    display(index);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  }
  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    image.removeAttribute('src');
    trigger?.focus();
  }
  items.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-item reveal';
    button.setAttribute('aria-label', `Ver imagen ${index + 1}: ${item.title}`);
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.description || item.title;
    img.loading = 'lazy';
    img.decoding = 'async';
    const title = document.createElement('span');
    title.textContent = item.title;
    button.append(img, title);
    button.addEventListener('click', () => open(index, button));
    gallery.appendChild(button);
  });
  closeButton.addEventListener('click', close);
  modal.querySelector('.lightbox-prev').addEventListener('click', () => display(current - 1));
  modal.querySelector('.lightbox-next').addEventListener('click', () => display(current + 1));
  modal.addEventListener('click', event => { if(event.target === modal) close(); });
  modal.addEventListener('keydown', event => {
    if(event.key === 'Escape') { close(); return; }
    if(event.key === 'ArrowLeft') display(current - 1);
    if(event.key === 'ArrowRight') display(current + 1);
    if(event.key === 'Tab') {
      const controls = [closeButton, modal.querySelector('.lightbox-prev'), modal.querySelector('.lightbox-next')];
      const i = controls.indexOf(document.activeElement);
      if(event.shiftKey && i === 0) { event.preventDefault(); controls.at(-1).focus(); }
      if(!event.shiftKey && i === controls.length - 1) { event.preventDefault(); controls[0].focus(); }
    }
  });
}
