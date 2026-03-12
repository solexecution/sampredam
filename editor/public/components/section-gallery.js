export class GallerySection {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
  }

  render() {
    const div = document.createElement('div');
    div.className = 'section-form';
    div.innerHTML = `
      <h2>Gallery &amp; Images</h2>
      <p class="section-help">Upload property photos. Check "Hero" to include in the hero carousel. Drag cards to reorder.</p>

      <div class="drop-zone" id="dropZone">
        <p>Drag &amp; drop images here, or click to browse</p>
        <input type="file" id="fileInput" multiple accept="image/*" hidden>
      </div>

      <div class="gallery-grid" id="galleryGrid"></div>
    `;

    this.renderGrid(div);
    this.bindUpload(div);

    return div;
  }

  renderGrid(container) {
    const gallery = this.config.gallery || [];
    const heroImages = this.config.heroImages || [];
    const grid = container.querySelector('#galleryGrid');

    grid.innerHTML = gallery.map((img, i) => `
      <div class="gallery-card" draggable="true" data-index="${i}">
        <img src="/preview/${img.src}" alt="${this.esc(img.alt)}" loading="lazy">
        <div class="gallery-card-body">
          <input type="text" value="${this.esc(img.alt)}" placeholder="Alt text" data-index="${i}">
          <div class="gallery-card-actions">
            <label class="hero-toggle">
              <input type="checkbox" data-index="${i}" ${heroImages.includes(img.src) ? 'checked' : ''}>
              Hero
            </label>
            <button class="btn-delete-img" data-index="${i}">Delete</button>
          </div>
        </div>
      </div>
    `).join('');

    // Alt text changes
    grid.querySelectorAll('input[type="text"]').forEach(el => {
      el.addEventListener('input', () => {
        this.config.gallery[+el.dataset.index].alt = el.value;
        this.onChange(this.config);
      });
    });

    // Hero checkbox
    grid.querySelectorAll('input[type="checkbox"]').forEach(el => {
      el.addEventListener('change', () => {
        const src = this.config.gallery[+el.dataset.index].src;
        if (el.checked) {
          if (!this.config.heroImages.includes(src)) this.config.heroImages.push(src);
        } else {
          this.config.heroImages = this.config.heroImages.filter(s => s !== src);
        }
        this.onChange(this.config);
      });
    });

    // Delete
    grid.querySelectorAll('.btn-delete-img').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = +btn.dataset.index;
        const img = this.config.gallery[idx];
        const filename = img.src.split('/').pop();

        try {
          await fetch(`/api/images/${encodeURIComponent(filename)}`, { method: 'DELETE' });
        } catch (e) { /* image may already be gone */ }

        // Remove from gallery and heroImages
        this.config.gallery.splice(idx, 1);
        this.config.heroImages = this.config.heroImages.filter(s => s !== img.src);
        this.renderGrid(container);
        this.onChange(this.config);
      });
    });

    // Drag reorder
    this.bindDrag(grid, container);
  }

  bindUpload(container) {
    const dropZone = container.querySelector('#dropZone');
    const fileInput = container.querySelector('#fileInput');

    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      this.uploadFiles(e.dataTransfer.files, container);
    });
    fileInput.addEventListener('change', () => {
      this.uploadFiles(fileInput.files, container);
      fileInput.value = '';
    });
  }

  async uploadFiles(files, container) {
    if (!files.length) return;
    const formData = new FormData();
    for (const f of files) formData.append('images', f);

    try {
      const res = await fetch('/api/images/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Add uploaded images to gallery config
      for (const img of data.uploaded) {
        this.config.gallery.push({ src: img.src, alt: '' });
      }
      this.renderGrid(container);
      this.onChange(this.config);
      if (window.__toast) window.__toast(`${data.uploaded.length} image(s) uploaded`, 'success');
    } catch (err) {
      if (window.__toast) window.__toast(`Upload failed: ${err.message}`, 'error');
    }
  }

  bindDrag(grid, container) {
    let dragIdx = null;
    grid.querySelectorAll('.gallery-card').forEach(card => {
      card.addEventListener('dragstart', () => { dragIdx = +card.dataset.index; card.classList.add('dragging'); });
      card.addEventListener('dragend', () => { card.classList.remove('dragging'); dragIdx = null;
        grid.querySelectorAll('.gallery-card').forEach(c => c.classList.remove('drag-over'));
      });
      card.addEventListener('dragover', e => { e.preventDefault(); card.classList.add('drag-over'); });
      card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
      card.addEventListener('drop', e => {
        e.preventDefault();
        card.classList.remove('drag-over');
        const dropIdx = +card.dataset.index;
        if (dragIdx !== null && dragIdx !== dropIdx) {
          const [moved] = this.config.gallery.splice(dragIdx, 1);
          this.config.gallery.splice(dropIdx, 0, moved);
          this.renderGrid(container);
          this.onChange(this.config);
        }
      });
    });
  }

  esc(val) { return (val || '').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
}
