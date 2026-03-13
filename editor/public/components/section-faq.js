export class FaqSection {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
  }

  render() {
    if (!Array.isArray(this.config.faq)) this.config.faq = [];

    const div = document.createElement('div');
    div.className = 'section-form';
    div.innerHTML = `
      <h2>FAQ Items</h2>
      <p class="section-help">Toggle, reorder, edit or remove questions. Each item tracks <code>data-umami-event="faq-expand"</code> with its key.</p>
      <div class="faq-editor-list"></div>
      <button class="btn-add-faq" type="button">+ Add Question</button>
    `;

    const list = div.querySelector('.faq-editor-list');
    this.renderItems(list);

    div.querySelector('.btn-add-faq').addEventListener('click', () => {
      const key = 'custom_' + Date.now();
      this.config.faq.push({ key, q: '', a: '', enabled: true });
      this.renderItems(list);
      this.onChange(this.config);
      // Focus the new question input
      const last = list.querySelector('.faq-editor-item:last-child input[data-field="q"]');
      if (last) last.focus();
    });

    return div;
  }

  renderItems(list) {
    list.innerHTML = '';
    this.config.faq.forEach((item, idx) => {
      list.appendChild(this.buildRow(item, idx, list));
    });
  }

  buildRow(item, idx, list) {
    const row = document.createElement('div');
    row.className = `faq-editor-item${item.enabled === false ? ' faq-disabled' : ''}`;
    row.draggable = true;
    row.dataset.idx = idx;

    row.innerHTML = `
      <div class="faq-editor-header">
        <span class="faq-drag-handle" title="Drag to reorder">&#x2630;</span>
        <label class="faq-toggle">
          <input type="checkbox" ${item.enabled !== false ? 'checked' : ''}>
          <span class="faq-toggle-slider"></span>
        </label>
        <input type="text" class="faq-question-input" data-field="q" value="${this.escAttr(item.q)}" placeholder="Question text">
        <span class="faq-umami-tag" title="Umami event key">${this.escHtml(item.key)}</span>
        <button class="faq-remove-btn" title="Remove this question">&times;</button>
      </div>
      <div class="faq-editor-body">
        <textarea rows="3" data-field="a" placeholder="Answer (HTML allowed)">${this.escHtml(item.a)}</textarea>
      </div>
    `;

    // Toggle
    row.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
      item.enabled = e.target.checked;
      row.classList.toggle('faq-disabled', !e.target.checked);
      this.onChange(this.config);
    });

    // Question input
    row.querySelector('input[data-field="q"]').addEventListener('input', (e) => {
      item.q = e.target.value;
      this.onChange(this.config);
    });

    // Answer textarea
    row.querySelector('textarea[data-field="a"]').addEventListener('input', (e) => {
      item.a = e.target.value;
      this.onChange(this.config);
    });

    // Remove
    row.querySelector('.faq-remove-btn').addEventListener('click', () => {
      this.config.faq.splice(idx, 1);
      this.renderItems(list);
      this.onChange(this.config);
    });

    // Drag & drop reordering
    row.addEventListener('dragstart', (e) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', idx);
      row.classList.add('faq-dragging');
    });
    row.addEventListener('dragend', () => row.classList.remove('faq-dragging'));
    row.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      row.classList.add('faq-dragover');
    });
    row.addEventListener('dragleave', () => row.classList.remove('faq-dragover'));
    row.addEventListener('drop', (e) => {
      e.preventDefault();
      row.classList.remove('faq-dragover');
      const fromIdx = parseInt(e.dataTransfer.getData('text/plain'), 10);
      const toIdx = idx;
      if (fromIdx === toIdx) return;
      const [moved] = this.config.faq.splice(fromIdx, 1);
      this.config.faq.splice(toIdx, 0, moved);
      this.renderItems(list);
      this.onChange(this.config);
    });

    return row;
  }

  escHtml(val) { return (val || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  escAttr(val) { return (val || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
}
