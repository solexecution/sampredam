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
    bindPreviewTabs();
    bindPreviewHighlight();
    bindScrollSync();
    bindUnsavedWarning();
    updatePreviewUrl();
    initResizablePanels();
    initSidebarToggle();
  } catch (err) {
    document.getElementById('editorPanel').innerHTML =
      `<div class="loading" style="color:red">Failed to load config: ${err.message}</div>`;
  }
}

// ===== Section ↔ Preview mapping (granular targets inside the page) =====
const sectionToPreviewId = {
  property:    'hero',
  description: 'detailsDescription',
  features:    'featuresSection',
  rooms:       'roomBreakdown',
  gallery:     'galleryGrid',
  floorplans:  'floorPlans',
  contact:     'contact',
  auction:     'auctionBanner',
  referral:    'shareEarnSection',
  faq:         'faqList',
  site:        null,
};

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

  // Highlight matching section in preview
  highlightPreviewSection(name);
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
    if (previewMode === 'editing') refreshPreview();
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
let previewMode = 'editing'; // 'editing', 'live', or 'split'

function bindPreviewRefresh() {
  document.getElementById('refreshPreview').addEventListener('click', refreshPreview);
}

function bindPreviewTabs() {
  document.getElementById('tabEditing').addEventListener('click', () => switchPreview('editing'));
  document.getElementById('tabLive').addEventListener('click', () => switchPreview('live'));
  document.getElementById('tabSplit').addEventListener('click', () => switchPreview('split'));
}

function switchPreview(mode) {
  previewMode = mode;
  const editingWrap = document.getElementById('editingWrap');
  const liveWrap = document.getElementById('liveWrap');
  const editFrame = document.getElementById('previewFrame');
  const liveFrame = document.getElementById('liveFrame');
  const liveUrl = config.site?.url || '';

  // Update tab highlights
  document.getElementById('tabEditing').classList.toggle('active', mode === 'editing');
  document.getElementById('tabLive').classList.toggle('active', mode === 'live');
  document.getElementById('tabSplit').classList.toggle('active', mode === 'split');

  if (mode === 'editing') {
    editingWrap.hidden = false;
    liveWrap.hidden = true;
    editFrame.src = '/preview/index.html?' + Date.now();
  } else if (mode === 'live') {
    if (!liveUrl) {
      toast('No live site URL configured — set it in Site Settings', 'error');
      switchPreview('editing');
      return;
    }
    editingWrap.hidden = true;
    liveWrap.hidden = false;
    liveFrame.src = liveUrl + '?' + Date.now();
  } else if (mode === 'split') {
    if (!liveUrl) {
      toast('No live site URL configured — set it in Site Settings', 'error');
      switchPreview('editing');
      return;
    }
    editingWrap.hidden = false;
    liveWrap.hidden = false;
    editFrame.src = '/preview/index.html?' + Date.now();
    liveFrame.src = liveUrl + '?' + Date.now();
  }

  // Re-apply highlight after frame loads
  setTimeout(() => highlightPreviewSection(currentSection), 800);
}

function refreshPreview() {
  switchPreview(previewMode);
}

function updatePreviewUrl() {
  // Live URL is now a static link in the preview toolbar
}

// ===== Section Highlighting =====
function highlightPreviewSection(sectionName) {
  const targetId = sectionToPreviewId[sectionName];
  const frame = document.getElementById('previewFrame');

  try {
    const doc = frame.contentDocument || frame.contentWindow?.document;
    if (!doc) return;

    // Remove previous highlights
    doc.querySelectorAll('.editor-highlight-overlay').forEach(el => {
      el.classList.remove('editor-highlight-overlay');
    });

    if (!targetId) return;

    const target = doc.getElementById(targetId);
    if (!target) return;

    target.classList.add('editor-highlight-overlay');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (e) {
    // Cross-origin frame — can't highlight (live tab), that's fine
  }
}

// Re-apply highlight when preview iframe finishes loading
function bindPreviewHighlight() {
  const frame = document.getElementById('previewFrame');
  frame.addEventListener('load', () => {
    // Inject the highlight CSS into the preview
    try {
      const doc = frame.contentDocument || frame.contentWindow?.document;
      if (!doc) return;
      const style = doc.createElement('style');
      style.textContent = `
        .editor-highlight-overlay {
          outline: 3px solid #2563eb;
          outline-offset: -3px;
          background: rgba(37,99,235,0.06);
          transition: outline-color 0.3s, background 0.3s;
          border-radius: 4px;
          scroll-margin-top: 20px;
        }
      `;
      doc.head.appendChild(style);
      highlightPreviewSection(currentSection);
    } catch (e) { /* cross-origin */ }
  });
}

// ===== Scroll Sync =====
let scrollSyncActive = false;

function bindScrollSync() {
  const editFrame = document.getElementById('previewFrame');
  const liveFrame = document.getElementById('liveFrame');

  // Attach sync when editing frame loads (same-origin, always works)
  editFrame.addEventListener('load', () => attachSyncToFrame(editFrame, liveFrame));
  liveFrame.addEventListener('load', () => attachSyncToFrame(liveFrame, editFrame));
}

function attachSyncToFrame(sourceFrame, targetFrame) {
  try {
    const sourceDoc = sourceFrame.contentDocument || sourceFrame.contentWindow?.document;
    if (!sourceDoc) return;

    let syncing = false;
    sourceDoc.addEventListener('scroll', () => {
      if (syncing || previewMode !== 'split') return;
      syncing = true;
      requestAnimationFrame(() => {
        try {
          const sWin = sourceFrame.contentWindow;
          const tWin = targetFrame.contentWindow;
          if (!sWin || !tWin) { syncing = false; return; }
          const sMax = sWin.document.documentElement.scrollHeight - sWin.innerHeight;
          if (sMax <= 0) { syncing = false; return; }
          const ratio = sWin.scrollY / sMax;
          const tMax = tWin.document.documentElement.scrollHeight - tWin.innerHeight;
          tWin.scrollTo({ top: ratio * tMax });
        } catch (_) { /* cross-origin target */ }
        syncing = false;
      });
    }, { passive: true });
  } catch (_) { /* cross-origin source */ }
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

// ===== Resizable Panels =====
const STORAGE_KEY = 'editor-panel-sizes';
const MIN_SIDEBAR = 140;
const MAX_SIDEBAR = 360;
const MIN_PANEL = 280;

function initResizablePanels() {
  const layout = document.getElementById('editorLayout');
  const sidebar = document.getElementById('editorSidebar');
  const editor = document.getElementById('editorPanel');
  const preview = document.getElementById('editorPreview');
  const handleSidebar = document.getElementById('handleSidebar');
  const handlePreview = document.getElementById('handlePreview');

  // Restore saved sizes
  const saved = loadPanelSizes();
  if (saved) applyPanelSizes(saved);

  // Re-apply proportional sizes on window resize
  window.addEventListener('resize', () => {
    if (layout.classList.contains('sidebar-collapsed')) return;
    const restored = loadPanelSizes();
    if (restored) applyPanelSizes(restored);
  });

  // Sidebar ↔ Editor handle
  makeDraggable(handleSidebar, (deltaX, startState) => {
    const newSidebarW = Math.max(MIN_SIDEBAR, Math.min(MAX_SIDEBAR, startState.sidebarW + deltaX));
    const totalFlex = startState.editorW + startState.previewW;
    const editorDelta = startState.sidebarW - newSidebarW;
    const newEditorW = Math.max(MIN_PANEL, startState.editorW + editorDelta);

    applyPanelSizes({
      sidebarW: newSidebarW,
      editorW: newEditorW,
      previewW: startState.previewW,
    });
  });

  // Editor ↔ Preview handle
  makeDraggable(handlePreview, (deltaX, startState) => {
    const total = startState.editorW + startState.previewW;
    const newEditorW = Math.max(MIN_PANEL, Math.min(total - MIN_PANEL, startState.editorW + deltaX));
    const newPreviewW = total - newEditorW;

    applyPanelSizes({
      sidebarW: startState.sidebarW,
      editorW: newEditorW,
      previewW: newPreviewW,
    });
  });

  function makeDraggable(handle, onDrag) {
    let startX, startState;

    handle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      startX = e.clientX;
      startState = getCurrentSizes();
      handle.classList.add('dragging');
      document.body.classList.add('resizing');

      const onMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        onDrag(deltaX, startState);
      };

      const onMouseUp = () => {
        handle.classList.remove('dragging');
        document.body.classList.remove('resizing');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        savePanelSizes(getCurrentSizes());
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  function getCurrentSizes() {
    return {
      sidebarW: sidebar.getBoundingClientRect().width,
      editorW: editor.getBoundingClientRect().width,
      previewW: preview.getBoundingClientRect().width,
    };
  }
}

function applyPanelSizes(sizes) {
  const layout = document.getElementById('editorLayout');
  if (layout.classList.contains('sidebar-collapsed')) {
    layout.style.gridTemplateColumns = `0px 0px 1fr 6px 1fr`;
  } else {
    layout.style.gridTemplateColumns =
      `${sizes.sidebarW}px 6px ${sizes.editorW}px 6px ${sizes.previewW}px`;
  }
}

function savePanelSizes(sizes) {
  // Save as ratios so sizes adapt to different window widths
  const total = sizes.sidebarW + sizes.editorW + sizes.previewW;
  const ratios = {
    sidebarR: sizes.sidebarW / total,
    editorR: sizes.editorW / total,
    previewR: sizes.previewW / total,
  };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ratios)); } catch (_) {}
}

function loadPanelSizes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // Support ratio-based format
    if (data.sidebarR != null) {
      const available = window.innerWidth - 12; // subtract 2 handles
      return {
        sidebarW: Math.round(data.sidebarR * available),
        editorW: Math.round(data.editorR * available),
        previewW: Math.round(data.previewR * available),
      };
    }
    // Legacy pixel format — convert to ratios and re-save
    if (data.sidebarW != null) {
      savePanelSizes(data);
      return loadPanelSizes();
    }
    return null;
  } catch (_) { return null; }
}

// ===== Sidebar Toggle =====
function initSidebarToggle() {
  const layout = document.getElementById('editorLayout');
  const toggleBtn = document.getElementById('sidebarToggle');

  // Create the floating expand button (shown when collapsed)
  const expandBtn = document.createElement('button');
  expandBtn.className = 'sidebar-expand';
  expandBtn.title = 'Expand sidebar';
  expandBtn.innerHTML = '&#x2630;'; // hamburger icon ☰
  document.body.appendChild(expandBtn);

  // Restore collapsed state
  const wasCollapsed = localStorage.getItem('editor-sidebar-collapsed') === 'true';
  if (wasCollapsed) collapseSidebar(true);

  toggleBtn.addEventListener('click', () => collapseSidebar());
  expandBtn.addEventListener('click', () => expandSidebar());

  function collapseSidebar() {
    layout.classList.add('sidebar-collapsed');
    expandBtn.classList.add('visible');
    localStorage.setItem('editor-sidebar-collapsed', 'true');
    // Collapsed grid: sidebar+handle gone, editor+preview split evenly
    layout.style.gridTemplateColumns = '0px 0px 1fr 6px 1fr';
  }

  function expandSidebar() {
    layout.classList.remove('sidebar-collapsed');
    expandBtn.classList.remove('visible');
    localStorage.setItem('editor-sidebar-collapsed', 'false');
    // Restore saved sizes or use defaults
    const sizes = loadPanelSizes();
    if (sizes) {
      applyPanelSizes(sizes);
    } else {
      layout.style.gridTemplateColumns = '';
    }
  }
}

init();
