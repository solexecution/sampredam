export class ReferralSection {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
  }

  render() {
    const r = this.config.referral || {};
    const terms = r.terms || [];

    const div = document.createElement('div');
    div.className = 'section-form';
    div.innerHTML = `
      <h2>Share &amp; Earn (Referral)</h2>
      <p class="section-help">Enable to show the referral/share section. Visitors can earn a reward for referring buyers.</p>

      <div class="toggle-row">
        <label class="toggle-switch">
          <input type="checkbox" id="referralEnabled" ${r.enabled ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-label">Enable referral program</span>
      </div>

      <div id="referralFields">
        <div class="form-row">
          <div class="form-group">
            <label>Reward Amount (&pound;)</label>
            <input type="text" data-field="reward" value="${this.esc(r.reward)}" placeholder="e.g. 100">
          </div>
          <div class="form-group">
            <label>Claims WhatsApp</label>
            <input type="text" data-field="whatsapp" value="${this.esc(r.whatsapp)}" placeholder="447123456789">
          </div>
        </div>

        <h3 style="margin-top:16px;margin-bottom:8px">Terms &amp; Conditions</h3>
        <div class="list-items" id="termsList"></div>
        <button class="btn-add" id="addTerm">+ Add Term</button>
      </div>
    `;

    const toggle = div.querySelector('#referralEnabled');
    const fields = div.querySelector('#referralFields');
    fields.style.display = r.enabled ? '' : 'none';

    toggle.addEventListener('change', () => {
      if (!this.config.referral) this.config.referral = {};
      this.config.referral.enabled = toggle.checked;
      fields.style.display = toggle.checked ? '' : 'none';
      this.onChange(this.config);
    });

    // Simple fields
    div.querySelectorAll('[data-field]').forEach(el => {
      el.addEventListener('input', () => {
        if (!this.config.referral) this.config.referral = {};
        this.config.referral[el.dataset.field] = el.value;
        this.onChange(this.config);
      });
    });

    this.renderTerms(div, terms);

    div.querySelector('#addTerm').addEventListener('click', () => {
      if (!this.config.referral.terms) this.config.referral.terms = [];
      this.config.referral.terms.push('');
      this.renderTerms(div, this.config.referral.terms);
      this.onChange(this.config);
    });

    return div;
  }

  renderTerms(container, terms) {
    const list = container.querySelector('#termsList');
    list.innerHTML = terms.map((t, i) => `
      <div class="list-item" data-index="${i}">
        <div class="item-header">
          <span class="item-title">Term ${i + 1}</span>
          <button class="btn-remove" data-index="${i}">Remove</button>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <textarea rows="2" data-index="${i}">${this.escHtml(t)}</textarea>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('textarea').forEach(el => {
      el.addEventListener('input', () => {
        this.config.referral.terms[+el.dataset.index] = el.value;
        this.onChange(this.config);
      });
    });

    list.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        this.config.referral.terms.splice(+btn.dataset.index, 1);
        this.renderTerms(container, this.config.referral.terms);
        this.onChange(this.config);
      });
    });
  }

  esc(val) { return (val || '').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  escHtml(val) { return (val || '').replace(/</g, '&lt;'); }
}
