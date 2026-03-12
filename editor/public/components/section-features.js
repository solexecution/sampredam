export class FeaturesSection {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
  }

  render() {
    const features = this.config.features || [];
    const div = document.createElement('div');
    div.className = 'section-form';
    div.innerHTML = `
      <h2>Key Features</h2>
      <p class="section-help">Feature cards shown below the property details. Each has a title, description, and icon.</p>
      <div class="list-items" id="featuresList"></div>
      <button class="btn-add" id="addFeature">+ Add Feature</button>
    `;

    this.renderList(div, features);

    div.querySelector('#addFeature').addEventListener('click', () => {
      this.config.features.push({ title: '', description: '', icon: 'rooms' });
      this.renderList(div, this.config.features);
      this.onChange(this.config);
    });

    return div;
  }

  renderList(container, features) {
    const icons = ['kitchen', 'garden', 'glazing', 'heating', 'parking', 'rooms'];
    const list = container.querySelector('#featuresList');
    list.innerHTML = features.map((f, i) => `
      <div class="list-item" draggable="true" data-index="${i}">
        <div class="item-header">
          <span class="drag-handle">&#x2630;</span>
          <span class="item-title">${this.esc(f.title) || `Feature ${i + 1}`}</span>
          <button class="btn-remove" data-index="${i}">Remove</button>
        </div>
        <div class="form-group">
          <label>Title</label>
          <input type="text" data-index="${i}" data-key="title" value="${this.esc(f.title)}">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea rows="2" data-index="${i}" data-key="description">${this.escHtml(f.description)}</textarea>
        </div>
        <div class="form-group">
          <label>Icon</label>
          <select data-index="${i}" data-key="icon">
            ${icons.map(ic => `<option value="${ic}" ${f.icon === ic ? 'selected' : ''}>${ic}</option>`).join('')}
          </select>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('input, textarea, select').forEach(el => {
      el.addEventListener('input', () => {
        this.config.features[+el.dataset.index][el.dataset.key] = el.value;
        this.onChange(this.config);
      });
    });

    list.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        this.config.features.splice(+btn.dataset.index, 1);
        this.renderList(container, this.config.features);
        this.onChange(this.config);
      });
    });

    this.bindDrag(list, this.config.features, container);
  }

  bindDrag(list, arr, container) {
    let dragIdx = null;
    list.querySelectorAll('.list-item').forEach(item => {
      item.addEventListener('dragstart', e => { dragIdx = +item.dataset.index; item.classList.add('dragging'); });
      item.addEventListener('dragend', () => { item.classList.remove('dragging'); dragIdx = null; });
      item.addEventListener('dragover', e => e.preventDefault());
      item.addEventListener('drop', e => {
        e.preventDefault();
        const dropIdx = +item.dataset.index;
        if (dragIdx !== null && dragIdx !== dropIdx) {
          const [moved] = arr.splice(dragIdx, 1);
          arr.splice(dropIdx, 0, moved);
          this.renderList(container, arr);
          this.onChange(this.config);
        }
      });
    });
  }

  esc(val) { return (val || '').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  escHtml(val) { return (val || '').replace(/</g, '&lt;'); }
}
