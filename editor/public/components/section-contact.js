function nextWeekend() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 6=Sat
  // If it's already Fri/Sat/Sun, skip to NEXT weekend
  let daysToSat;
  if (day >= 5 || day === 0) {
    // Fri=5→8, Sat=6→7, Sun=0→6 days to next Saturday
    daysToSat = day === 0 ? 6 : (13 - day);
  } else {
    // Mon-Thu: next Saturday
    daysToSat = 6 - day;
  }
  const sat = new Date(now);
  sat.setDate(now.getDate() + daysToSat);
  const sun = new Date(sat);
  sun.setDate(sat.getDate() + 1);
  return { sat, sun };
}

function formatDateForInput(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function parseDateToInput(dateStr) {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  // Strip day name prefix like "Saturday, " or "Saturday "
  const stripped = dateStr.replace(/^[A-Za-z]+[,]?\s*/, '');
  // Parse in local time by creating via Date.parse then correcting for timezone
  const months = { January:0, February:1, March:2, April:3, May:4, June:5, July:6, August:7, September:8, October:9, November:10, December:11 };
  const m = stripped.match(/^(\d{1,2})\s+(\w+)\s+(\d{4})$/);
  if (m) {
    const d = new Date(+m[3], months[m[2]], +m[1]);
    if (!isNaN(d)) return formatDateForInput(d);
  }
  return '';
}

export class ContactSection {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
  }

  render() {
    const c = this.config.contact || {};
    const rc = this.config.runningCosts || {};
    const sp = this.config.socialProof || {};

    // Auto-populate viewing slots with next weekend if empty or past
    if (!this.config.openHouse) this.config.openHouse = [];
    this.cleanupPastSlots();
    if (this.config.openHouse.length === 0) {
      const { sat, sun } = nextWeekend();
      this.config.openHouse = [
        { date: formatDateForInput(sat), time: '11:00 – 14:00' },
        { date: formatDateForInput(sun), time: '11:00 – 13:00' },
      ];
    }
    const openHouse = this.config.openHouse;

    const div = document.createElement('div');
    div.className = 'section-form';
    div.innerHTML = `
      <h2>Contact &amp; Viewings</h2>
      <p class="section-help">Contact details shown on the listing and used for WhatsApp/phone CTAs.</p>

      <div class="form-row">
        <div class="form-group">
          <label>Phone (tel: link)</label>
          <input type="text" data-path="contact.phone" value="${this.esc(c.phone)}" placeholder="+447123456789">
        </div>
        <div class="form-group">
          <label>Phone Display</label>
          <input type="text" data-path="contact.phoneDisplay" value="${this.esc(c.phoneDisplay)}" placeholder="07123 456 789">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>WhatsApp Number</label>
          <input type="text" data-path="contact.whatsapp" value="${this.esc(c.whatsapp)}" placeholder="447123456789 (no + or spaces)">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="text" data-path="contact.email" value="${this.esc(c.email)}" placeholder="you@example.com">
        </div>
      </div>

      <h3 style="margin-top:24px;margin-bottom:8px">Running Costs (shown in FAQ)</h3>
      <div class="form-row-3">
        <div class="form-group">
          <label>Council Tax / Year (&pound;)</label>
          <input type="text" data-path="runningCosts.councilTaxYearly" value="${this.esc(rc.councilTaxYearly)}" placeholder="e.g. 2,100">
        </div>
        <div class="form-group">
          <label>Energy Bills / Month (&pound;)</label>
          <input type="text" data-path="runningCosts.energyBillsMonthly" value="${this.esc(rc.energyBillsMonthly)}" placeholder="e.g. 150">
        </div>
        <div class="form-group">
          <label>Water Bills / Year (&pound;)</label>
          <input type="text" data-path="runningCosts.waterBillsYearly" value="${this.esc(rc.waterBillsYearly)}" placeholder="e.g. 400">
        </div>
      </div>

      <h3 style="margin-top:24px;margin-bottom:8px">Social Proof Widget</h3>
      <div class="toggle-row">
        <label class="toggle-switch">
          <input type="checkbox" id="showWidget" ${sp.showWidget ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-label">Show social proof widget</span>
      </div>
      <div class="form-group">
        <label>Viewings Booked</label>
        <input type="number" id="viewingsBooked" value="${sp.viewingsBooked || 0}" min="0">
      </div>

      <h3 style="margin-top:24px;margin-bottom:8px">Viewing Slots</h3>
      <p class="section-help">Pre-set viewing slots shown as one-click WhatsApp buttons. Defaults to the next weekend if empty.</p>
      <div class="list-items" id="openHouseList"></div>
      <button class="btn-add" id="addSlot">+ Add Slot</button>
    `;

    this.renderSlots(div, openHouse);

    // Bind simple fields
    div.querySelectorAll('[data-path]').forEach(el => {
      el.addEventListener('input', () => {
        const [obj, key] = el.dataset.path.split('.');
        if (!this.config[obj]) this.config[obj] = {};
        this.config[obj][key] = el.value;
        this.onChange(this.config);
      });
    });

    div.querySelector('#showWidget').addEventListener('change', e => {
      if (!this.config.socialProof) this.config.socialProof = {};
      this.config.socialProof.showWidget = e.target.checked;
      this.onChange(this.config);
    });

    div.querySelector('#viewingsBooked').addEventListener('input', e => {
      if (!this.config.socialProof) this.config.socialProof = {};
      this.config.socialProof.viewingsBooked = parseInt(e.target.value) || 0;
      this.onChange(this.config);
    });

    div.querySelector('#addSlot').addEventListener('click', () => {
      // Default new slot to next available weekend day
      const existing = this.config.openHouse.map(s => s.date);
      const { sat, sun } = nextWeekend();
      let defaultDate = formatDateForInput(sat);
      if (existing.includes(defaultDate)) defaultDate = formatDateForInput(sun);
      this.config.openHouse.push({ date: defaultDate, time: '11:00 – 13:00' });
      this.renderSlots(div, this.config.openHouse);
      this.onChange(this.config);
    });

    return div;
  }

  cleanupPastSlots() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.config.openHouse = this.config.openHouse.filter(s => {
      const inputDate = parseDateToInput(s.date);
      if (!inputDate) return false;
      const d = new Date(inputDate + 'T00:00:00');
      return d >= today;
    });
  }

  renderSlots(container, slots) {
    const list = container.querySelector('#openHouseList');
    list.innerHTML = slots.map((s, i) => {
      const inputDate = parseDateToInput(s.date);
      const display = formatDateDisplay(inputDate) || s.date || `Slot ${i + 1}`;
      return `
      <div class="list-item" data-index="${i}">
        <div class="item-header">
          <span class="item-title">${this.esc(display)}</span>
          <button class="btn-remove" data-index="${i}">Remove</button>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Date</label>
            <input type="date" data-index="${i}" data-key="date" value="${this.esc(inputDate)}">
          </div>
          <div class="form-group">
            <label>Time</label>
            <input type="text" data-index="${i}" data-key="time" value="${this.esc(s.time)}" placeholder="e.g. 11:00 – 13:00">
          </div>
        </div>
      </div>`;
    }).join('');

    list.querySelectorAll('input').forEach(el => {
      el.addEventListener('input', () => {
        const idx = +el.dataset.index;
        const key = el.dataset.key;
        if (key === 'date') {
          // Store as display string for the listing site
          this.config.openHouse[idx].date = formatDateDisplay(el.value);
          // Update header title
          const header = el.closest('.list-item').querySelector('.item-title');
          if (header) header.textContent = formatDateDisplay(el.value);
        } else {
          this.config.openHouse[idx][key] = el.value;
        }
        this.onChange(this.config);
      });
    });

    list.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        this.config.openHouse.splice(+btn.dataset.index, 1);
        this.renderSlots(container, this.config.openHouse);
        this.onChange(this.config);
      });
    });
  }

  esc(val) { return (val || '').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
}
