import { siteConfig } from './config.js';
export function initNews() {
  const target = document.querySelector('#news-list');
  if(!target) return;
  if(!siteConfig.news.length) {
    const empty = document.createElement('div');
    empty.className = 'news-empty reveal';
    empty.innerHTML = '<span aria-hidden="true">✦</span><h3>Algo se está cocinando en la colmena.</h3><p>Próximamente compartiremos las primeras novedades oficiales del desarrollo.</p>';
    target.appendChild(empty);
    return;
  }
  siteConfig.news.slice().sort((a,b) => (b.date || '').localeCompare(a.date || '')).forEach(item => {
    const card = document.createElement('article');
    card.className = 'news-card reveal';
    const date = document.createElement('time'); date.dateTime = item.date || ''; date.textContent = item.date ? new Date(`${item.date}T12:00:00`).toLocaleDateString('es-AR',{year:'numeric',month:'long',day:'numeric'}) : '';
    const category = document.createElement('small'); category.textContent = ` · ${item.category || 'Novedad'}`;
    const title = document.createElement('h3'); title.textContent = item.title;
    const text = document.createElement('p'); text.textContent = item.description;
    if(item.image){const img=document.createElement('img'); img.src=item.image; img.alt=item.title; img.loading='lazy'; card.append(img);}
    card.append(date,category,title,text); target.appendChild(card);
  });
}
