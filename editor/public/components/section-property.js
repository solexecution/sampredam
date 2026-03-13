export class PropertySection {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
  }

  render() {
    const p = this.config.property || {};
    const div = document.createElement('div');
    div.className = 'section-form';
    div.innerHTML = `
      <h2>Property Details</h2>
      <p class="section-help">Core property information shown in highlights, hero, and specs.</p>

      <div class="form-group">
        <label>Hero Headline</label>
        <input type="text" data-field="heroHeadline" data-top-level value="${this.esc(this.config.heroHeadline)}" placeholder="e.g. Your family home in Caversham, Reading">
        <small>The main H1 headline in the hero section. Leave empty to hide.</small>
      </div>

      <div class="form-group">
        <label>Street Address</label>
        <input type="text" data-field="streetAddress" value="${this.esc(p.streetAddress)}" placeholder="e.g. 42 Sheridan Avenue">
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Area / Town</label>
          <input type="text" data-field="locality" value="${this.esc(p.locality)}" placeholder="e.g. Caversham, Reading">
        </div>
        <div class="form-group">
          <label>Postcode</label>
          <input type="text" data-field="postcode" value="${this.esc(p.postcode)}" placeholder="e.g. RG4 7QD">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Price</label>
          <div class="input-prefix">
            <span>&pound;</span>
            <input type="text" data-field="price" value="${this.esc(p.price)}" placeholder="e.g. 525,000">
          </div>
        </div>
        <div class="form-group">
          <label>Property Type</label>
          <select data-field="propertyType">
            ${['Detached','Semi-Detached','Terraced','End-Terrace','Flat','Bungalow','Maisonette']
              .map(t => `<option value="${t}" ${p.propertyType === t ? 'selected' : ''}>${t}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="form-row-3">
        <div class="form-group">
          <label>Bedrooms</label>
          <input type="text" data-field="bedrooms" value="${this.esc(p.bedrooms)}" placeholder="e.g. 3">
        </div>
        <div class="form-group">
          <label>Bathrooms</label>
          <input type="text" data-field="bathrooms" value="${this.esc(p.bathrooms)}" placeholder="e.g. 2">
        </div>
        <div class="form-group">
          <label>Reception Rooms</label>
          <input type="text" data-field="receptionRooms" value="${this.esc(p.receptionRooms)}" placeholder="e.g. 1">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Floor Area (sq ft)</label>
          <input type="text" id="floorAreaSqFt" data-field="floorAreaSqFt" value="${this.esc(p.floorAreaSqFt)}" placeholder="e.g. 1,200">
        </div>
        <div class="form-group">
          <label>Floor Area (sq m)</label>
          <input type="text" id="floorAreaSqM" data-field="floorAreaSqM" value="${this.esc(p.floorAreaSqM)}" placeholder="e.g. 111">
          <small>Auto-calculated from sq ft (editable)</small>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Garden</label>
          <input type="text" data-field="garden" value="${this.esc(p.garden)}" placeholder="e.g. South-facing, rear">
        </div>
        <div class="form-group">
          <label>Garden Facing (short)</label>
          <input type="text" data-field="gardenFacing" value="${this.esc(p.gardenFacing)}" placeholder="e.g. South">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Parking</label>
          <input type="text" data-field="parking" value="${this.esc(p.parking)}" placeholder="e.g. 2 cars">
        </div>
        <div class="form-group">
          <label>Walk to Station</label>
          <input type="text" data-field="walkToStation" value="${this.esc(p.walkToStation)}" placeholder="e.g. 12 min (leave empty to hide)">
        </div>
      </div>

      <div class="form-row-3">
        <div class="form-group">
          <label>EPC Rating</label>
          <select data-field="epcRating">
            ${['A','B','C','D','E','F','G'].map(r => `<option ${p.epcRating === r ? 'selected' : ''}>${r}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Council Tax Band</label>
          <select data-field="councilTaxBand">
            ${['A','B','C','D','E','F','G','H'].map(r => `<option ${p.councilTaxBand === r ? 'selected' : ''}>${r}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Tenure</label>
          <select data-field="tenure">
            ${['Freehold','Leasehold','Share of Freehold'].map(t => `<option ${p.tenure === t ? 'selected' : ''}>${t}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Broadband</label>
          <input type="text" data-field="broadband" value="${this.esc(p.broadband)}" placeholder="e.g. Full fibre (FTTP)">
        </div>
        <div class="form-group">
          <label>Year Built</label>
          <input type="text" data-field="yearBuilt" value="${this.esc(p.yearBuilt)}" placeholder="e.g. 1960s">
        </div>
      </div>

      <div class="form-group">
        <label>Chain Status</label>
        <input type="text" data-field="chainStatus" value="${this.esc(p.chainStatus)}" placeholder="e.g. No chain">
      </div>

      <div class="form-group">
        <label>Price Context (HTML allowed)</label>
        <textarea data-field="priceContext" rows="4">${this.escHtml(p.priceContext)}</textarea>
        <small>Shown in Location section. Supports HTML like &lt;strong&gt;.</small>
      </div>
    `;

    div.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('input', () => this.collect(div));
    });

    // Linked floor area conversion
    const sqFtInput = div.querySelector('#floorAreaSqFt');
    const sqMInput = div.querySelector('#floorAreaSqM');
    sqFtInput.addEventListener('input', () => {
      const num = parseFloat(sqFtInput.value.replace(/,/g, ''));
      if (!isNaN(num)) {
        sqMInput.value = Math.round(num * 0.092903);
        this.collect(div);
      }
    });
    sqMInput.addEventListener('input', () => {
      const num = parseFloat(sqMInput.value.replace(/,/g, ''));
      if (!isNaN(num)) {
        sqFtInput.value = Math.round(num / 0.092903);
        this.collect(div);
      }
    });

    return div;
  }

  collect(container) {
    const fields = container.querySelectorAll('[data-field]');
    fields.forEach(el => {
      if (el.hasAttribute('data-top-level')) {
        this.config[el.dataset.field] = el.value;
      } else {
        this.config.property[el.dataset.field] = el.value;
      }
    });
    this.onChange(this.config);
  }

  esc(val) { return (val || '').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  escHtml(val) { return (val || '').replace(/</g, '&lt;'); }
}
