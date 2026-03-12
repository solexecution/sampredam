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
      this.config.rooms.push({ name: '', dimensions: '', description: '' });
      this.renderList(div, this.config.rooms);
      this.onChange(this.config);
    });

    return div;
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
          <div class="form-group">
            <label>Name</label>
            <input type="text" data-index="${i}" data-key="name" value="${this.esc(r.name)}" placeholder="e.g. Living Room">
          </div>
          <div class="form-group">
            <label>Dimensions</label>
            <input type="text" data-index="${i}" data-key="dimensions" value="${this.esc(r.dimensions)}" placeholder="e.g. 4.2m x 3.5m (optional)">
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label>Description</label>
          <input type="text" data-index="${i}" data-key="description" value="${this.esc(r.description)}">
        </div>
      </div>
    `).join('');

    list.querySelectorAll('input').forEach(el => {
      el.addEventListener('input', () => {
        this.config.rooms[+el.dataset.index][el.dataset.key] = el.value;
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
