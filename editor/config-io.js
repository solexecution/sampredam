const fs = require('fs');
const path = require('path');
const vm = require('vm');

const CONFIG_PATH = path.resolve(__dirname, '..', 'config.js');

/** Read window.CONFIG from config.js and return as a plain object */
function readConfig() {
  const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
  const sandbox = { window: {} };
  vm.runInNewContext(raw, sandbox);
  return sandbox.window.CONFIG;
}

/** Write the CONFIG object back to config.js, preserving WHERE_TO_POST */
function writeConfig(configObj) {
  const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');

  // Extract WHERE_TO_POST block (everything from its comment header to end of file)
  const whereIdx = raw.indexOf('/* ====');
  const secondBlock = raw.indexOf('/* ====', whereIdx + 1);
  // Find the WHERE_TO_POST section — it's the second large comment block
  let whereToPostSection = '';
  const marker = 'WHERE TO POST';
  const markerIdx = raw.indexOf(marker);
  if (markerIdx !== -1) {
    // Go back to find the start of that comment block
    const blockStart = raw.lastIndexOf('/*', markerIdx);
    whereToPostSection = raw.slice(blockStart);
  }

  const header = `/* =====================================================================
   PROPERTY LISTING CONFIGURATION
   =====================================================================
   This file is your checklist. Fill in each field below.

   Rules:
   - Empty string ""  → that element will be HIDDEN on the website
   - Filled value     → shown normally on the website
   - If you forget to update a placeholder, it will be HIGHLIGHTED
     with an orange border so you can spot it immediately

   After editing, just refresh the browser to see changes.
   ===================================================================== */`;

  const configJS = serializeConfig(configObj);
  const output = `${header}\n\nwindow.CONFIG = ${configJS};\n\n\n${whereToPostSection}`;

  fs.writeFileSync(CONFIG_PATH, output, 'utf-8');
}

/** Serialize a config object to clean, human-readable JS (not JSON) */
function serializeConfig(obj) {
  return serializeValue(obj, 0);
}

function serializeValue(val, depth) {
  if (val === null || val === undefined) return '""';
  if (val === true) return 'true';
  if (val === false) return 'false';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'string') return serializeString(val);
  if (Array.isArray(val)) return serializeArray(val, depth);
  if (typeof val === 'object') return serializeObject(val, depth);
  return '""';
}

function serializeString(str) {
  // Use double quotes, escape what's needed
  const escaped = str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
  return `"${escaped}"`;
}

function serializeArray(arr, depth) {
  if (arr.length === 0) return '[]';

  const indent = '  '.repeat(depth + 1);
  const closingIndent = '  '.repeat(depth);

  // For arrays of simple strings, try inline if short enough
  if (arr.every(v => typeof v === 'string') && JSON.stringify(arr).length < 100) {
    return '[\n' + arr.map(v => `${indent}${serializeString(v)},`).join('\n') + `\n${closingIndent}]`;
  }

  const items = arr.map(item => {
    const serialized = serializeValue(item, depth + 1);
    return `${indent}${serialized},`;
  });

  return `[\n${items.join('\n')}\n${closingIndent}]`;
}

function serializeObject(obj, depth) {
  const keys = Object.keys(obj);
  if (keys.length === 0) return '{}';

  const indent = '  '.repeat(depth + 1);
  const closingIndent = '  '.repeat(depth);

  // For simple flat objects (like gallery items), try compact single-line
  const isSimple = keys.every(k => typeof obj[k] === 'string' || typeof obj[k] === 'number' || typeof obj[k] === 'boolean');
  if (isSimple && keys.length <= 3) {
    const inline = keys.map(k => `${k}: ${serializeValue(obj[k], 0)}`).join(', ');
    if (inline.length < 120) {
      return `{ ${inline} }`;
    }
  }

  const entries = keys.map(key => {
    const val = serializeValue(obj[key], depth + 1);
    return `${indent}${key}: ${val},`;
  });

  return `{\n${entries.join('\n')}\n${closingIndent}}`;
}

module.exports = { readConfig, writeConfig };
