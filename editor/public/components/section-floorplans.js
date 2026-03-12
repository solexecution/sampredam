export class FloorplansSection {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
  }

  render() {
    const plans = this.config.floorPlans || [];
    const div = document.createElement('div');
    div.className = 'section-form';
    div.innerHTML = `
      <h2>Floor Plans</h2>
      <p class="section-help">Floor plan images shown in the property details section. Upload images first via Gallery, then reference them here.</p>
      <div class="list-items" id="plansList"></div>
      <button class="btn-add" id="addPlan">+ Add Floor Plan</button>
    `;

    this.renderList(div, plans);

    div.querySelector('#addPlan').addEventListener('click', () => {
      this.config.floorPlans.push({ label: '', src: '' });
      this.renderList(div, this.config.floorPlans);
      this.onChange(this.config);
    });

    return div;
  }

  renderList(container, plans) {
    // Get all available images for the dropdown
    const allImages = (this.config.gallery || []).map(g => g.src);
    const list = container.querySelector('#plansList');

    list.innerHTML = plans.map((p, i) => `
      <div class="list-item" data-index="${i}">
        <div class="item-header">
          <span class="item-title">${this.esc(p.label) || `Plan ${i + 1}`}</span>
          <button class="btn-remove" data-index="${i}">Remove</button>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Label</label>
            <input type="text" data-index="${i}" data-key="label" value="${this.esc(p.label)}" placeholder="e.g. Ground Floor">
          </div>
          <div class="form-group">
            <label>Image Path</label>
            <input type="text" data-index="${i}" data-key="src" value="${this.esc(p.src)}" placeholder="images/gallery/filename.jpg">
            <small>Type the path or select from gallery images.</small>
          </div>
        </div>
        ${p.src ? `<img src="/preview/${p.src}" style="max-width:200px;max-height:150px;margin-top:8px;border:1px solid #ddd;border-radius:4px">` : ''}
      </div>
    `).join('');

    list.querySelectorAll('input').forEach(el => {
      el.addEventListener('input', () => {
        this.config.floorPlans[+el.dataset.index][el.dataset.key] = el.value;
        this.onChange(this.config);
      });
    });

    list.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        this.config.floorPlans.splice(+btn.dataset.index, 1);
        this.renderList(container, this.config.floorPlans);
        this.onChange(this.config);
      });
    });
  }

  esc(val) { return (val || '').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
}
