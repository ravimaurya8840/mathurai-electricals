/**
 * MATHURAI ELECTRICALS & CONTRACTORS
 * Official Interactive Scripts
 * Powering Connection, Building Trust
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initLoadCalculator();
  initProjectFilter();
  initImageModal();
  initFaqAccordion();
  initContactForm();
  initBackToTop();
});
function initLoadCalculator() {
  const facilityBtns = document.querySelectorAll('.facility-btn');
  const slider = document.getElementById('loadSlider');
  const loadDisplay = document.getElementById('loadDisplay');
  const whatsappQuoteBtn = document.getElementById('calcWhatsappBtn');

  const outTransformer = document.getElementById('outTransformer');
  const outVoltage = document.getElementById('outVoltage');
  const outSwitchgear = document.getElementById('outSwitchgear');
  const outCable = document.getElementById('outCable');
  const outApfc = document.getElementById('outApfc');
  const outTimeline = document.getElementById('outTimeline');
  const outSummary = document.getElementById('outSummary');

  if (!slider || !loadDisplay) return;
  let currentFacility = 'Industrial Manufacturing Plant';

  facilityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      facilityBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFacility = btn.dataset.facility || btn.innerText.trim();
      recalculate();
    });
  });

  slider.addEventListener('input', () => {
    loadDisplay.textContent = slider.value + ' kVA';
    recalculate();
  });

  // Quick Preset Buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      slider.value = btn.dataset.kva;
      recalculate();
    });
  });

  function recalculate() {
    const load = parseInt(slider.value, 10);
    loadDisplay.textContent = load + ' kVA';

    let trafoKva = 100;
    if (load <= 100) trafoKva = 160;
    else if (load <= 200) trafoKva = 250;
    else if (load <= 315) trafoKva = 400;
    else if (load <= 500) trafoKva = 630;
    else if (load <= 800) trafoKva = 1000;
    else if (load <= 1250) trafoKva = 1600;
    else if (load <= 2000) trafoKva = 2500;
    else if (load <= 3150) trafoKva = 4000;
    else trafoKva = 5000;

    let voltage = '415V LT (3-Phase)';
    if (load >= 300 && load < 1500) { voltage = '11 kV HT Dual Source'; }
    else if (load >= 1500 && load <= 3000) { voltage = '33 kV HT Substation'; }
    else if (load > 3000) { voltage = '33 kV / 66 kV Grid Substation'; }

    let switchgear = 'LT ACB 630A with Microprocessor Trip';
    if (load > 200 && load <= 500) { switchgear = '11kV VCB Indoor Kiosk + LT PSC 1000A ACB'; }
    else if (load > 500 && load <= 1250) { switchgear = '11kV VCB 630A 26.3kA + LT Drawout PCC 2500A'; }
    else if (load > 1250 && load <= 2500) { switchgear = '33kV Outdoor VCB / SF6 + Dual Busbar HT Panel'; }
    else if (load > 2500) {
      switchgear = '33kV/66kV Outdoor AIS Substation Yard with CT/PT & Isolators';
    }

    let cable = '3.5C x 185 sq.mm Al XLPE Armoured';
    if (load <= 150) cable = '3.5C x 95 sq.mm Al XLPE Armoured';
    else if (load <= 400) cable = '3.5C x 240 sq.mm Al XLPE Armoured';
    else if (load <= 800) cable = '2 Runs x 3.5C 300 sq.mm Al XLPE Armoured';
    else if (load <= 1500) cable = '3 Runs x 3.5C 400 sq.mm Al XLPE / 11kV HT Cable';
    else cable = 'Multi-run 11kV/33kV Grade XLPE HT Armoured Cable';

    const apfcKvar = Math.round(load * 0.35);

    let timeline = '2 to 3 Weeks';
    if (load > 300 && load <= 1000) timeline = '3 to 5 Weeks';
    else if (load > 1000 && load <= 2500) timeline = '5 to 8 Weeks';
    else if (load > 2500) timeline = '8 to 12 Weeks (Full Turnkey Grid)';

    if (outTransformer) outTransformer.textContent = trafoKva + ' kVA (Oil Cooled / Dry Type)';
    if (outVoltage) outVoltage.textContent = voltage;
    if (outSwitchgear) outSwitchgear.textContent = switchgear;
    if (outCable) outCable.textContent = cable;
    if (outApfc) outApfc.textContent = apfcKvar + ' kVAR Auto-Switched';
    if (outTimeline) outTimeline.textContent = timeline;
    if (outSummary) {
      outSummary.textContent = 'Turnkey engineering package for ' + currentFacility + ' with ' + load + ' kVA connected demand. Includes CEIG statutory liaison, earthing grid, and complete test certification.';
    }

    if (whatsappQuoteBtn) {
      const msg = encodeURIComponent(
        'Hello Mathurai Electricals & Contractors! I would like to request an official turnkey estimate for our facility:\n\n' +
        '• Facility Type: ' + currentFacility + '\n' +
        '• Connected Load: ' + load + ' kVA\n' +
        '• Recommended Transformer: ' + trafoKva + ' kVA\n' +
        '• Voltage Level: ' + voltage + '\n' +
        '• Est. Timeline: ' + timeline + '\n\n' +
        'Please arrange a site visit or technical proposal.'
      );
      whatsappQuoteBtn.href = 'https://wa.me/919876543210?text=' + msg;
    }
  }

  recalculate();
}

function initProjectFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter || 'all';

      cards.forEach(card => {
        const category = card.dataset.category || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

function initFaqAccordion() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');

    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach(other => {
        other.classList.remove('active');
        const otherBody = other.querySelector('.accordion-body');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const email = form.querySelector('[name="email"]')?.value || '';
    const service = form.querySelector('[name="service"]')?.value || 'General Inquiry';
    const message = form.querySelector('[name="message"]')?.value || '';

    if (!name || !phone) {
      showToast('Please fill in your name and contact phone number.');
      return;
    }

    showToast('Quote inquiry submitted! Connecting with Mathurai Electricals engineering desk...');

    const waText = encodeURIComponent(
      '*New Web Inquiry - Mathurai Electricals & Contractors*\n' +
      '• Name: ' + name + '\n' +
      '• Phone: ' + phone + '\n' +
      '• Email: ' + email + '\n' +
      '• Service Needed: ' + service + '\n' +
      '• Project Details: ' + message
    );

    setTimeout(() => {
      window.open('https://wa.me/919876543210?text=' + waText, '_blank');
      form.reset();
    }, 1200);
  });
}

function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initImageModal() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  if (!modal || !modalImg) return;

  document.querySelectorAll('[data-zoom-src]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.zoomSrc || item.querySelector('img')?.src;
      const title = item.dataset.zoomTitle || item.querySelector('img')?.alt || 'Mathurai Electricals Project Record';
      if (src) {
        modalImg.src = src;
        if (modalCaption) modalCaption.textContent = title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('image-modal')) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function showToast(message) {
  let toast = document.getElementById('toastMsg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastMsg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>' + message + '</span>';

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-close-on-click');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    toggleBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    toggleBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (drawer.classList.contains('active')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}


