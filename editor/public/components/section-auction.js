export class AuctionSection {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
  }

  render() {
    const a = this.config.auction || {};
    const div = document.createElement('div');
    div.className = 'section-form';
    div.innerHTML = `
      <h2>Auction / Deadline Sale</h2>
      <p class="section-help">Enable to show a countdown banner and deadline-based CTAs. Disable to hide completely.</p>

      <div class="toggle-row">
        <label class="toggle-switch">
          <input type="checkbox" id="auctionEnabled" ${a.enabled ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-label">Enable auction/deadline mode</span>
      </div>

      <div id="auctionFields">
        <div class="form-group">
          <label>Deadline (ISO format)</label>
          <input type="datetime-local" data-field="deadline" value="${this.toLocalDatetime(a.deadline)}">
          <small>e.g. 2026-03-31T18:00</small>
        </div>

        <div class="form-group">
          <label>Countdown Label</label>
          <input type="text" data-field="label" value="${this.esc(a.label)}" placeholder="e.g. Best Offers By">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Guide Price</label>
            <div class="input-prefix">
              <span>&pound;</span>
              <input type="text" data-field="guidePrice" value="${this.esc(a.guidePrice)}" placeholder="e.g. 525,000">
            </div>
          </div>
          <div class="form-group">
            <label>Guide Price Label</label>
            <input type="text" data-field="guidePriceLabel" value="${this.esc(a.guidePriceLabel)}" placeholder="e.g. Offers in excess of">
          </div>
        </div>

        <div class="form-group">
          <label>Hero Badge Text</label>
          <input type="text" data-field="heroBadge" value="${this.esc(a.heroBadge)}" placeholder="e.g. No Chain · Best Offers By 31 March">
        </div>

        <div class="form-group">
          <label>CTA Button Text</label>
          <input type="text" data-field="ctaText" value="${this.esc(a.ctaText)}" placeholder="e.g. Submit Your Best Offer">
        </div>

        <div class="form-group">
          <label>Small Print</label>
          <textarea data-field="smallPrint" rows="2">${this.escHtml(a.smallPrint)}</textarea>
        </div>
      </div>
    `;

    // Toggle visibility
    const toggle = div.querySelector('#auctionEnabled');
    const fields = div.querySelector('#auctionFields');
    fields.style.display = a.enabled ? '' : 'none';

    toggle.addEventListener('change', () => {
      if (!this.config.auction) this.config.auction = {};
      this.config.auction.enabled = toggle.checked;
      fields.style.display = toggle.checked ? '' : 'none';
      this.onChange(this.config);
    });

    // Field changes
    div.querySelectorAll('[data-field]').forEach(el => {
      el.addEventListener('input', () => {
        if (!this.config.auction) this.config.auction = {};
        let val = el.value;
        if (el.dataset.field === 'deadline' && el.type === 'datetime-local') {
          val = el.value.replace('T', 'T') + ':00';
        }
        this.config.auction[el.dataset.field] = val;
        this.onChange(this.config);
      });
    });

    return div;
  }

  toLocalDatetime(iso) {
    if (!iso) return '';
    // Strip seconds for datetime-local input
    return iso.slice(0, 16);
  }

  esc(val) { return (val || '').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  escHtml(val) { return (val || '').replace(/</g, '&lt;'); }
}
