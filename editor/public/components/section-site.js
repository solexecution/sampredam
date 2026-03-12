export class SiteSection {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
  }

  render() {
    const s = this.config.site || {};
    const div = document.createElement('div');
    div.className = 'section-form';
    div.innerHTML = `
      <h2>Site Settings</h2>
      <p class="section-help">Global site configuration — URL, analytics, and certificates.</p>

      <div class="form-group">
        <label>Live Site URL</label>
        <input type="text" data-path="site.url" value="${this.esc(s.url)}" placeholder="https://yoursite.xyz">
      </div>

      <div class="form-group">
        <label>Umami Website ID</label>
        <input type="text" data-path="site.umamiWebsiteId" value="${this.esc(s.umamiWebsiteId)}" placeholder="Get from cloud.umami.is (leave empty to disable)">
      </div>

      <div class="form-group">
        <label>EPC Certificate URL</label>
        <input type="text" data-path="epcCertificateUrl" value="${this.esc(this.config.epcCertificateUrl)}" placeholder="https://find-energy-certificate.service.gov.uk/...">
      </div>

      <h3 style="margin-top:24px;margin-bottom:8px">Gallery Placeholders</h3>
      <p class="section-help">Labels shown when no images are uploaded yet.</p>
      <div class="form-group">
        <textarea id="placeholders" rows="3">${(this.config.galleryPlaceholders || []).join(', ')}</textarea>
        <small>Comma-separated list of labels.</small>
      </div>
    `;

    // Nested path fields (site.url, site.umamiWebsiteId)
    div.querySelectorAll('[data-path]').forEach(el => {
      el.addEventListener('input', () => {
        const parts = el.dataset.path.split('.');
        if (parts.length === 2) {
          if (!this.config[parts[0]]) this.config[parts[0]] = {};
          this.config[parts[0]][parts[1]] = el.value;
        } else {
          this.config[parts[0]] = el.value;
        }
        this.onChange(this.config);
      });
    });

    // Placeholders
    div.querySelector('#placeholders').addEventListener('input', e => {
      this.config.galleryPlaceholders = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
      this.onChange(this.config);
    });

    return div;
  }

  esc(val) { return (val || '').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
}
