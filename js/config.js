/** Configuración pública del sitio. Dejar URLs vacías hasta confirmar las cuentas. */
export const siteConfig = {
  gameName: 'Cibeelization',
  studioName: '', // Nombre del estudio pendiente de confirmación
  developmentStatus: 'En desarrollo',
  contactEmail: '', // Ejemplo: 'contacto@tudominio.com'
  socials: {
    discord: '',
    instagram: '',
    youtube: ''
  },
  team: [
    { name: 'Joaquín Depaulo', role: '', bio: '', photo: '' },
    { name: 'Ignacio Mojsa', role: '', bio: '', photo: '' },
    { name: 'Maitena Pochyly', role: '', bio: '', photo: '' }
  ],
  gallery: [
    { src: './assets/screenshots/board-hud-1.webp', title: 'Reinas sobre el tablero', description: 'Primera vista del tablero hexagonal y del HUD del prototipo.' },
    { src: './assets/screenshots/board-hud-2.webp', title: 'Una colmena en acción', description: 'Abejas, celdas hexagonales y elementos iniciales de la interfaz.' },
    { src: './assets/screenshots/board-hud-3.webp', title: 'Control del territorio', description: 'Perspectiva sobre unidades y territorios del prototipo.' },
    { src: './assets/screenshots/board-hud-4.webp', title: 'El mundo de las reinas', description: 'Abejas en un tablero 3D low poly con paleta cálida.' }
  ],
  // Publicar noticias verificadas únicamente. Ejemplo:
  // { date:'2026-11-16', title:'...', description:'...', category:'Desarrollo', image:'' }
  news: []
};
