
const droneViews = {
    dynamic: {
        src: './assets/models/ZanganoPose3Transparente.webp',
        alt: 'Zángano base de Cibeelization en pose dinámica'
    },

    front: {
        src: './assets/models/ZanganoPose2Transparente.webp',
        alt: 'Zángano base de Cibeelization en vista frontal'
    }
};

function initDroneViewer() {
    const image = document.querySelector('#drone-image');

    const buttons = document.querySelectorAll(
        '[data-drone-view]'
    );

    if (!image || !buttons.length) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.dataset.droneView;
            const selected = droneViews[view];

            if (!selected) return;

            image.src = selected.src;
            image.alt = selected.alt;

            buttons.forEach(otherButton => {
                const isActive = otherButton === button;

                otherButton.classList.toggle(
                    'active',
                    isActive
                );

                otherButton.setAttribute(
                    'aria-pressed',
                    String(isActive)
                );
            });
        });
    });
}

initDroneViewer();



/* ============================================
   EVOLUCIONES DEL ZÁNGANO
   ============================================ */

const evolutions = {
    obrera: {
        name: 'Abeja Obrera',
        role: 'LA FUERZA DEL TRABAJO',
        description:
            'La abeja obrera produce propóleo de forma constante ' +
            'y puede destruir las barreras creadas por las ' +
            'constructoras de reinas enemigas.',
        hp: 5,
        atk: 2,
        production: '+1 propóleo/turno',
        cost: '2 agua + 1 zángano',
        ability:
            'Es la única abeja capaz de destruir las barreras ' +
            'de las constructoras enemigas.',
        images: {
            dynamic:
                './assets/models/evoluciones/AbejaObreraPose1Transparente.webp',
            front:
                './assets/models/evoluciones/AbejaObreraPose2Transparente.webp'
        }
    },

    polinizadora: {
        name: 'Abeja Polinizadora',
        role: 'MOVILIDAD Y EXPANSIÓN',
        description:
            'La abeja polinizadora produce polen y destaca por ' +
            'su capacidad de recorrer grandes distancias ' +
            'cuando el jugador la controla.',
        hp: 3,
        atk: 2,
        production: '+1 polen/turno',
        cost: '3 propóleo + 1 zángano',
        ability:
            'Al controlarla, duplica la cantidad de movimientos ' +
            'disponibles obtenidos en el dado.',
        images: {
            dynamic:
                './assets/models/evoluciones/AbejaPolinizadoraPose1Transparente.webp',
            front:
                './assets/models/evoluciones/AbejaPolinizadoraPose2Transparente.webp'
        }
    },

    constructora: {
        name: 'Abeja Constructora',
        role: 'DEFENSA Y CONTROL TERRITORIAL',
        description:
            'La abeja constructora produce néctar y transforma ' +
            'el terreno en una herramienta defensiva para la colmena.',
        hp: 2,
        atk: 1,
        production: '+1 néctar/turno',
        cost: '6 agua + 1 zángano',
        ability:
            'Al controlarla, bloquea las celdas por las que ' +
            'se mueve. Solo la reina de su colmena puede ' +
            'caminar sobre esas celdas.',
        images: {
            dynamic:
                './assets/models/evoluciones/AbejaConstructoraPose1Transparente.webp',
            front:
                './assets/models/evoluciones/AbejaConstructoraPose2Transparente.webp'
        }
    },

    guardiana: {
        name: 'Abeja Guardiana',
        role: 'EL MURO DE LA COLMENA',
        description:
            'La abeja guardiana es una unidad de tipo tanque, ' +
            'con una gran cantidad de vida y un elevado ataque. ' +
            'También produce néctar para su colmena.',
        hp: 10,
        atk: 4,
        production: '+1 néctar/turno',
        cost: '3 polen + 1 zángano',
        ability:
            'Al controlarla, reduce a la mitad los movimientos ' +
            'disponibles obtenidos en el dado.',
        images: {
            dynamic:
                './assets/models/evoluciones/AbejaGuardianaPose1Transparente.webp',
            front:
                './assets/models/evoluciones/AbejaGuardianaPose2Transparente.webp'
        }
    }
};

function initEvolutionViewer() {
    const image = document.querySelector('#evolution-image');

    if (!image) return;

    const choices = document.querySelectorAll('[data-evolution]');
    const views = document.querySelectorAll('[data-evolution-view]');

    const fields = {
        number: document.querySelector('#evolution-number'),
        category: document.querySelector('#evolution-category'),
        name: document.querySelector('#evolution-name'),
        role: document.querySelector('#evolution-role'),
        description: document.querySelector('#evolution-description'),
        hp: document.querySelector('#evolution-hp'),
        atk: document.querySelector('#evolution-atk'),
        production: document.querySelector('#evolution-production'),
        cost: document.querySelector('#evolution-cost'),
        ability: document.querySelector('#evolution-ability-text')
    };

    let currentEvolution = 'obrera';
    let currentView = 'dynamic';

    const evolutionIds = Object.keys(evolutions);

    function updateImage() {
        const evolution = evolutions[currentEvolution];

        image.src = evolution.images[currentView];

        image.alt =
            `${evolution.name} en ` +
            (currentView === 'dynamic'
                ? 'pose dinámica'
                : 'vista frontal');

        views.forEach(button => {
            const active =
                button.dataset.evolutionView === currentView;

            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', String(active));
        });
    }

    function updateEvolution() {
        const evolution = evolutions[currentEvolution];

        const index = evolutionIds.indexOf(currentEvolution) + 1;
        const number = String(index).padStart(2, '0');

        fields.number.textContent = `EVOLUCIÓN ${number} / 04`;
        fields.category.textContent =
            `EVOLUCIÓN ${number} · UNIDAD ESPECIALIZADA`;

        fields.name.textContent = evolution.name;
        fields.role.textContent = evolution.role;
        fields.description.textContent = evolution.description;

        fields.hp.textContent = `${evolution.hp} HP`;
        fields.atk.textContent = `${evolution.atk} ATK`;
        fields.production.textContent = evolution.production;
        fields.cost.textContent = evolution.cost;
        fields.ability.textContent = evolution.ability;

        choices.forEach(button => {
            const active =
                button.dataset.evolution === currentEvolution;

            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', String(active));
        });

        updateImage();
    }

    choices.forEach(button => {
        button.addEventListener('click', () => {
            const selected = button.dataset.evolution;

            if (!evolutions[selected]) return;

            currentEvolution = selected;
            currentView = 'dynamic';

            updateEvolution();
        });
    });

    views.forEach(button => {
        button.addEventListener('click', () => {
            currentView = button.dataset.evolutionView;
            updateImage();
        });
    });

    updateEvolution();
}

initEvolutionViewer();
