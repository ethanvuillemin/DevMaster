/**
 * PDF Generator Utility
 * Génère des PDFs professionnels et bien structurés côté client
 */

// ═══════════════════════════════════════════════════════════════
// Design System pour PDF
// ═══════════════════════════════════════════════════════════════

const PDF_STYLES = {
  // Couleurs professionnelles
  colors: {
    primary: '#1f2328',
    secondary: '#424a53',
    muted: '#656d76',
    accent: '#0969da',
    accentDark: '#0550ae',
    success: '#1a7f37',
    warning: '#9a6700',
    danger: '#cf222e',
    background: '#ffffff',
    surface: '#f6f8fa',
    surfaceAlt: '#eaeef2',
    border: '#d0d7de',
    borderLight: '#eaeef2',
  },
  
  // Typography
  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  
  // Spacing (in px)
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  }
};

// ═══════════════════════════════════════════════════════════════
// Base CSS pour tous les PDFs
// ═══════════════════════════════════════════════════════════════

const getBaseCSS = () => `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  @page {
    margin: 15mm;
    size: A4;
  }
  
  body {
    font-family: ${PDF_STYLES.fonts.sans};
    font-size: 10px;
    line-height: 1.5;
    color: ${PDF_STYLES.colors.primary};
    background: ${PDF_STYLES.colors.background};
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  /* Header commun */
  .pdf-header {
    text-align: center;
    padding-bottom: 16px;
    margin-bottom: 20px;
    border-bottom: 2px solid ${PDF_STYLES.colors.accent};
    position: relative;
  }
  
  .pdf-header::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: ${PDF_STYLES.colors.warning};
  }
  
  .pdf-header h1 {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.5px;
    margin-bottom: 4px;
    color: ${PDF_STYLES.colors.primary};
  }
  
  .pdf-header .subtitle {
    font-size: 12px;
    color: ${PDF_STYLES.colors.muted};
    font-weight: 500;
  }
  
  .pdf-header .badge {
    display: inline-block;
    margin-top: 8px;
    padding: 3px 12px;
    background: ${PDF_STYLES.colors.surface};
    border: 1px solid ${PDF_STYLES.colors.border};
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${PDF_STYLES.colors.accent};
  }
  
  /* Footer commun */
  .pdf-footer {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid ${PDF_STYLES.colors.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9px;
    color: ${PDF_STYLES.colors.muted};
  }
  
  .pdf-footer .logo {
    font-weight: 700;
    color: ${PDF_STYLES.colors.accent};
  }
  
  /* Section styles */
  .section {
    margin-bottom: 16px;
    page-break-inside: avoid;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    padding: 8px 12px;
    background: ${PDF_STYLES.colors.surface};
    border-left: 3px solid currentColor;
  }
  
  .section-title h3 {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .section-title .count {
    margin-left: auto;
    font-size: 9px;
    padding: 2px 8px;
    background: ${PDF_STYLES.colors.background};
    border: 1px solid ${PDF_STYLES.colors.border};
    font-weight: 600;
  }
  
  /* Card styles */
  .card {
    background: ${PDF_STYLES.colors.background};
    border: 1px solid ${PDF_STYLES.colors.border};
    padding: 10px;
    margin-bottom: 8px;
    page-break-inside: avoid;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6px;
  }
  
  .card-title {
    font-size: 10px;
    font-weight: 700;
    color: ${PDF_STYLES.colors.primary};
  }
  
  .card-badge {
    font-size: 8px;
    padding: 2px 6px;
    background: ${PDF_STYLES.colors.surface};
    border: 1px solid ${PDF_STYLES.colors.border};
    font-family: ${PDF_STYLES.fonts.mono};
    color: ${PDF_STYLES.colors.accent};
    font-weight: 600;
  }
  
  /* Code/Formula box */
  .code-box {
    font-family: ${PDF_STYLES.fonts.mono};
    font-size: 9px;
    padding: 8px 10px;
    background: ${PDF_STYLES.colors.surfaceAlt};
    border: 1px solid ${PDF_STYLES.colors.borderLight};
    margin: 6px 0;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  
  /* Table styles */
  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9px;
  }
  
  .table th,
  .table td {
    padding: 6px 8px;
    border: 1px solid ${PDF_STYLES.colors.border};
    text-align: left;
  }
  
  .table th {
    background: ${PDF_STYLES.colors.surface};
    font-weight: 700;
    text-transform: uppercase;
    font-size: 8px;
    letter-spacing: 0.3px;
  }
  
  .table tr:nth-child(even) td {
    background: ${PDF_STYLES.colors.surface};
  }
  
  .table .cmd {
    font-family: ${PDF_STYLES.fonts.mono};
    font-weight: 600;
    white-space: nowrap;
    color: ${PDF_STYLES.colors.accent};
  }
  
  /* Grid layout */
  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  
  /* Pros/Cons boxes */
  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 8px;
  }
  
  .pros-box,
  .cons-box {
    padding: 8px;
    font-size: 8px;
  }
  
  .pros-box {
    background: rgba(26, 127, 55, 0.08);
    border-left: 2px solid ${PDF_STYLES.colors.success};
  }
  
  .cons-box {
    background: rgba(207, 34, 46, 0.08);
    border-left: 2px solid ${PDF_STYLES.colors.danger};
  }
  
  .pros-box h4,
  .cons-box h4 {
    font-size: 8px;
    font-weight: 700;
    margin-bottom: 4px;
    text-transform: uppercase;
  }
  
  .pros-box h4 { color: ${PDF_STYLES.colors.success}; }
  .cons-box h4 { color: ${PDF_STYLES.colors.danger}; }
  
  .pros-box ul,
  .cons-box ul {
    list-style: none;
    padding: 0;
  }
  
  .pros-box li,
  .cons-box li {
    padding-left: 10px;
    position: relative;
    margin-bottom: 2px;
  }
  
  .pros-box li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${PDF_STYLES.colors.success};
  }
  
  .cons-box li::before {
    content: '✗';
    position: absolute;
    left: 0;
    color: ${PDF_STYLES.colors.danger};
  }
  
  /* Use cases box */
  .use-cases {
    margin-top: 8px;
    padding: 8px;
    background: ${PDF_STYLES.colors.surface};
    border-left: 2px solid ${PDF_STYLES.colors.accent};
  }
  
  .use-cases h4 {
    font-size: 8px;
    font-weight: 700;
    color: ${PDF_STYLES.colors.accent};
    margin-bottom: 4px;
    text-transform: uppercase;
  }
  
  .use-cases ul {
    list-style: none;
    padding: 0;
    font-size: 8px;
    color: ${PDF_STYLES.colors.secondary};
  }
  
  .use-cases li {
    padding-left: 12px;
    position: relative;
    margin-bottom: 2px;
  }
  
  .use-cases li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: ${PDF_STYLES.colors.accent};
  }
  
  /* Quick reference guide */
  .quick-guide {
    margin-top: 20px;
    padding: 12px;
    background: linear-gradient(135deg, ${PDF_STYLES.colors.surface} 0%, ${PDF_STYLES.colors.background} 100%);
    border: 1px solid ${PDF_STYLES.colors.accent};
  }
  
  .quick-guide h3 {
    font-size: 11px;
    font-weight: 700;
    color: ${PDF_STYLES.colors.accent};
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .quick-guide-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  }
  
  .quick-guide-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 6px;
    background: ${PDF_STYLES.colors.background};
    border: 1px solid ${PDF_STYLES.colors.borderLight};
  }
  
  .quick-guide-item .q {
    font-weight: 600;
    font-size: 8px;
    color: ${PDF_STYLES.colors.primary};
    flex: 1;
  }
  
  .quick-guide-item .a {
    font-size: 8px;
    color: ${PDF_STYLES.colors.accent};
    font-weight: 600;
    text-align: right;
  }
  
  /* Description text */
  .description {
    font-size: 9px;
    color: ${PDF_STYLES.colors.secondary};
    line-height: 1.5;
    margin-bottom: 6px;
  }
  
  /* Page break control */
  .page-break {
    page-break-after: always;
  }
  
  .no-break {
    page-break-inside: avoid;
  }
`;

// ═══════════════════════════════════════════════════════════════
// Git Cheatsheet PDF Generator
// ═══════════════════════════════════════════════════════════════

export function generateGitCheatsheetHTML(sections) {
  const sectionsHTML = sections.map(section => {
    const rowsHTML = section.commands.map(cmd => `
      <tr>
        <td class="cmd">${escapeHtml(cmd.cmd)}</td>
        <td>${escapeHtml(cmd.desc)}</td>
      </tr>
    `).join('');

    return `
      <div class="section" style="border-left-color: ${section.colorHex};">
        <div class="section-title" style="color: ${section.colorHex};">
          <h3>${escapeHtml(section.title)}</h3>
          <span class="count">${section.commands.length} cmds</span>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th style="width: 45%;">Commande</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHTML}
          </tbody>
        </table>
      </div>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Git Cheatsheet — DevMaster</title>
      <style>${getBaseCSS()}</style>
    </head>
    <body>
      <div class="pdf-header">
        <h1>🌿 Git Cheatsheet</h1>
        <p class="subtitle">Référence rapide des commandes essentielles</p>
        <span class="badge">Version contrôle</span>
      </div>
      
      <div class="grid-2">
        ${sectionsHTML}
      </div>
      
      <div class="pdf-footer">
        <span class="logo">DevMaster</span>
        <span>devmaster.app — Généré le ${new Date().toLocaleDateString('fr-FR')}</span>
      </div>
    </body>
    </html>
  `;
}

// ═══════════════════════════════════════════════════════════════
// ML Metrics Cheatsheet PDF Generator
// ═══════════════════════════════════════════════════════════════

export function generateMLMetricsCheatsheetHTML(data) {
  const sectionsHTML = data.sections.map((section, sectionIdx) => {
    const metricsHTML = section.metrics.map(metric => `
      <div class="card no-break">
        <div class="card-header">
          <span class="card-title">${escapeHtml(metric.name)}</span>
          <span class="card-badge">${escapeHtml(metric.range.split('—')[0].trim())}</span>
        </div>
        
        <div class="code-box">${escapeHtml(metric.formula)}</div>
        
        <p class="description">${escapeHtml(metric.interpretation)}</p>
        
        <div class="use-cases">
          <h4>Cas d'utilisation</h4>
          <ul>
            ${metric.useCases.slice(0, 3).map(uc => `<li>${escapeHtml(uc)}</li>`).join('')}
          </ul>
        </div>
        
        <div class="pros-cons">
          <div class="pros-box">
            <h4>Avantages</h4>
            <ul>
              ${metric.pros.slice(0, 2).map(p => `<li>${escapeHtml(p)}</li>`).join('')}
            </ul>
          </div>
          <div class="cons-box">
            <h4>Limites</h4>
            <ul>
              ${metric.cons.slice(0, 2).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `).join('');

    return `
      <div class="section ${sectionIdx > 0 && sectionIdx % 2 === 0 ? 'page-break' : ''}">
        <div class="section-title" style="color: ${section.colorHex}; border-left-color: ${section.colorHex};">
          <h3>${escapeHtml(section.title)}</h3>
          <span class="count">${section.metrics.length} métriques</span>
        </div>
        <p class="description" style="margin-bottom: 12px; padding-left: 15px;">
          ${escapeHtml(section.description)}
        </p>
        <div class="grid-2">
          ${metricsHTML}
        </div>
      </div>
    `;
  }).join('');

  // Selection Guide
  const guideHTML = data.selectionGuide.scenarios.map(s => `
    <div class="quick-guide-item">
      <span class="q">${escapeHtml(s.question)}</span>
      <span class="a">${escapeHtml(s.answer)}</span>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ML Metrics Cheatsheet — DevMaster</title>
      <style>${getBaseCSS()}</style>
    </head>
    <body>
      <div class="pdf-header">
        <h1>🤖 ML Metrics Cheatsheet</h1>
        <p class="subtitle">Métriques d'évaluation pour le Machine Learning</p>
        <span class="badge">Data Science</span>
      </div>
      
      ${sectionsHTML}
      
      <div class="quick-guide no-break">
        <h3>🧭 Guide de sélection rapide</h3>
        <div class="quick-guide-grid">
          ${guideHTML}
        </div>
      </div>
      
      <div class="pdf-footer">
        <span class="logo">DevMaster</span>
        <span>devmaster.app — Généré le ${new Date().toLocaleDateString('fr-FR')}</span>
      </div>
    </body>
    </html>
  `;
}

// ═══════════════════════════════════════════════════════════════
// Utility Functions
// ═══════════════════════════════════════════════════════════════

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = String(text);
  return div.innerHTML;
}

/**
 * Opens print dialog for PDF generation
 */
export function printToPDF(html, filename) {
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  
  if (!printWindow) {
    alert('Veuillez autoriser les popups pour télécharger le PDF.\n\nCliquez sur l\'icône de blocage dans la barre d\'adresse pour autoriser.');
    return;
  }
  
  printWindow.document.write(html);
  printWindow.document.close();
  
  // Set document title for PDF filename
  printWindow.document.title = filename;
  
  // Wait for content to load then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 300);
  };
}

/**
 * Download Git Cheatsheet as PDF
 */
export function downloadGitCheatsheet(sections) {
  const html = generateGitCheatsheetHTML(sections);
  printToPDF(html, 'Git-Cheatsheet-DevMaster');
}

/**
 * Download ML Metrics Cheatsheet as PDF
 */
export function downloadMLMetricsCheatsheet(data) {
  const html = generateMLMetricsCheatsheetHTML(data);
  printToPDF(html, 'ML-Metrics-Cheatsheet-DevMaster');
}

// Export default object
export default {
  downloadGitCheatsheet,
  downloadMLMetricsCheatsheet,
  printToPDF,
  generateGitCheatsheetHTML,
  generateMLMetricsCheatsheetHTML,
};
