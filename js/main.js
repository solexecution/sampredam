/* ==========================================
   Property Sale Website - Main JavaScript
   Config-driven: reads from window.CONFIG
   ========================================== */

const C = window.CONFIG || {};
const P = C.property || {};
const SITE = C.site || {};
const CONTACT = C.contact || {};

document.addEventListener('DOMContentLoaded', () => {
  hydrateServices();
  hydrateHero();
  hydrateHighlights();
  hydrateGallery();
  hydrateRooms();
  hydrateDetails();
  hydrateFeatures();
  hydrateLocation();
  hydrateFaq();
  hydrateContact();
  hydrateShareLinks();
  hydrateFooter();
  hydrateSchema();
  hydrateMeta();

  hydrateFloorPlans();
  hydrateFloatWhatsapp();

  initNavigation();
  initGallery();
  initMortgageCalculator();
  initShareBar();
  initCopyLink();
  initScrollAnimations();
  initSectionTracking();
  initScrollDepthTracking();
  initFloatWhatsapp();
  initParkCarousel();
  calculateMortgage();
});

/* ==============================
   HELPER: check if value is filled
   ============================== */
function filled(val) {
  return val !== undefined && val !== null && val !== '' && val !== false;
}

function hide(el) {
  if (el) el.style.display = 'none';
}

/* SVG icon map for features */
const FEATURE_ICONS = {
  kitchen: '<svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9h18v12H3z"/><path d="M9 9V5a3 3 0 016 0v4"/></svg>',
  garden: '<svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
  glazing: '<svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  heating: '<svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v18M3 12h18"/><path d="M8 8l8 8M16 8l-8 8"/></svg>',
  parking: '<svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/></svg>',
  rooms: '<svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
};

/* SVG icons for highlights strip */
const HIGHLIGHT_ICONS = {
  bed: '<svg class="highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7"/><path d="M1 7h22"/><path d="M6 20v-4a2 2 0 012-2h2a2 2 0 012 2v4"/></svg>',
  bath: '<svg class="highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h16a1 1 0 011 1v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a1 1 0 011-1z"/><path d="M6 12V5a2 2 0 012-2h1a2 2 0 012 2v7"/></svg>',
  sqft: '<svg class="highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>',
  train: '<svg class="highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h4v4H4zM4 16h4v4H4z"/><path d="M6 8v8"/><rect x="14" y="6" width="6" height="12" rx="1"/><path d="M17 9v6"/></svg>',
  garden: '<svg class="highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3c-1.5 0-6 .5-6 5 0 3 2 5 4 7l2 2 2-2c2-2 4-4 4-7 0-4.5-4.5-5-6-5z"/><circle cx="12" cy="8" r="1.5"/><path d="M3 21h18"/></svg>',
  parking: '<svg class="highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/></svg>',
};

/* ==============================
   HYDRATION FUNCTIONS
   ============================== */

function hydrateServices() {
  // Umami
  const umamiScript = document.getElementById('umamiScript');
  if (umamiScript) {
    if (filled(SITE.umamiWebsiteId)) {
      umamiScript.setAttribute('data-website-id', SITE.umamiWebsiteId);
    } else {
      umamiScript.remove();
    }
  }
}

function hydrateHero() {
  // Badge — "Freehold · No Chain"
  const heroBadge = document.getElementById('heroBadge');
  if (heroBadge) {
    const parts = [];
    if (filled(P.tenure)) parts.push(P.tenure);
    if (filled(P.chainStatus)) parts.push(P.chainStatus);
    if (parts.length > 0) {
      heroBadge.textContent = parts.join(' · ');
    } else {
      hide(heroBadge);
    }
  }

  const heroSpecs = document.getElementById('heroSpecs');
  const heroPrice = document.getElementById('heroPrice');

  // Build specs line from available data
  const specs = [];
  if (filled(P.bedrooms)) specs.push(`${P.bedrooms} ${P.bedrooms === '1' ? 'Bedroom' : 'Bedrooms'}`);
  if (filled(P.bathrooms)) specs.push(`${P.bathrooms} ${P.bathrooms === '1' ? 'Bathroom' : 'Bathrooms'}`);
  if (filled(P.floorAreaSqFt)) specs.push(`${P.floorAreaSqFt} sq ft`);

  if (specs.length > 0) {
    heroSpecs.innerHTML = specs.map((s, i) =>
      `<span>${s}</span>${i < specs.length - 1 ? '<span class="spec-divider">|</span>' : ''}`
    ).join('');
  } else {
    hide(heroSpecs);
  }

  // Price
  if (filled(P.price)) {
    heroPrice.innerHTML = `Guide Price: &pound;${P.price}`;
  } else {
    hide(heroPrice);
  }
}

function hydrateHighlights() {
  const grid = document.getElementById('highlightsGrid');
  const items = [];

  if (filled(P.bedrooms)) items.push({ icon: 'bed', value: P.bedrooms, label: P.bedrooms === '1' ? 'Bedroom' : 'Bedrooms' });
  if (filled(P.bathrooms)) items.push({ icon: 'bath', value: P.bathrooms, label: P.bathrooms === '1' ? 'Bathroom' : 'Bathrooms' });
  if (filled(P.floorAreaSqFt)) items.push({ icon: 'sqft', value: P.floorAreaSqFt, label: 'Sq Ft' });
  if (filled(P.walkToStation)) items.push({ icon: 'train', value: P.walkToStation, label: 'To Reading Station' });
  items.push({ icon: 'train', value: '25 min', label: 'Reading → Paddington' });
  if (filled(P.gardenFacing)) items.push({ icon: 'garden', value: P.gardenFacing, label: 'Garden' });
  if (filled(P.parking)) items.push({ icon: 'parking', value: P.parking, label: 'Easy Parking' });

  if (items.length <= 1) {
    // Only the train item — hide highlights section
    hide(document.getElementById('highlightsSection'));
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="highlight-item">
      ${HIGHLIGHT_ICONS[item.icon] || ''}
      <span class="highlight-value">${item.value}</span>
      <span class="highlight-label">${item.label}</span>
    </div>
  `).join('');
}

function hydrateGallery() {
  const grid = document.getElementById('galleryGrid');
  const gallery = C.gallery || [];
  const placeholders = C.galleryPlaceholders || [];

  if (gallery.length > 0) {
    // Real images
    grid.innerHTML = gallery.map((img, i) => `
      <div class="gallery-item" data-umami-event="gallery-image-click" data-umami-event-image="${img.alt}">
        <img src="${img.src}" alt="${img.alt}" loading="${i === 0 ? 'eager' : 'lazy'}">
      </div>
    `).join('');
  } else {
    // Placeholder boxes
    const placeholderSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>';
    grid.innerHTML = placeholders.map(label => `
      <div class="gallery-item">
        <div class="gallery-placeholder">
          ${placeholderSvg}
          <span>${label}</span>
        </div>
      </div>
    `).join('');
  }
}

function hydrateRooms() {
  const container = document.getElementById('roomBreakdown');
  const rooms = C.rooms || [];

  if (rooms.length === 0) {
    hide(container);
    return;
  }

  const rows = rooms.map(room => {
    const dims = filled(room.dimensions) ? `<span class="room-dimensions">${room.dimensions}</span>` : '';
    const desc = filled(room.description) ? `<span class="room-description">${room.description}</span>` : '';
    return `
      <div class="room-row">
        <span class="room-name">${room.name}</span>
        ${dims}
        ${desc}
      </div>
    `;
  }).join('');

  container.innerHTML = `<h3>Room Breakdown</h3>${rows}`;
}

function hydrateDetails() {
  // Description paragraphs
  const descEl = document.getElementById('detailsDescription');
  const desc = C.description || [];
  if (desc.length > 0) {
    descEl.innerHTML = desc.map(p => `<p>${p}</p>`).join('');
  } else {
    descEl.innerHTML = '<p class="config-missing" data-config-label="Add description paragraphs in config.js">Property description will appear here.</p>';
  }

  // Specs list
  const specsList = document.getElementById('specsList');
  const specs = [
    { label: 'Property Type', value: P.propertyType },
    { label: 'Bedrooms', value: P.bedrooms },
    { label: 'Bathrooms', value: P.bathrooms },
    { label: 'Reception Rooms', value: P.receptionRooms },
    { label: 'Floor Area', value: filled(P.floorAreaSqFt) ? `${P.floorAreaSqFt} sq ft${filled(P.floorAreaSqM) ? ` / ${P.floorAreaSqM} sq m` : ''}` : '' },
    { label: 'Garden', value: P.garden },
    { label: 'Parking', value: P.parking },
    { label: 'EPC Rating', value: P.epcRating },
    { label: 'Council Tax Band', value: P.councilTaxBand },
    { label: 'Tenure', value: P.tenure },
    { label: 'Year Built', value: P.yearBuilt },
  ];

  // Only show specs that have values
  const filledSpecs = specs.filter(s => filled(s.value));
  if (filledSpecs.length > 0) {
    specsList.innerHTML = filledSpecs.map(s =>
      `<li><strong>${s.label}:</strong> <span>${s.value}</span></li>`
    ).join('');
  } else {
    specsList.innerHTML = '<li class="config-missing" data-config-label="Fill in property details in config.js">No specifications added yet</li>';
  }
}

function hydrateFeatures() {
  const grid = document.getElementById('featuresGrid');
  const features = C.features || [];

  if (features.length === 0) {
    hide(grid);
    return;
  }

  grid.innerHTML = features.map(f => `
    <div class="feature-card">
      ${FEATURE_ICONS[f.icon] || ''}
      <h4>${f.title}</h4>
      <p>${f.description}</p>
    </div>
  `).join('');
}

function hydrateFloorPlans() {
  const container = document.getElementById('floorPlans');
  const plans = C.floorPlans || [];

  if (plans.length === 0) {
    hide(container);
    return;
  }

  const blueprintSvg = `<svg class="floorplan-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="1"/>
    <path d="M2 8h12v12H2"/><path d="M8 8v12"/><path d="M2 14h6"/>
    <path d="M14 8h8"/><path d="M14 13h8"/><path d="M14 18h8"/>
  </svg>`;

  const tiles = plans.map(plan => {
    if (filled(plan.src)) {
      return `
        <div class="floorplan-item">
          <img src="${plan.src}" alt="${plan.label} floor plan" loading="lazy">
          <span class="floorplan-label">${plan.label}</span>
        </div>`;
    }
    return `
      <div class="floorplan-item floorplan-placeholder-item">
        ${blueprintSvg}
        <span class="floorplan-label">${plan.label}</span>
        <span class="floorplan-hint">Add image to config.js</span>
      </div>`;
  }).join('');

  container.innerHTML = `<h3>Floor Plans</h3><div class="floorplan-grid">${tiles}</div>`;
}

function hydrateLocation() {
  const el = document.getElementById('priceContextPara');
  if (!el) return;
  if (filled(P.priceContext)) {
    el.innerHTML = P.priceContext;
  }
}

function hydrateFaq() {
  const faqList = document.getElementById('faqList');
  const faqConfig = C.faq || {};
  const rc = C.runningCosts || {};
  const price = P.price;

  // Default FAQ items with config overrides
  const faqs = [
    {
      key: 'askingPrice',
      q: 'What is the asking price?',
      defaultA: filled(price)
        ? `The guide price is &pound;${price}. This has been competitively positioned considering average property values in the RG4 7 area, which currently stand at approximately &pound;590,000.`
        : 'Please contact us for the current asking price.',
    },
    {
      key: 'tenure',
      q: 'Is the property freehold or leasehold?',
      defaultA: filled(P.tenure)
        ? P.tenure === 'Freehold'
          ? 'The property is freehold, meaning you own the property and the land it stands on outright with no ground rent or service charges.'
          : `The property is ${P.tenure}. Please contact us for full details of the lease terms.`
        : 'Please contact us for tenure details.',
    },
    {
      key: 'epc',
      q: 'What is the EPC rating?',
      defaultA: filled(P.epcRating)
        ? `The property has an EPC rating of ${P.epcRating}. The full Energy Performance Certificate is available on request.`
        : 'The EPC rating is available on request.',
    },
    {
      key: 'viewings',
      q: 'How do viewings work?',
      defaultA: 'Viewings are arranged directly with us at times convenient for you. We offer flexible appointments including evenings and weekends. Simply contact us using any of the methods below to arrange a time that works for you.',
    },
    {
      key: 'privateSale',
      q: 'Why is this being sold privately?',
      defaultA: 'We\'re selling directly to provide a more personal experience and to save both parties estate agent fees. This means we can offer a more competitive price while you deal directly with the people who know this home best \u2014 the owners.',
    },
    {
      key: 'included',
      q: 'What is included in the sale?',
      defaultA: 'All fixtures and fittings are included as standard. Integrated kitchen appliances are included. Specific items such as curtains, blinds, and free-standing appliances are negotiable. A full fixtures and fittings list will be provided to serious buyers.',
    },
    {
      key: 'chain',
      q: 'Is there a chain?',
      defaultA: filled(P.chainStatus)
        ? `${P.chainStatus}. We are motivated sellers looking for a smooth, timely completion.`
        : 'Please contact us for the latest information regarding the chain status. We are motivated sellers looking for a smooth, timely completion.',
    },
    {
      key: 'runningCosts',
      q: 'What are the running costs?',
      defaultA: buildRunningCostsAnswer(rc),
    },
    {
      key: 'survey',
      q: 'Can I get a survey done?',
      defaultA: 'Absolutely. We welcome and encourage buyers to commission their own independent survey. We\'re happy to provide access to the property for any surveyor at a mutually convenient time.',
    },
    {
      key: 'makingOffer',
      q: 'How do I make an offer?',
      defaultA: 'Once you\'ve viewed the property and would like to make an offer, simply contact us directly. We\'ll discuss your offer, your position (chain status, mortgage approval), and agree on next steps. We recommend having a mortgage agreement in principle ready.',
    },
  ];

  const html = faqs
    .filter(faq => faqConfig[faq.key] !== false) // false = hidden
    .map(faq => {
      const answer = filled(faqConfig[faq.key]) ? faqConfig[faq.key] : faq.defaultA;
      return `
        <details class="faq-item">
          <summary data-umami-event="faq-expand" data-umami-event-question="${faq.key}">${faq.q}</summary>
          <div class="faq-answer"><p>${answer}</p></div>
        </details>
      `;
    }).join('');

  faqList.innerHTML = html;
}

function buildRunningCostsAnswer(rc) {
  const parts = [];
  if (filled(P.councilTaxBand) || filled(rc.councilTaxYearly)) {
    let ct = '<strong>Council Tax:</strong> ';
    if (filled(P.councilTaxBand)) ct += `Band ${P.councilTaxBand}`;
    if (filled(rc.councilTaxYearly)) ct += ` \u2014 approximately &pound;${rc.councilTaxYearly} per year`;
    parts.push(ct);
  }
  if (filled(rc.energyBillsMonthly)) {
    parts.push(`<strong>Energy Bills:</strong> Approximately &pound;${rc.energyBillsMonthly} per month (gas & electric)`);
  }
  if (filled(rc.waterBillsYearly)) {
    parts.push(`<strong>Water:</strong> Approximately &pound;${rc.waterBillsYearly} per year`);
  }
  return parts.length > 0
    ? parts.join('<br>')
    : 'Please contact us for details about running costs.';
}

function hydrateContact() {
  // Populate day dropdown with next 14 days
  const daySelect = document.getElementById('viewingDay');
  if (daySelect) {
    const now = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() + i);
      const dayName = d.toLocaleDateString('en-GB', { weekday: 'short' });
      const label = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
      const value = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = `${dayName} ${d.getDate()} ${d.toLocaleDateString('en-GB', { month: 'short' })}`;
      daySelect.appendChild(opt);
    }
  }

  // Open house slots
  const openHouseContainer = document.getElementById('openHouseSlots');
  const openHouseSlots = C.openHouse || [];
  if (openHouseContainer && openHouseSlots.length > 0) {
    const address = `${P.streetAddress || ''} ${P.postcode || ''}`.trim();
    const calIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`;
    const slotsHtml = openHouseSlots.map(slot => {
      const msg = encodeURIComponent(`Hi! I'd like to attend the open house on ${slot.date} at ${slot.time}. Re: ${address}. See you there!`);
      const href = filled(CONTACT.whatsapp)
        ? `https://wa.me/${CONTACT.whatsapp}?text=${msg}`
        : `mailto:${CONTACT.email || ''}?subject=${encodeURIComponent('Open House — ' + address)}&body=${msg}`;
      return `<a href="${href}" target="_blank" rel="noopener" class="open-house-slot" data-umami-event="open-house-click" data-umami-event-date="${slot.date}">
        ${calIcon}<span class="slot-date">${slot.date}</span><span class="slot-time">${slot.time}</span>
      </a>`;
    }).join('');
    openHouseContainer.innerHTML = `
      <h4 class="open-house-heading">Open House</h4>
      <div class="open-house-list">${slotsHtml}</div>
      <p class="open-house-or">or pick your own time below</p>`;
  } else if (openHouseContainer) {
    hide(openHouseContainer);
  }

  // Helper: get selected viewing slot text
  function getSlotText() {
    const day = document.getElementById('viewingDay')?.value || '';
    const time = document.getElementById('viewingTime')?.value || '';
    if (day && time) return `I'd like to view on ${day} at ${time}.`;
    if (day) return `I'd like to view on ${day}.`;
    if (time) return `I'd like to view at ${time}.`;
    return '';
  }

  // Build contact buttons
  const buttons = document.getElementById('contactButtons');
  const address = `${P.streetAddress || ''} ${P.postcode || ''}`.trim();

  function renderButtons() {
    const slot = getSlotText();
    const html = [];

    if (filled(CONTACT.phone)) {
      html.push(`
        <a href="tel:${CONTACT.phone}" class="contact-btn phone-btn" data-umami-event="contact-phone">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          <div><span>Call Us</span><small>${CONTACT.phoneDisplay || CONTACT.phone}</small></div>
        </a>
      `);
    }

    if (filled(CONTACT.whatsapp)) {
      const slotPart = slot ? ` ${slot}` : '';
      const waMsg = encodeURIComponent(`Hi!${slotPart} Re: ${address}. Is that available?`);
      html.push(`
        <a href="https://wa.me/${CONTACT.whatsapp}?text=${waMsg}" target="_blank" rel="noopener" class="contact-btn whatsapp-btn" data-umami-event="contact-whatsapp">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          <div><span>WhatsApp</span><small>Quick response guaranteed</small></div>
        </a>
      `);
    }

    if (filled(CONTACT.email)) {
      const subject = encodeURIComponent(`Viewing Request — ${address}`);
      const bodyText = slot
        ? `Hi,\n\n${slot}\n\nRe: ${address}\n\nPlease let me know if this works.\n\nThank you`
        : `Hi,\n\nI'm interested in viewing the property at ${address}.\n\nPlease let me know available times.\n\nThank you`;
      const body = encodeURIComponent(bodyText);
      html.push(`
        <a href="mailto:${CONTACT.email}?subject=${subject}&body=${body}" class="contact-btn email-btn" data-umami-event="contact-email">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
          <div><span>Email</span><small>${CONTACT.email}</small></div>
        </a>
      `);
    }

    if (html.length === 0) {
      buttons.innerHTML = '<div class="config-missing" data-config-label="Add contact details in config.js">Contact buttons will appear here</div>';
    } else {
      buttons.innerHTML = html.join('');
    }
  }

  // Initial render
  renderButtons();

  // Re-render buttons when viewing slot changes so links stay fresh
  document.getElementById('viewingDay')?.addEventListener('change', renderButtons);
  document.getElementById('viewingTime')?.addEventListener('change', renderButtons);
}

function hydrateShareLinks() {
  const siteUrl = encodeURIComponent(SITE.url || window.location.href);
  const shareText = encodeURIComponent(`Beautiful family home for sale in Caversham, Reading #PropertyForSale #CavershamProperty`);

  const fb = document.getElementById('shareFacebook');
  const tw = document.getElementById('shareTwitter');
  const wa = document.getElementById('shareWhatsApp');
  const li = document.getElementById('shareLinkedIn');

  if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${siteUrl}`;
  if (tw) tw.href = `https://twitter.com/intent/tweet?url=${siteUrl}&text=${shareText}`;
  if (wa) wa.href = `https://api.whatsapp.com/send?text=Check%20out%20this%20beautiful%20property%20in%20Caversham%2C%20Reading%20${siteUrl}`;
  if (li) li.href = `https://www.linkedin.com/sharing/share-offsite/?url=${siteUrl}`;
}

function hydrateFooter() {
  // Address
  const footerAddr = document.getElementById('footerAddress');
  if (filled(P.streetAddress)) {
    footerAddr.innerHTML = `<strong>${P.streetAddress}, ${P.locality || 'Caversham, Reading'} ${P.postcode}</strong>`;
  }

  // EPC link
  const epcLink = document.getElementById('epcLink');
  if (filled(C.epcCertificateUrl)) {
    epcLink.href = C.epcCertificateUrl;
    epcLink.target = '_blank';
    epcLink.rel = 'noopener';
  } else {
    hide(epcLink);
  }

  // Nav logo
  const navLogo = document.getElementById('navLogo');
  if (filled(P.streetAddress)) {
    navLogo.textContent = P.streetAddress;
  }
}

function hydrateSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: `Family Home for Sale - ${P.streetAddress ? P.streetAddress + ', ' : ''}Caversham, Reading ${P.postcode || 'RG4 7QD'}`,
    description: (C.description || []).join(' ').substring(0, 300),
    datePosted: '2026-02-17',
    url: SITE.url || 'https://40sheridan.xyz/',
  };

  if (filled(P.price)) {
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: P.price.replace(/,/g, ''),
      availability: 'https://schema.org/InStock',
    };
  }

  if (filled(P.streetAddress)) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: P.streetAddress,
      addressLocality: P.locality || 'Caversham, Reading',
      addressRegion: 'Berkshire',
      postalCode: P.postcode || 'RG4 7QD',
      addressCountry: 'GB',
    };
  }

  if (filled(P.bedrooms)) schema.numberOfRooms = P.bedrooms;

  const el = document.getElementById('schemaData');
  if (el) el.textContent = JSON.stringify(schema, null, 2);
}

function hydrateMeta() {
  const url = SITE.url || 'https://40sheridan.xyz';
  const setAttr = (id, attr, val) => {
    const el = document.getElementById(id);
    if (el && val) el.setAttribute(attr, val);
  };

  setAttr('ogUrl', 'content', url + '/');
  setAttr('ogImage', 'content', url + '/images/og-image.jpg');
  setAttr('twitterImage', 'content', url + '/images/og-image.jpg');
  setAttr('canonical', 'href', url + '/');

  // Update title if we have address
  if (filled(P.streetAddress)) {
    const title = `${P.streetAddress}, Caversham, Reading | For Sale`;
    document.title = title;
    setAttr('ogTitle', 'content', title);
    setAttr('twitterTitle', 'content', title);
  }

  // Set mortgage calculator default to property price
  if (filled(P.price)) {
    const priceNum = parseInt(P.price.replace(/,/g, ''));
    if (priceNum > 0) {
      const slider = document.getElementById('calcPrice');
      slider.max = Math.max(parseInt(slider.max), priceNum);
      slider.value = priceNum;
    }
  }
}

/* ==============================
   INTERACTIVE FEATURES
   ============================== */

/* --- Navigation --- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* --- Gallery Lightbox --- */
function initGallery() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  const images = [];
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
      images.push({ src: img.src, alt: img.alt });
    }
  });

  if (images.length === 0) return; // No real images, skip lightbox

  let currentIndex = 0;

  function openLightbox(index) {
    if (!images[index]) return;
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
    lightboxCounter.textContent = `${currentIndex + 1} of ${images.length}`;
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add('active'));
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeys);
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => { lightbox.hidden = true; lightboxImg.src = ''; }, 300);
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeys);
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
    lightboxCounter.textContent = `${currentIndex + 1} of ${images.length}`;
  }

  function handleKeys(e) {
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') navigate(-1);
    else if (e.key === 'ArrowRight') navigate(1);
  }

  // Only bind click to items that have real images
  galleryItems.forEach((item, i) => {
    if (item.querySelector('img')) {
      item.addEventListener('click', () => openLightbox(i));
    }
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) closeLightbox();
  });

  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  }, { passive: true });
}

/* --- Park Carousel --- */
function initParkCarousel() {
  const carousel = document.getElementById('parkCarousel');
  if (!carousel) return;
  const track = carousel.querySelector('.park-carousel-track');
  const slides = track.querySelectorAll('.park-carousel-slide');
  const dotsContainer = document.getElementById('parkCarouselDots');
  if (slides.length < 2) return;

  let current = 0;
  let timer;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'park-carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(idx) {
    current = idx;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dotsContainer.querySelectorAll('.park-carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function next() { goTo((current + 1) % slides.length); }

  // Auto-advance every 4s
  function startTimer() { timer = setInterval(next, 4000); }
  function resetTimer() { clearInterval(timer); startTimer(); }
  startTimer();

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', startTimer);

  // Swipe + tap support
  let touchX = 0;
  let touchY = 0;
  let touchTime = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
    touchTime = Date.now();
    clearInterval(timer);
  }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    const dx = touchX - e.changedTouches[0].clientX;
    const dy = touchY - e.changedTouches[0].clientY;
    const dt = Date.now() - touchTime;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      goTo(dx > 0 ? (current + 1) % slides.length : (current - 1 + slides.length) % slides.length);
    } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && dt < 300) {
      // Tap — open lightbox
      openLightbox(current);
    }
    startTimer();
  }, { passive: true });

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCaption = document.getElementById('lightboxCaption');
  let lbIdx = 0;
  const images = Array.from(slides).map(s => ({
    src: s.querySelector('img').src,
    alt: s.querySelector('img').alt,
    caption: s.querySelector('.park-carousel-caption').textContent,
  }));

  function openLightbox(idx) {
    lbIdx = idx;
    lbImg.src = images[idx].src;
    lbImg.alt = images[idx].alt;
    lbCaption.textContent = images[idx].caption;
    lb.hidden = false;
    clearInterval(timer);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.hidden = true;
    document.body.style.overflow = '';
    startTimer();
  }

  function lbNav(dir) {
    lbIdx = (lbIdx + dir + images.length) % images.length;
    lbImg.src = images[lbIdx].src;
    lbImg.alt = images[lbIdx].alt;
    lbCaption.textContent = images[lbIdx].caption;
  }

  // Desktop click
  slides.forEach((s, i) => s.addEventListener('click', () => openLightbox(i)));
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => lbNav(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => lbNav(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });

  // Lightbox touch swipe
  let lbTouchX = 0;
  lb.addEventListener('touchstart', (e) => { lbTouchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    const diff = lbTouchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) lbNav(diff > 0 ? 1 : -1);
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbNav(-1);
    if (e.key === 'ArrowRight') lbNav(1);
  });
}

/* --- Mortgage Calculator --- */
function initMortgageCalculator() {
  ['calcPrice', 'calcDeposit', 'calcRate', 'calcTerm'].forEach(id => {
    document.getElementById(id).addEventListener('input', calculateMortgage);
  });
}

function calculateMortgage() {
  const price = parseFloat(document.getElementById('calcPrice').value) || 0;
  const depositPercent = parseFloat(document.getElementById('calcDeposit').value) || 10;
  const rate = parseFloat(document.getElementById('calcRate').value) || 4.5;
  const term = parseInt(document.getElementById('calcTerm').value) || 25;

  const deposit = price * (depositPercent / 100);
  const principal = price - deposit;
  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;

  // Update slider labels
  document.getElementById('priceDisplay').textContent = formatCurrency(price);
  document.getElementById('depositDisplay').textContent = depositPercent + '% \u00b7 ' + formatCurrency(deposit);
  document.getElementById('rateDisplay').textContent = parseFloat(rate).toFixed(1) + '%';
  document.getElementById('termDisplay').textContent = term + ' yrs';

  let monthly = 0;
  if (monthlyRate > 0 && numPayments > 0 && principal > 0) {
    monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))
      / (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const total = monthly * numPayments;
  const interest = total - principal;
  const daily = monthly / 30.44;

  document.getElementById('calcMonthly').textContent = formatCurrency(monthly);
  document.getElementById('calcLoan').textContent = formatCurrency(principal);
  document.getElementById('calcInterest').textContent = formatCurrency(interest);
  document.getElementById('calcTotal').textContent = formatCurrency(total);
  document.getElementById('calcDaily').textContent = monthly > 0 ? formatCurrency(daily) + ' / day' : '';

  // Repayment bar
  const bar = document.getElementById('calcRepayBar');
  if (monthly > 0 && total > 0) {
    bar.hidden = false;
    document.getElementById('calcRepayPrincipal').style.width = (principal / total * 100).toFixed(1) + '%';
    document.getElementById('calcRepayInterest').style.width = (interest / total * 100).toFixed(1) + '%';
  } else {
    bar.hidden = true;
  }

  if (typeof umami !== 'undefined') {
    umami.track('mortgage-calculate', { price, deposit: depositPercent, monthlyPayment: Math.round(monthly) });
  }
}

function formatCurrency(amount) {
  return '\u00A3' + Math.round(amount).toLocaleString('en-GB');
}

/* --- Share Bar --- */
function initShareBar() {
  const shareToggle = document.getElementById('shareToggle');
  const shareLinks = document.getElementById('shareLinks');
  if (shareToggle) {
    shareToggle.addEventListener('click', () => shareLinks.classList.toggle('active'));
  }
}

/* --- Copy Link --- */
function initCopyLink() {
  const copyBtn = document.getElementById('copyLinkBtn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showCopyTooltip(copyBtn, 'Link copied!');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = window.location.href;
      ta.style.cssText = 'position:fixed;left:-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showCopyTooltip(copyBtn, 'Link copied!');
    }
  });
}

function showCopyTooltip(el, text) {
  const tip = document.createElement('div');
  tip.className = 'copy-tooltip';
  tip.textContent = text;
  el.style.position = 'relative';
  el.appendChild(tip);
  tip.style.cssText = 'left:50%;transform:translateX(-50%);bottom:120%';
  setTimeout(() => tip.remove(), 2000);
}

/* --- Floating WhatsApp --- */
function hydrateFloatWhatsapp() {
  const btn = document.getElementById('floatWhatsapp');
  if (!btn) return;

  if (!filled(CONTACT.whatsapp)) {
    hide(btn);
    return;
  }

  const address = `${P.streetAddress || ''} ${P.postcode || ''}`.trim();
  const msg = encodeURIComponent(`Hi! I'd like to arrange a viewing of ${address}. Is that possible?`);
  btn.href = `https://wa.me/${CONTACT.whatsapp}?text=${msg}`;
  btn.removeAttribute('hidden');
}

function initFloatWhatsapp() {
  const btn = document.getElementById('floatWhatsapp');
  if (!btn || btn.hidden) return;

  let contactVisible = false;

  const contactSection = document.getElementById('contact');
  if (contactSection) {
    new IntersectionObserver((entries) => {
      contactVisible = entries[0].isIntersecting;
      update();
    }, { threshold: 0.3 }).observe(contactSection);
  }

  function update() {
    btn.classList.toggle('visible', window.scrollY > 300 && !contactVisible);
  }

  window.addEventListener('scroll', update, { passive: true });
}

/* --- Umami: Section Reach Tracking (funnel) --- */
function initSectionTracking() {
  const sections = [
    { id: 'gallery',    label: 'gallery' },
    { id: 'details',    label: 'details' },
    { id: 'location',   label: 'location' },
    { id: 'calculator', label: 'calculator' },
    { id: 'faq',        label: 'faq' },
    { id: 'contact',    label: 'contact' },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const label = entry.target.dataset.trackSection;
        if (typeof umami !== 'undefined') {
          umami.track('section-reached', { section: label });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(({ id, label }) => {
    const el = document.getElementById(id);
    if (el) {
      el.dataset.trackSection = label;
      observer.observe(el);
    }
  });
}

/* --- Umami: Scroll Depth Tracking --- */
function initScrollDepthTracking() {
  const milestones = [25, 50, 75, 100];
  const reached = new Set();

  window.addEventListener('scroll', () => {
    const pct = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    );
    milestones.forEach(m => {
      if (pct >= m && !reached.has(m)) {
        reached.add(m);
        if (typeof umami !== 'undefined') {
          umami.track('scroll-depth', { depth: m + '%' });
        }
      }
    });
  }, { passive: true });
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
  const els = document.querySelectorAll('.feature-card, .location-card, .faq-item, .highlight-item, .contact-btn');
  els.forEach(el => el.classList.add('fade-in'));

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => observer.observe(el));
}
