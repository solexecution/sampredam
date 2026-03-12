export class DescriptionSection {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
  }

  render() {
    const paragraphs = this.config.description || [];
    const div = document.createElement('div');
    div.className = 'section-form';
    div.innerHTML = `
      <h2>Property Description</h2>
      <p class="section-help">Each item is a separate paragraph on the listing. HTML tags like &lt;strong&gt; are supported. Drag to reorder.</p>
      <div class="list-items" id="descList"></div>
      <button class="btn-add" id="addParagraph">+ Add Paragraph</button>
    `;

    this.renderList(div, paragraphs);

    div.querySelector('#addParagraph').addEventListener('click', () => {
      this.config.description.push('');
      this.renderList(div, this.config.description);
      this.onChange(this.config);
    });

    return div;
  }

  renderList(container, paragraphs) {
    const list = container.querySelector('#descList');
    list.innerHTML = paragraphs.map((text, i) => `
      <div class="list-item" draggable="true" data-index="${i}">
        <div class="item-header">
          <span class="drag-handle">&#x2630;</span>
          <span class="item-title">Paragraph ${i + 1}</span>
          <button class="btn-remove" data-index="${i}">Remove</button>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <textarea rows="3" data-index="${i}">${this.esc(text)}</textarea>
        </div>
      </div>
    `).join('');

    // Bind text changes
    list.querySelectorAll('textarea').forEach(el => {
      el.addEventListener('input', () => {
        this.config.description[+el.dataset.index] = el.value;
        this.onChange(this.config);
      });
    });

    // Bind remove
    list.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        this.config.description.splice(+btn.dataset.index, 1);
        this.renderList(container, this.config.description);
        this.onChange(this.config);
      });
    });

    // Drag reorder
    this.bindDragReorder(list, this.config.description, container);
  }

  bindDragReorder(list, arr, container) {
    let dragIdx = null;
    list.querySelectorAll('.list-item').forEach(item => {
      item.addEventListener('dragstart', e => {
        dragIdx = +item.dataset.index;
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        dragIdx = null;
      });
      item.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
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

  esc(val) { return (val || '').replace(/</g, '&lt;'); }
}
