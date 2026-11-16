import { siteConfig } from './config.js';
import { initNavigation } from './navigation.js';
import { initGallery,initConceptArtLightbox } from './gallery.js';
import { initNews } from './news.js';

function safeExternalUrl(raw) {
  if(!raw) return '';
  try { const url = new URL(raw); return ['https:','http:'].includes(url.protocol) ? url.href : ''; }
  catch { return ''; }
}
function initSocials() {
  const descriptions = {
    discord: ['◈', 'Discord', 'Conocé a otros jugadores, compartí ideas y seguí las novedades de la colmena.'],
    instagram: ['◎', 'Instagram', 'Ilustraciones, capturas y adelantos visuales del proyecto.'],
    youtube: ['▷', 'YouTube', 'Videos de desarrollo, presentaciones y futuros gameplays.']
  };
  const socialGrid = document.querySelector('#social-grid');
  for(const [key, [symbol,name,description]] of Object.entries(descriptions)) {
    const card = document.createElement('article'); card.className='social-card reveal';
    const icon=document.createElement('span'); icon.className='social-icon'; icon.textContent=symbol; icon.setAttribute('aria-hidden','true');
    const h3=document.createElement('h3'); h3.textContent=name;
    const p=document.createElement('p'); p.textContent=description;
    const url=safeExternalUrl(siteConfig.socials[key]);
    const action=document.createElement(url ? 'a':'span'); action.className='social-action' + (url ? '' : ' disabled'); action.textContent=url?'Visitar comunidad ↗':'Próximamente';
    if(url) {action.href=url;action.target='_blank';action.rel='noopener noreferrer';}
    card.append(icon,h3,p,action);socialGrid.append(card);
  }
  const discord = safeExternalUrl(siteConfig.socials.discord);
  document.querySelectorAll('[data-link="discord"]').forEach(anchor => {if(discord) {anchor.href=discord; anchor.target='_blank';anchor.rel='noopener noreferrer';} else {anchor.href='#comunidad';anchor.textContent='Comunidad ↗';}});
  const footer=document.querySelector('#footer-socials');
  const known=Object.entries(siteConfig.socials).map(([name,url])=>({name,url:safeExternalUrl(url)})).filter(x=>x.url);
  if(known.length){footer.textContent='';known.forEach(({name,url})=>{const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=name.charAt(0).toUpperCase()+name.slice(1);footer.append(a);});}
}
function initTeam(){
  const grid=document.querySelector('#team-grid');
  siteConfig.team.forEach(member=>{
    const card=document.createElement('article');card.className='team-card reveal';
    if(member.photo){const img=document.createElement('img');img.src=member.photo;img.alt=`Foto de ${member.name}`;img.loading='lazy';img.className='avatar';card.append(img);}
    else{const avatar=document.createElement('div');avatar.className='avatar';avatar.setAttribute('aria-hidden','true');avatar.textContent=member.name.split(' ').map(w=>w.charAt(0)).slice(0,2).join('');card.append(avatar);}
    const h=document.createElement('h3');h.textContent=member.name;
    const p=document.createElement('p');p.textContent=member.role || 'Equipo de desarrollo';card.append(h,p);
    if(member.bio){const desc=document.createElement('p');desc.textContent=member.bio;card.append(desc);}grid.append(card);
  });
}
function initContact(){
  const form=document.querySelector('#contact-form');
  const email=siteConfig.contactEmail.trim();
  const info=document.querySelector('#contact-email');
  if(email){const a=document.createElement('a');a.href=`mailto:${email}`;a.textContent=email;info.append(a);}
  else{info.textContent='Canal de contacto por confirmar';info.style.color='var(--honey)';}
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const status=document.querySelector('#form-status');
    if(!form.reportValidity()){status.textContent='Revisá los campos obligatorios antes de continuar.';return;}
    if(!email){status.textContent='El correo de contacto aún no está configurado. El formulario no puede preparar un mensaje por ahora.';return;}
    const data=new FormData(form);
    const subject=encodeURIComponent(`[Cibeelization] ${data.get('subject')}`);
    const body=encodeURIComponent(`Nombre: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
    status.textContent='Se abrirá tu aplicación de correo. Revisá y enviá el mensaje desde allí.';
    window.location.href=`mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`;
  });
}
function initAnimations(){
  const elements=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){elements.forEach(el=>el.classList.add('is-visible'));return;}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.09,rootMargin:'0px 0px 50px 0px'});
  elements.forEach(el=>observer.observe(el));
}
initNavigation();initGallery();initNews();initSocials();initTeam();initContact();initAnimations();initConceptArtLightbox();
document.querySelector('#year').textContent=new Date().getFullYear();
