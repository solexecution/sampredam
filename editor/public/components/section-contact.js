export class ContactSection {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
  }

  render() {
    const c = this.config.contact || {};
    const rc = this.config.runningCosts || {};
    const sp = this.config.socialProof || {};
    const openHouse = this.config.openHouse || [];

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

      <h3 style="margin-top:24px;margin-bottom:8px">Open House Slots</h3>
      <p class="section-help">Pre-set viewing slots shown as one-click WhatsApp buttons. Leave empty to hide.</p>
      <div class="list-items" id="openHouseList"></div>
      <button class="btn-add" id="addSlot">+ Add Slot</button>
    `;

    this.renderOpenHouse(div, openHouse);

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
      this.config.openHouse.push({ date: '', time: '' });
      this.renderOpenHouse(div, this.config.openHouse);
      this.onChange(this.config);
    });

    return div;
  }

  renderOpenHouse(container, slots) {
    const list = container.querySelector('#openHouseList');
    list.innerHTML = slots.map((s, i) => `
      <div class="list-item" data-index="${i}">
        <div class="item-header">
          <span class="item-title">${this.esc(s.date) || `Slot ${i + 1}`}</span>
          <button class="btn-remove" data-index="${i}">Remove</button>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Date</label>
            <input type="text" data-index="${i}" data-key="date" value="${this.esc(s.date)}" placeholder="e.g. Saturday 1 March 2026">
          </div>
          <div class="form-group">
            <label>Time</label>
            <input type="text" data-index="${i}" data-key="time" value="${this.esc(s.time)}" placeholder="e.g. 11:00 – 13:00">
          </div>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('input').forEach(el => {
      el.addEventListener('input', () => {
        this.config.openHouse[+el.dataset.index][el.dataset.key] = el.value;
        this.onChange(this.config);
      });
    });

    list.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        this.config.openHouse.splice(+btn.dataset.index, 1);
        this.renderOpenHouse(container, this.config.openHouse);
        this.onChange(this.config);
      });
    });
  }

  esc(val) { return (val || '').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
}
