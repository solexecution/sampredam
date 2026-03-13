export class RoomsSection {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
  }

  render() {
    const rooms = this.config.rooms || [];
    const div = document.createElement('div');
    div.className = 'section-form';
    div.innerHTML = `
      <h2>Rooms</h2>
      <p class="section-help">Room-by-room breakdown. Each room has a name, optional dimensions, and description. Drag to reorder.</p>
      <div class="list-items" id="roomsList"></div>
      <button class="btn-add" id="addRoom">+ Add Room</button>
    `;

    this.renderList(div, rooms);

    div.querySelector('#addRoom').addEventListener('click', () => {
      this.config.rooms.push({ name: '', lengthM: '', widthM: '', description: '' });
      this.renderList(div, this.config.rooms);
      this.onChange(this.config);
    });

    return div;
  }

  computeArea(i, container) {
    const el = container.querySelector(`[data-area-index="${i}"]`);
    if (!el) return;
    const room = this.config.rooms[i];
    const l = parseFloat(room.lengthM);
    const w = parseFloat(room.widthM);
    if (!isNaN(l) && !isNaN(w) && l > 0 && w > 0) {
      const sqm = (l * w).toFixed(1);
      const sqft = (l * w * 10.7639).toFixed(0);
      el.textContent = `= ${sqm} m\u00B2 / ${sqft} sq ft`;
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  }

  renderList(container, rooms) {
    const list = container.querySelector('#roomsList');
    list.innerHTML = rooms.map((r, i) => `
      <div class="list-item" draggable="true" data-index="${i}">
        <div class="item-header">
          <span class="drag-handle">&#x2630;</span>
          <span class="item-title">${this.esc(r.name) || `Room ${i + 1}`}</span>
          <button class="btn-remove" data-index="${i}">Remove</button>
        </div>
        <div class="form-row">
          <div class="form-group" style="flex:2">
            <label>Name</label>
            <input type="text" data-index="${i}" data-key="name" value="${this.esc(r.name)}" placeholder="e.g. Living Room">
          </div>
          <div class="form-group" style="flex:1">
            <label>Length (m)</label>
            <input type="number" step="0.1" min="0" data-index="${i}" data-key="lengthM" value="${this.esc(r.lengthM)}" placeholder="e.g. 4.2">
          </div>
          <div class="form-group" style="flex:1">
            <label>Width (m)</label>
            <input type="number" step="0.1" min="0" data-index="${i}" data-key="widthM" value="${this.esc(r.widthM)}" placeholder="e.g. 3.5">
          </div>
        </div>
        <small data-area-index="${i}" style="display:none;color:#b08d57;font-weight:600;margin:-0.25rem 0 0.5rem;display:block"></small>
        <div class="form-group" style="margin-bottom:0">
          <label>Description</label>
          <input type="text" data-index="${i}" data-key="description" value="${this.esc(r.description)}">
        </div>
      </div>
    `).join('');

    // Compute initial areas
    rooms.forEach((_, i) => this.computeArea(i, container));

    list.querySelectorAll('input').forEach(el => {
      el.addEventListener('input', () => {
        this.config.rooms[+el.dataset.index][el.dataset.key] = el.value;
        this.computeArea(+el.dataset.index, container);
        this.onChange(this.config);
      });
    });

    list.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        this.config.rooms.splice(+btn.dataset.index, 1);
        this.renderList(container, this.config.rooms);
        this.onChange(this.config);
      });
    });

    this.bindDrag(list, this.config.rooms, container);
  }

  bindDrag(list, arr, container) {
    let dragIdx = null;
    list.querySelectorAll('.list-item').forEach(item => {
      item.addEventListener('dragstart', () => { dragIdx = +item.dataset.index; item.classList.add('dragging'); });
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
}
