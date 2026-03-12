export class FaqSection {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
  }

  render() {
    const faq = this.config.faq || {};
    const fields = [
      { key: 'askingPrice', label: 'Asking Price' },
      { key: 'tenure', label: 'Tenure' },
      { key: 'epc', label: 'EPC / Energy Rating' },
      { key: 'viewings', label: 'Viewings' },
      { key: 'privateSale', label: 'Private Sale' },
      { key: 'included', label: 'What\'s Included' },
      { key: 'chain', label: 'Chain Status' },
      { key: 'runningCosts', label: 'Running Costs' },
      { key: 'survey', label: 'Survey' },
      { key: 'makingOffer', label: 'Making an Offer' },
    ];

    const div = document.createElement('div');
    div.className = 'section-form';
    div.innerHTML = `
      <h2>FAQ Overrides</h2>
      <p class="section-help">Leave empty to use default auto-generated answers. Enter text to override. HTML allowed.</p>

      ${fields.map(f => `
        <div class="form-group">
          <label>${f.label}</label>
          <textarea rows="2" data-key="${f.key}" placeholder="Leave empty for default answer">${this.escHtml(faq[f.key] || '')}</textarea>
        </div>
      `).join('')}
    `;

    div.querySelectorAll('textarea').forEach(el => {
      el.addEventListener('input', () => {
        if (!this.config.faq) this.config.faq = {};
        this.config.faq[el.dataset.key] = el.value;
        this.onChange(this.config);
      });
    });

    return div;
  }

  escHtml(val) { return (val || '').replace(/</g, '&lt;'); }
}
