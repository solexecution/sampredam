import { PropertySection } from './components/section-property.js';
import { DescriptionSection } from './components/section-description.js';
import { FeaturesSection } from './components/section-features.js';
import { RoomsSection } from './components/section-rooms.js';
import { GallerySection } from './components/section-gallery.js';
import { FloorplansSection } from './components/section-floorplans.js';
import { ContactSection } from './components/section-contact.js';
import { AuctionSection } from './components/section-auction.js';
import { ReferralSection } from './components/section-referral.js';
import { FaqSection } from './components/section-faq.js';
import { SiteSection } from './components/section-site.js';

const sections = {
  property: PropertySection,
  description: DescriptionSection,
  features: FeaturesSection,
  rooms: RoomsSection,
  gallery: GallerySection,
  floorplans: FloorplansSection,
  contact: ContactSection,
  auction: AuctionSection,
  referral: ReferralSection,
  faq: FaqSection,
  site: SiteSection,
};

let config = {};
let currentSection = 'property';
let dirty = false;
let autoSaveTimer = null;
let saving = false;

// ===== Init =====
async function init() {
  try {
    config = await fetch('/api/config').then(r => r.json());
    renderSection('property');
    bindNavigation();
    bindSave();
    bindDeploy();
    bindPreviewRefresh();
    bindUnsavedWarning();
    updatePreviewUrl();
  } catch (err) {
    document.getElementById('editorPanel').innerHTML =
      `<div class="loading" style="color:red">Failed to load config: ${err.message}</div>`;
  }
}

// ===== Section Rendering =====
function renderSection(name) {
  const panel = document.getElementById('editorPanel');
  const SectionClass = sections[name];
  if (!SectionClass) return;

  panel.innerHTML = '';
  const section = new SectionClass(config, onChange);
  panel.appendChild(section.render());
  currentSection = name;

  // Update active nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === name);
  });
}

function onChange(updatedConfig) {
  config = updatedConfig;
  dirty = true;
  updateSaveStatus('unsaved');
  scheduleAutoSave();
}

function scheduleAutoSave() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => autoSave(), 400);
}

async function autoSave() {
  if (saving) return;
  saving = true;
  updateSaveStatus('saving');
  try {
    const res = await fetch('/api/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
    dirty = false;
    updateSaveStatus('saved');
    refreshPreview();
  } catch (err) {
    updateSaveStatus('error');
    toast(`Auto-save failed: ${err.message}`, 'error');
  } finally {
    saving = false;
  }
}

function updateSaveStatus(state) {
  const btn = document.getElementById('saveBtn');
  btn.classList.remove('unsaved');
  switch (state) {
    case 'unsaved': btn.textContent = 'Saving...'; break;
    case 'saving':  btn.textContent = 'Saving...'; break;
    case 'saved':   btn.textContent = 'All Saved'; break;
    case 'error':   btn.textContent = 'Save Failed'; btn.classList.add('unsaved'); break;
  }
}

// ===== Navigation =====
function bindNavigation() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => renderSection(btn.dataset.section));
  });
}

// ===== Save =====
function bindSave() {
  document.getElementById('saveBtn').addEventListener('click', save);
  // Ctrl+S shortcut
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      save();
    }
  });
}

async function save() {
  clearTimeout(autoSaveTimer);
  await autoSave();
}

// ===== Preview =====
function bindPreviewRefresh() {
  document.getElementById('refreshPreview').addEventListener('click', refreshPreview);
}

function refreshPreview() {
  const frame = document.getElementById('previewFrame');
  frame.src = '/preview/index.html?' + Date.now();
}

function updatePreviewUrl() {
  const url = config.site?.url || '';
  document.getElementById('previewUrl').textContent = url ? `Live: ${url}` : '';
}

// ===== Deploy =====
function bindDeploy() {
  document.getElementById('deployBtn').addEventListener('click', openDeployModal);
  document.getElementById('deployCancel').addEventListener('click', closeDeployModal);
  document.getElementById('deployConfirm').addEventListener('click', deploy);
}

async function openDeployModal() {
  // Flush any pending auto-save
  if (dirty || saving) await save();

  try {
    const status = await fetch('/api/deploy/status').then(r => r.json());
    const changesEl = document.getElementById('deployChanges');
    if (status.dirty) {
      changesEl.textContent = `${status.changes.length} file(s) changed. Last commit: ${status.lastCommit}`;
    } else {
      changesEl.textContent = 'No uncommitted changes. Everything is up to date.';
    }
    document.getElementById('deployModal').hidden = false;
  } catch (err) {
    toast(`Deploy check failed: ${err.message}`, 'error');
  }
}

function closeDeployModal() {
  document.getElementById('deployModal').hidden = true;
}

async function deploy() {
  const btn = document.getElementById('deployConfirm');
  const msg = document.getElementById('commitMsg').value.trim();
  btn.textContent = 'Deploying...';
  btn.disabled = true;
  try {
    const res = await fetch('/api/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg || undefined }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    toast(data.message, 'success');
    closeDeployModal();
  } catch (err) {
    toast(`Deploy failed: ${err.message}`, 'error');
  } finally {
    btn.textContent = 'Deploy Now';
    btn.disabled = false;
  }
}

// ===== Unsaved Warning =====
function bindUnsavedWarning() {
  window.addEventListener('beforeunload', e => {
    if (dirty || saving) { e.preventDefault(); e.returnValue = ''; }
  });
}

// ===== Toast =====
function toast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// Expose toast globally for section components
window.__toast = toast;

init();
