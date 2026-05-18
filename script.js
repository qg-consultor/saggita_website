$(document).ready(function() {
    
    // 1. Water Ripple Effect Disabled
    // Disabled intentionally: it causes a solid-color glitch (WebGL failure) when running the site from local file:/// paths.
    // If you host this online (HTTPS), you can uncomment this to enable it again.
    /*
    try {
        $('#hero').ripples({
            resolution: 512,
            dropRadius: 20, 
            perturbance: 0.02 
        });
    } catch (e) {
        $('.error').show().text(e);
    }
    
    setInterval(function() {
        var $el = $('#hero');
        var x = Math.random() * $el.outerWidth();
        var y = Math.random() * $el.outerHeight();
        var dropRadius = 15;
        var strength = 0.01 + Math.random() * 0.02;

        $el.ripples('drop', x, y, dropRadius, strength);
    }, 4000);
    */

    // 2. Interactive Hotspots (Click to toggle tooltips)
    // Requirements: "When clicked open a small floating tooltip describing property features."
    $('.hotspot').on('click', function(e) {
        // Prevent click from propagating to the hero background if we don't want ripples exactly where clicked,
        // but let's allow it so user sees a ripple under the click!
        
        const $this = $(this);
        
        // Toggle active class on this hotspot
        $this.toggleClass('active');
        
        // Remove active class from all other hotspots to close their tooltips
        $('.hotspot').not($this).removeClass('active');
        
        e.stopPropagation();
    });

    // Close tooltips when clicking anywhere else on the document
    $(document).on('click', function(e) {
        $('.hotspot').removeClass('active');
    });

    // Herramienta temporal de coordenadas eliminada a petición.
    // 3. Prevent ripples from intercepting standard button clicks
    $('button, a').on('mouseenter', function() {
        // Optional: stop ripples when hovering over buttons to keep it clean,
        // or just let it be. We will let it be.
    });

    // 4. Lógica del Carrusel de la Galería "Proyecto"
    const nextBtn = document.getElementById('btn-next');
    const prevBtn = document.getElementById('btn-prev');
    const gallery = document.getElementById('gallery-carousel');

    if (nextBtn && prevBtn && gallery) {
        const scrollAmount = 370; // Ancho de tarjeta (350) + gap (20)

        nextBtn.addEventListener('click', () => {
            gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // 5. Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) { // Mostrar si baja más de 300px
            $(backToTopBtn).addClass('visible');
        } else {
            $(backToTopBtn).removeClass('visible');
        }
    });

    // 6. Lógica del Carrusel "Prototipos"
    const protoNextBtn = document.getElementById('proto-btn-next');
    const protoPrevBtn = document.getElementById('proto-btn-prev');
    const protoGallery = document.getElementById('prototipos-carousel');

    if (protoNextBtn && protoPrevBtn && protoGallery) {
        protoNextBtn.addEventListener('click', () => {
             const cardWidth = protoGallery.querySelector('.proto-card').offsetWidth;
             const gap = 20; 
             protoGallery.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        });

        protoPrevBtn.addEventListener('click', () => {
             const cardWidth = protoGallery.querySelector('.proto-card').offsetWidth;
             const gap = 20;
             protoGallery.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        });
    }

    // 7. Lógica de la Galería de Planos (Floorplans)
    const fpNextBtn = document.getElementById('fp-btn-next');
    const fpPrevBtn = document.getElementById('fp-btn-prev');
    const fpGallery = document.getElementById('floorplan-carousel');

    if (fpNextBtn && fpPrevBtn && fpGallery) {
        fpNextBtn.addEventListener('click', () => {
             const cardWidth = fpGallery.querySelector('.fp-card').offsetWidth;
             const gap = 30; // gap from CSS
             fpGallery.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        });

        fpPrevBtn.addEventListener('click', () => {
             const cardWidth = fpGallery.querySelector('.fp-card').offsetWidth;
             const gap = 30;
             fpGallery.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        });
    }

});

/* =========================================
   MASTER PLAN MAPA INTERACTIVO
========================================= */
document.addEventListener('DOMContentLoaded', () => {

        const tooltip = document.getElementById('tooltip');
        const ttTitle = document.getElementById('tt-title');
        const ttDesc = document.getElementById('tt-desc');
        const ttBtn = document.getElementById('tt-btn');
        const ttClose = document.getElementById('tt-close');

        const LOT_DATA = {
    'LOTE-1': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-2': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-3': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-4': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-5': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-6': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-7': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-8': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-9': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-10': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-11': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-12': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-13': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-14': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-15': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-16': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-17': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-18': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-19': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-20': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-21': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-22': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-23': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-24': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-25': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-26': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-27': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-28': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-29': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-30': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-31': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-32': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-33': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-34': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-35': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-36': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-37': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-38': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-39': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-40': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-41': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-42': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-43': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-44': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-45': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-46': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-47': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-48': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-49': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-50': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-51': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-52': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-53': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-54': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-55': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-56': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-57': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-58': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-59': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-60': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-61': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-62': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-63': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-64': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-65': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-66': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-67': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-68': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-69': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-70': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-71': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-72': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-73': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-74': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-75': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-76': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-77': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-78': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-79': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-80': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-81': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-82': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-83': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-84': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-85': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-86': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-87': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-88': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-89': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-90': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-91': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-92': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-93': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-94': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-95': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-96': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-97': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-98': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-99': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-100': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-101': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-102': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-103': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-104': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-105': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-106': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-107': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-108': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-109': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-110': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-111': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-112': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-113': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-114': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-115': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-116': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-117': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-118': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-119': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-120': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-121': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-122': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-123': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-124': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-125': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-126': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-127': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-128': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-129': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-130': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-131': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-132': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-133': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-134': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-135': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-136': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-137': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-138': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-139': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-140': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-141': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-142': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-143': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-144': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-145': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-146': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-147': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-148': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-149': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-150': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-151': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-152': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-153': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-154': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-155': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-156': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-157': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-158': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-159': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-160': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-161': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-162': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-163': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-164': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-165': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-166': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-167': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-168': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-169': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-170': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-171': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-172': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-173': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-174': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-175': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-176': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-177': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-178': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-179': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-180': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-181': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-182': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-183': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-184': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-185': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-186': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-187': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-188': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-189': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-190': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-191': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-192': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-193': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-194': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-195': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-196': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-197': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-198': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-199': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-200': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-201': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-202': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-203': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-204': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-205': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-206': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-207': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-208': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-209': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-210': { const: '181.10', terr: '141.40', status: 'Disponible' },
    'LOTE-211': { const: '181.10', terr: '141.40', status: 'Disponible' }
};

        window.addEventListener('load', () => {
            setTimeout(() => {
                const shapes = document.querySelectorAll('.lote-interactivo');
                shapes.forEach(shape => {
                    const id = shape.id;
                    if (id && LOT_DATA[id]) {
                        shape.setAttribute('data-title', id.replace('-', ' '));
                        shape.setAttribute('data-const', LOT_DATA[id].const);
                        shape.setAttribute('data-terr', LOT_DATA[id].terr);
                        shape.setAttribute('data-status', LOT_DATA[id].status);
                        
                        if (LOT_DATA[id].status.toLowerCase() === 'disponible') {
                            shape.classList.add('lote-disponible', 'lote-activo', 'lote-magico');
                        } else {
                            shape.classList.add('lote-vendido', 'lote-activo'); 
                        }
                    }
                });
            }, 1000); 
        });

        document.addEventListener('click', (e) => {
            const lote = e.target.closest('.lote-activo');
            document.querySelectorAll('.lote-seleccionado').forEach(el => el.classList.remove('lote-seleccionado'));
            
            if(lote) {
                e.stopPropagation(); 
                lote.classList.add('lote-seleccionado');

                const titulo = lote.getAttribute('data-title');
                const constr = lote.getAttribute('data-const');
                const terr = lote.getAttribute('data-terr');
                const status = lote.getAttribute('data-status');

                ttTitle.textContent = titulo;
                ttDesc.innerHTML = `Construcción: ${constr} m²<br>Terreno: ${terr} m²<br>Status: ${status}`;
                
                if (status && status.toLowerCase() !== 'disponible') {
                    ttBtn.style.display = 'none';
                } else {
                    ttBtn.style.display = 'inline-block';
                }
                
                tooltip.style.left = (e.pageX + 15) + 'px';
                tooltip.style.top = (e.pageY + 15) + 'px';
                tooltip.classList.add('visible');
            } else if (!e.target.closest('#tooltip')) {
                tooltip.classList.remove('visible');
                document.querySelectorAll('.lote-seleccionado').forEach(el => el.classList.remove('lote-seleccionado'));
            }
        });

        ttBtn.addEventListener('click', () => {
            alert("¡Llevando al cliente al formulario de contacto!");
        });

        if (ttClose) {
            ttClose.addEventListener('click', (e) => {
                e.stopPropagation();
                tooltip.classList.remove('visible');
                document.querySelectorAll('.lote-seleccionado').forEach(el => el.classList.remove('lote-seleccionado'));
            });
        }
        
        /* LÓGICA DE ZOOM INTERACTIVO */
        const mapWrapper = document.getElementById('map-wrapper');
        const zoomContainer = document.getElementById('map-zoom-container');

        if (mapWrapper && zoomContainer) {
            mapWrapper.addEventListener('mousemove', (e) => {
                const rect = mapWrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const xPercent = (x / rect.width) * 100;
                const yPercent = (y / rect.height) * 100;

                zoomContainer.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                zoomContainer.style.transform = 'scale(2.5)';
            });

            mapWrapper.addEventListener('mouseleave', () => {
                zoomContainer.style.transform = 'scale(1)';
                zoomContainer.style.transformOrigin = 'center center';
            });
        }
    
});


/* =========================================
   LIGHTBOX GALERIA PLANOS
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const fpCards = document.querySelectorAll('.fp-card');
    const lightbox = document.getElementById('fp-lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbTitle = document.getElementById('lb-title');
    const lbClose = document.getElementById('fp-close');
    const lbPrev = document.getElementById('lb-btn-prev');
    const lbNext = document.getElementById('lb-btn-next');

    if (lightbox && fpCards.length > 0) {
        const fpData = [
            { title: 'CASA <span class="text-green">TIPO 1</span>', src: 'IMAGENES/lasierra_residencial_casatipo1.png' },
            { title: 'CASA <span class="text-green">TIPO 2</span>', src: 'IMAGENES/lasierra_residencial_casatipo2.png' },
            { title: 'CASA <span class="text-green">TIPO 3</span>', src: 'IMAGENES/lasierra_residencial_casatipo3.png' },
            { title: 'CASA <span class="text-green">TIPO 4</span>', src: 'IMAGENES/lasierra_residencial_casatipo4.jpg' },
            { title: 'DEPA <span class="text-green">TIPO 1</span>', src: 'IMAGENES/lasierra_residencial_depatipo1.png' },
            { title: 'DEPA <span class="text-green">TIPO 2</span>', src: 'IMAGENES/lasierra_residencial_depatipo2.png' },
            { title: 'DEPA <span class="text-green">TIPO 3</span>', src: 'IMAGENES/lasierra_residencial_depatipo3.png' }
        ];

        let currentLbIndex = 0;

        function openLightbox(index) {
            currentLbIndex = index;
            lbImg.src = fpData[index].src;
            lbTitle.innerHTML = fpData[index].title;
            lightbox.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }

        fpCards.forEach((card) => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.getAttribute('data-index'), 10);
                if (!isNaN(idx)) openLightbox(idx);
            });
        });

        if (lbClose) {
            lbClose.addEventListener('click', () => {
                lightbox.classList.remove('visible');
                document.body.style.overflow = 'auto';
            });
        }

        if (lbPrev) {
            lbPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                currentLbIndex = (currentLbIndex > 0) ? currentLbIndex - 1 : fpData.length - 1;
                openLightbox(currentLbIndex);
            });
        }

        if (lbNext) {
            lbNext.addEventListener('click', (e) => {
                e.stopPropagation();
                currentLbIndex = (currentLbIndex < fpData.length - 1) ? currentLbIndex + 1 : 0;
                openLightbox(currentLbIndex);
            });\r
        }\r
        \r
        // Clic fuera de la imagen también cierra (cuidado con los botones de flecha)\r
        lightbox.addEventListener('click', (e) => {\r
            if(e.target === lightbox || e.target.classList.contains('fp-lightbox-content')) {\r
                lightbox.classList.remove('visible');\r
                document.body.style.overflow = 'auto';\r
            }\r
        });\r
    }\r
\r
    // =========================================================\r
    // Interactive Zoom Explorer for Floorplan Images\r
    // =========================================================\r
    document.querySelectorAll('.zoom-explore').forEach(container => {\r
        const img = container.querySelector('img');\r
        \r
        container.addEventListener('mousemove', (e) => {\r
            const rect = container.getBoundingClientRect();\r
            const x = ((e.clientX - rect.left) / rect.width) * 100;\r
            const y = ((e.clientY - rect.top) / rect.height) * 100;\r
            img.style.transformOrigin = `${x}% ${y}%`;\r
        });\r
        \r
        container.addEventListener('mouseleave', () => {\r
            img.style.transformOrigin = 'center center';\r
        });\r
    });\r
});\r
\r
\r
