import { PROFILE_DATA } from '../data/profileData';
import { BRAND_ICONS, getToolIcon, getCategoryIcon } from '../utils/icons';

const CATEGORY_ACCENTS: Record<string, string> = {
  'UX/UI DESIGN': '#38bdf8',
  'FRONT-END DEVELOPMENT': '#34d399',
  'GRAPHIC DESIGN': '#fb923c',
  'MOTION DESIGN': '#c084fc',
  'AI × CREATIVE TECH': '#fbbf24',
  'GEOSPATIAL & ENTERPRISE': '#06b6d4',
  'DESIGN LEADERSHIP & OPS': '#94a3b8'
};

const TOOL_GROUP_COLORS: Record<string, string> = {
  'DESIGN & PROTOTYPING': '#c084fc',
  'AI & FRONTIER MODELS': '#fbbf24',
  'WEB & CREATIVE CODE': '#34d399',
  'MOTION & VIDEO': '#f43f5e',
  'ENTERPRISE & SPATIAL': '#38bdf8'
};

function getToolBrandColor(toolName: string): string {
  const t = toolName.toLowerCase();
  if (t.includes('figma')) return '#a259ff';
  if (t.includes('photoshop')) return '#31a8ff';
  if (t.includes('illustrator')) return '#ff9a00';
  if (t.includes('after effects')) return '#9999ff';
  if (t.includes('premiere')) return '#ea77ff';
  if (t.includes('claude')) return '#d97706';
  if (t.includes('chatgpt') || t.includes('openai')) return '#10a37f';
  if (t.includes('gemini')) return '#4285f4';
  if (t.includes('three.js') || t.includes('webgl')) return '#38bdf8';
  if (t.includes('html5')) return '#e34f26';
  if (t.includes('css3') || t.includes('css')) return '#1572b6';
  if (t.includes('typescript')) return '#3178c6';
  if (t.includes('javascript')) return '#f7df1e';
  if (t.includes('react')) return '#61dafb';
  if (t.includes('github')) return '#f0f6fc';
  if (t.includes('vercel')) return '#ffffff';
  if (t.includes('vite')) return '#bd34fe';
  if (t.includes('midjourney') || t.includes('flux')) return '#c084fc';
  return '#38bdf8';
}

function getDisciplineWatermark(id: string): string {
  switch (id) {
    case 'ux-ui-design':
      return `
        <svg class="discipline-watermark-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="100" height="100" rx="16" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/>
          <circle cx="35" cy="40" r="14" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="85" cy="40" r="14" stroke="currentColor" stroke-width="1.5"/>
          <path d="M35 54v25h50V54" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="60" cy="79" r="12" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      `;
    case 'front-end':
      return `
        <svg class="discipline-watermark-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 35L45 60L20 85" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M100 35L75 60L100 85" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="68" y1="25" x2="52" y2="95" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="35" y="48" width="50" height="24" rx="4" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>
        </svg>
      `;
    case 'graphic-design':
      return `
        <svg class="discipline-watermark-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="48" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/>
          <rect x="25" y="25" width="70" height="70" stroke="currentColor" stroke-width="1.5"/>
          <path d="M25 95A70 70 0 0 1 95 25" stroke="currentColor" stroke-width="2"/>
          <circle cx="60" cy="60" r="4" fill="currentColor"/>
        </svg>
      `;
    case 'motion-design':
      return `
        <svg class="discipline-watermark-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 95C30 95 40 25 60 25C80 25 90 95 110 95" stroke="currentColor" stroke-width="2"/>
          <line x1="30" y1="95" x2="40" y2="25" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>
          <line x1="80" y1="25" x2="90" y2="95" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>
          <circle cx="40" cy="25" r="4" fill="currentColor"/>
          <circle cx="80" cy="25" r="4" fill="currentColor"/>
        </svg>
      `;
    case 'ai-design':
    default:
      return `
        <svg class="discipline-watermark-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="60,15 100,38 100,82 60,105 20,82 20,38" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="60" cy="60" r="16" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.5"/>
          <line x1="60" y1="15" x2="60" y2="44" stroke="currentColor" stroke-width="1"/>
          <line x1="100" y1="82" x2="74" y2="68" stroke="currentColor" stroke-width="1"/>
          <line x1="20" y1="82" x2="46" y2="68" stroke="currentColor" stroke-width="1"/>
        </svg>
      `;
  }
}

function getSkillTierBadge(skill: string): string {
  const s = skill.toUpperCase();
  if (s.includes('SYSTEM') || s.includes('TOKEN')) return 'SYSTEMS';
  if (s.includes('CODE') || s.includes('CSS') || s.includes('HTML') || s.includes('SCRIPT')) return 'PROD';
  if (s.includes('60FPS') || s.includes('PERFORMANCE') || s.includes('OPTIMIZATION')) return '60FPS';
  if (s.includes('ENTERPRISE') || s.includes('DASHBOARD') || s.includes('TELEMATICS')) return 'ENTERPRISE';
  if (s.includes('LEAD') || s.includes('MENTOR') || s.includes('GOVERNANCE') || s.includes('OPS')) return 'LEAD';
  if (s.includes('GPU') || s.includes('INFERENCE') || s.includes('SYNTHESIS') || s.includes('AI') || s.includes('PROMPT')) return 'AI/OPS';
  if (s.includes('GIS') || s.includes('MAP') || s.includes('SPATIAL') || s.includes('GEOFENCING')) return 'SPATIAL';
  if (s.includes('ACCESSIBILITY') || s.includes('WCAG')) return 'WCAG';
  if (s.includes('MOTION') || s.includes('EASING') || s.includes('PHYSICS') || s.includes('BÉZIER')) return 'KINETIC';
  if (s.includes('GRID') || s.includes('TYPO') || s.includes('RATIO') || s.includes('BRAND')) return 'CRAFT';
  if (s.includes('PROTOTYP') || s.includes('WIREFRAM')) return 'ARCH';
  return 'CORE';
}

export class ProfileController {
  private activeSkillCategory: string = 'ALL';
  private activeArticleCategory: string = 'ALL';
  private skillSearchQuery: string = '';

  constructor() {
    this.init();
  }

  private init(): void {
    this.renderDisciplines();
    this.renderSkillMatrix();
    this.renderToolsEcosystem();
    this.renderCredentialVault();
    this.renderArticles();
    this.renderLeadership();
    this.initInteractiveListeners();
    this.initArticleModalListeners();
  }

  // 1. WHAT I DESIGN / DISCIPLINES
  private renderDisciplines(): void {
    const container = document.getElementById('disciplines-grid');
    if (!container) return;

    container.innerHTML = PROFILE_DATA.disciplines
      .map((d) => {
        let sandboxMarkup = '';
        if (d.id === 'ux-ui-design' || d.id === 'ui-design' || d.id === 'ux-design') {
          sandboxMarkup = `
            <div class="discipline-sandbox ui-sandbox">
              <div class="sandbox-header">
                <span class="sandbox-tag">LIVE DESIGN TOKEN STUDIO</span>
                <div class="token-hue-picker">
                  <span class="token-hue-dot active" data-hue="#38bdf8" style="background:#38bdf8;" title="Cyan"></span>
                  <span class="token-hue-dot" data-hue="#fbbf24" style="background:#fbbf24;" title="Amber"></span>
                  <span class="token-hue-dot" data-hue="#c084fc" style="background:#c084fc;" title="Violet"></span>
                  <span class="token-hue-dot" data-hue="#34d399" style="background:#34d399;" title="Emerald"></span>
                </div>
              </div>
              <div class="token-preview-card" id="token-preview-card">
                <div class="token-card-top">
                  <span class="token-chip">TOKENIZED UI</span>
                  <span class="token-dot-live"></span>
                </div>
                <div class="token-code-preview" id="token-code-output">
                  <code>--accent: #38bdf8; --blur: 20px; --radius: 16px;</code>
                </div>
              </div>
              <div class="token-controls-grid">
                <div class="token-slider-item">
                  <div class="slider-meta"><span>Blur</span><span id="val-blur">20px</span></div>
                  <input type="range" id="token-slider-blur" min="0" max="40" value="20" class="mini-slider" />
                </div>
                <div class="token-slider-item">
                  <div class="slider-meta"><span>Radius</span><span id="val-radius">16px</span></div>
                  <input type="range" id="token-slider-radius" min="0" max="32" value="16" class="mini-slider" />
                </div>
              </div>
            </div>
          `;
        } else if (d.id === 'front-end') {
          sandboxMarkup = `
            <div class="discipline-sandbox fe-sandbox">
              <div class="sandbox-header">
                <span class="sandbox-tag">CSS LAYOUT ENGINE</span>
                <div class="fe-mode-toggle">
                  <button type="button" class="fe-mode-btn active" data-mode="flex">Flexbox</button>
                  <button type="button" class="fe-mode-btn" data-mode="grid">Grid</button>
                </div>
              </div>
              <div class="fe-preview-stage" id="frontend-preview-stage">
                <div class="fe-stage-item item-1"><span>01</span></div>
                <div class="fe-stage-item item-2"><span>02</span></div>
                <div class="fe-stage-item item-3"><span>03</span></div>
              </div>
              <div class="fe-controls-row">
                <div class="fe-justify-options">
                  <button type="button" class="fe-justify-btn active" data-justify="space-between">between</button>
                  <button type="button" class="fe-justify-btn" data-justify="center">center</button>
                  <button type="button" class="fe-justify-btn" data-justify="flex-start">start</button>
                </div>
                <div class="fe-slider-wrap">
                  <span class="ctrl-label">Gap: <strong id="val-fe-gap">12px</strong></span>
                  <input type="range" id="fe-slider-gap" min="4" max="28" value="12" class="mini-slider" />
                </div>
              </div>
              <div class="token-code-preview" id="frontend-code-output">
                <code>display: flex; justify-content: space-between; gap: 12px;</code>
              </div>
            </div>
          `;
        } else if (d.id === 'graphic-design') {
          sandboxMarkup = `
            <div class="discipline-sandbox graphic-sandbox">
              <div class="sandbox-header">
                <span class="sandbox-tag">TYPOGRAPHY & RATIO LAB</span>
                <button type="button" class="sandbox-btn" id="toggle-phi-guide">φ 1.618 Grid</button>
              </div>
              <div class="grid-controls-row">
                <span class="ctrl-label">Columns: <strong id="val-cols">6 cols</strong></span>
                <input type="range" id="grid-slider-cols" min="4" max="12" value="6" class="mini-slider" />
              </div>
              <div class="grid-demo-columns" id="grid-demo-columns"></div>
            </div>
          `;
        } else if (d.id === 'motion-design') {
          sandboxMarkup = `
            <div class="discipline-sandbox motion-sandbox">
              <div class="sandbox-header">
                <span class="sandbox-tag">SPRING PHYSICS & CURVE LAB</span>
                <button type="button" class="sandbox-btn action" id="trigger-physics-btn">▶ Test Easing</button>
              </div>
              <div class="motion-graph-container">
                <canvas id="motion-graph-canvas" width="280" height="70" class="motion-canvas"></canvas>
              </div>
              <div class="physics-runner-track">
                <div class="physics-runner-ball" id="physics-runner-ball"></div>
              </div>
              <div class="motion-presets-row">
                <button type="button" class="motion-preset-chip active" data-preset="snappy">Snappy</button>
                <button type="button" class="motion-preset-chip" data-preset="elastic">Elastic</button>
                <button type="button" class="motion-preset-chip" data-preset="smooth">Smooth</button>
              </div>
            </div>
          `;
        } else {
          // ai-design
          sandboxMarkup = `
            <div class="discipline-sandbox ai-sandbox">
              <div class="sandbox-header">
                <span class="sandbox-tag">GENERATIVE NEURAL FIELD</span>
                <span class="sandbox-status">● CURSOR ACTIVE</span>
              </div>
              <div class="neural-canvas-wrap">
                <canvas id="neural-interactive-canvas" class="neural-canvas"></canvas>
              </div>
              <div class="neural-legend">
                <span>MOVE MOUSE TO DEFLECT NEURAL PARTICLES</span>
              </div>
            </div>
          `;
        }

        return `
          <div class="discipline-card" data-discipline="${d.id}" style="--disc-accent: ${d.accent};">
            ${getDisciplineWatermark(d.id)}
            <div class="discipline-card-header">
              <div class="discipline-badge">${d.badge}</div>
            </div>

            <h3 class="discipline-title">${d.title}</h3>
            <p class="discipline-tagline">${d.tagline}</p>
            <p class="discipline-desc">${d.summary}</p>

            ${sandboxMarkup}

            <div class="discipline-focus-list">
              <span class="focus-list-label">PRACTICE DOMAINS:</span>
              <ul>
                ${d.focusAreas.map((item) => `<li><span class="focus-bullet">▹</span> ${item}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
      })
      .join('');
  }

  // 2. SKILLS MATRIX
  private renderSkillMatrix(): void {
    const filtersContainer = document.getElementById('skill-matrix-filters');
    const gridContainer = document.getElementById('skill-matrix-grid');
    if (!gridContainer) return;

    // Search and view switcher listeners
    const searchInput = document.getElementById('skill-search-input') as HTMLInputElement | null;
    const searchClear = document.getElementById('skill-search-clear');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        this.skillSearchQuery = searchInput.value.trim().toLowerCase();
        if (searchClear) {
          searchClear.style.display = this.skillSearchQuery ? 'inline-flex' : 'none';
        }
        this.renderSkillMatrixGrid();
      });
    }

    if (searchClear && searchInput) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        this.skillSearchQuery = '';
        searchClear.style.display = 'none';
        searchInput.focus();
        this.renderSkillMatrixGrid();
      });
    }

    const btnMatrix = document.getElementById('btn-view-matrix');
    const btnGalaxy = document.getElementById('btn-view-galaxy');
    const galaxyWrapper = document.getElementById('orbital-galaxy-wrapper');

    if (btnMatrix && btnGalaxy) {
      btnMatrix.addEventListener('click', () => {
        btnMatrix.classList.add('active');
        btnGalaxy.classList.remove('active');
        if (galaxyWrapper) galaxyWrapper.style.display = 'none';
      });

      btnGalaxy.addEventListener('click', () => {
        btnGalaxy.classList.add('active');
        btnMatrix.classList.remove('active');
        if (galaxyWrapper) {
          galaxyWrapper.style.display = 'block';
          window.dispatchEvent(new Event('resize'));
        }
      });
    }

    // Filters
    if (filtersContainer) {
      filtersContainer.innerHTML = `
        <button class="skill-filter-btn ${this.activeSkillCategory === 'ALL' ? 'active' : ''}" data-category="ALL">
          <span>All Domains</span>
          <span class="filter-count">${PROFILE_DATA.skills.reduce((acc, cat) => acc + cat.skills.length, 0)}</span>
        </button>
        ${PROFILE_DATA.skills
          .map(
            (cat) => `
          <button class="skill-filter-btn ${this.activeSkillCategory === cat.category ? 'active' : ''}" data-category="${cat.category}">
            <span>${cat.category}</span>
            <span class="filter-count">${cat.skills.length}</span>
          </button>
        `
          )
          .join('')}
      `;

      filtersContainer.querySelectorAll('.skill-filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          filtersContainer.querySelectorAll('.skill-filter-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          this.activeSkillCategory = btn.getAttribute('data-category') || 'ALL';
          this.renderSkillMatrixGrid();
        });
      });
    }

    this.renderSkillMatrixGrid();
  }

  private renderSkillMatrixGrid(): void {
    const gridContainer = document.getElementById('skill-matrix-grid');
    if (!gridContainer) return;

    const query = this.skillSearchQuery;
    const filteredCategories = PROFILE_DATA.skills
      .filter((s) => this.activeSkillCategory === 'ALL' || s.category === this.activeSkillCategory)
      .map((cat) => {
        if (!query) return { ...cat, matchingSkills: cat.skills };
        const matching = cat.skills.filter((sk) => sk.toLowerCase().includes(query));
        return { ...cat, matchingSkills: matching };
      })
      .filter((cat) => cat.matchingSkills.length > 0);

    if (filteredCategories.length === 0) {
      gridContainer.innerHTML = `
        <div class="skill-empty-search">
          <div class="empty-icon">🔍</div>
          <div class="empty-title">No competencies found for "${query}"</div>
          <div class="empty-desc">Try searching for keywords like "Tokens", "CSS", "Motion", "GIS", or "Figma".</div>
          <button type="button" class="empty-reset-btn" id="btn-empty-reset">Clear Search Query</button>
        </div>
      `;
      document.getElementById('btn-empty-reset')?.addEventListener('click', () => {
        const searchInput = document.getElementById('skill-search-input') as HTMLInputElement | null;
        if (searchInput) searchInput.value = '';
        this.skillSearchQuery = '';
        const searchClear = document.getElementById('skill-search-clear');
        if (searchClear) searchClear.style.display = 'none';
        this.renderSkillMatrixGrid();
      });
      return;
    }

    gridContainer.innerHTML = filteredCategories
      .map((cat) => {
        const accent = CATEGORY_ACCENTS[cat.category] || '#38bdf8';
        return `
          <div class="skill-category-group" style="--cat-accent: ${accent};">
            <div class="category-header">
              <span class="cat-icon" style="color: ${accent}; border-color: ${accent}40; background: ${accent}15;">
                ${getCategoryIcon(cat.category)}
              </span>
              <div class="cat-title-wrap">
                <h4 class="cat-title">${cat.category}</h4>
                <span class="cat-count-badge">${cat.matchingSkills.length} competencies</span>
              </div>
            </div>

            <div class="skill-matrix-rows">
              ${cat.matchingSkills
                .map((skill) => {
                  const tier = getSkillTierBadge(skill);
                  const displayName = query
                    ? skill.replace(new RegExp(`(${query})`, 'gi'), '<mark class="skill-highlight">$1</mark>')
                    : skill;
                  return `
                    <div class="skill-matrix-row">
                      <div class="skill-row-info">
                        <span class="skill-row-bullet" style="color: ${accent};">▹</span>
                        <span class="skill-row-name">${displayName}</span>
                      </div>
                      <span class="skill-tier-badge" style="border-color: ${accent}30; color: ${accent};">${tier}</span>
                    </div>
                  `;
                })
                .join('')}
            </div>
          </div>
        `;
      })
      .join('');
  }

  // 3. TOOLS ECOSYSTEM
  private renderToolsEcosystem(): void {
    const container = document.getElementById('tools-ecosystem-grid');
    if (!container) return;

    const cardsMarkup = PROFILE_DATA.tools
      .map(
        (group) => {
          const accent = TOOL_GROUP_COLORS[group.category] || '#38bdf8';
          return `
          <div class="tool-cluster-card" style="--cluster-accent: ${accent};">
            <div class="cluster-header">
              <div class="cluster-meta">
                <span class="cluster-badge" style="color: ${accent}; border-color: ${accent}40; background: ${accent}12;">${group.badge}</span>
                <h4 class="cluster-title">${group.category}</h4>
              </div>
            </div>
            <p class="cluster-desc">${group.description}</p>

            <div class="tools-pills-list">
              ${group.tools
                .map(
                  (tool) => {
                    const toolColor = getToolBrandColor(tool.name);
                    return `
                    <div class="tool-pill-item ${tool.highlighted ? 'highlighted' : ''}" style="--tool-accent: ${toolColor};" role="button" tabindex="0" title="Click to add to pipeline synthesizer">
                      <div class="tool-name-line">
                        <span class="tool-brand-icon" style="color: ${toolColor};">${getToolIcon(tool.name)}</span>
                        <span class="tool-name">${tool.name}</span>
                      </div>
                      <span class="tool-tag-label">${tool.tag}</span>
                    </div>
                  `;
                  }
                )
                .join('')}
            </div>
          </div>
        `;
        }
      )
      .join('');

    container.innerHTML = `
      ${cardsMarkup}
      <div class="stack-combinator-hud" id="stack-combinator-result">
        <div class="combinator-header">
          <div class="combinator-meta">
            <span class="combinator-badge">INTERACTIVE PIPELINE SYNTHESIZER</span>
            <h4 class="combinator-title" id="stack-combo-title">CLICK 2 OR 3 TOOLS TO SYNTHESIZE PRODUCTION PIPELINE</h4>
          </div>
          <button type="button" class="combinator-clear-btn" id="btn-clear-stack" aria-label="Reset selection">✕ Reset</button>
        </div>
        <div class="combinator-tokens" id="stack-combo-pills"></div>
        <p class="combinator-desc" id="stack-combo-desc">Click on any tools above (e.g. Figma + Claude + Three.js, or After Effects + Illustrator) to reveal Vinodh's cross-disciplinary workflow synergies.</p>
      </div>
    `;
  }

  // 4. CERTIFICATION VAULT (ANTHROPIC CLAUDE 101)
  private renderCredentialVault(): void {
    const container = document.getElementById('credential-vault-card');
    if (!container) return;

    const cert = PROFILE_DATA.certifications[0];
    if (!cert) return;

    container.innerHTML = `
      <div class="vault-holographic-foil" id="vault-holographic-foil"></div>
      <div class="vault-security-scanline" id="vault-scanline"></div>
      
      <div class="vault-inner-frame">
        <div class="vault-card-topbar">
          <div class="vault-issuer-meta">
            <span class="vault-auth-icon">${BRAND_ICONS.anthropic}</span>
            <div>
              <span class="vault-issuer-label">AUTHENTICATED CREDENTIAL VAULT // 3D SPECULAR TILT</span>
              <h4 class="vault-issuer-name">${cert.issuer.toUpperCase()} OFFICIAL ACCREDITATION</h4>
            </div>
          </div>
          <div class="vault-status-stamp">
            <span class="stamp-check">✓</span>
            <span class="stamp-text">${cert.status}</span>
          </div>
        </div>

        <div class="vault-credential-core">
          <div class="vault-title-group">
            <span class="cert-code-tag">ACCREDITATION // LLM REASONING & PROMPT ARCHITECTURE</span>
            <h3 class="cert-primary-title">${cert.title}</h3>
            <p class="cert-desc-text">${cert.description}</p>
          </div>

          <div class="vault-meta-matrix">
            <div class="vault-meta-item">
              <span class="meta-field-label">ISSUED DATE</span>
              <span class="meta-field-val">${cert.issuedDate}</span>
            </div>
            <div class="vault-meta-item">
              <span class="meta-field-label">EXPIRY PERIOD</span>
              <span class="meta-field-val">${cert.expiryDate}</span>
            </div>
            <div class="vault-meta-item">
              <span class="meta-field-label">UNIQUE CREDENTIAL ID</span>
              <div class="id-decrypt-wrap">
                <span class="meta-field-val credential-code-chip" id="vault-credential-code">${cert.credentialId}</span>
                <button type="button" class="btn-decrypt-mini" id="btn-decrypt-record" title="Run cryptographic verification">⚡ Decrypt & Verify</button>
              </div>
            </div>
            <div class="vault-meta-item">
              <span class="meta-field-label">VERIFICATION RECORD</span>
              <span class="meta-field-val verified-link">Public Registry // Verified</span>
            </div>
          </div>
        </div>

        <div class="vault-card-footer">
          <div class="vault-security-hash">
            <span class="hash-label">CRYPTOGRAPHIC RECORD VERIFIED</span>
            <span class="hash-code">AUTH_KEY//${cert.credentialId}//ACTIVE_SYSTEMS</span>
          </div>
          <a href="${PROFILE_DATA.socialLinks.linkedin}" target="_blank" rel="noopener noreferrer" class="vault-verify-btn">
            <span class="btn-brand-icon-sm">${BRAND_ICONS.linkedin}</span>
            <span>View on LinkedIn Profile</span>
            <span class="arrow-glyph">↗</span>
          </a>
        </div>
      </div>
    `;
  }

  // 5. ARTICLES / THINKING THROUGH DESIGN
  private renderArticles(): void {
    this.renderArticleFilters();
    this.renderArticlesGrid();
  }

  private renderArticleFilters(): void {
    const filterContainer = document.getElementById('articles-filter-bar');
    if (!filterContainer) return;

    // Unique categories from articles data
    const categories = ['ALL', ...Array.from(new Set(PROFILE_DATA.articles.map((a) => a.category)))];

    filterContainer.innerHTML = categories
      .map(
        (cat) => `
        <button type="button" class="article-filter-btn ${this.activeArticleCategory === cat ? 'active' : ''}" data-cat="${cat}">
          ${cat === 'ALL' ? '✦ All Articles' : cat}
        </button>
      `
      )
      .join('');

    const btns = filterContainer.querySelectorAll('.article-filter-btn');
    btns.forEach((b) => {
      b.addEventListener('click', (e) => {
        btns.forEach((btn) => btn.classList.remove('active'));
        const target = e.currentTarget as HTMLElement;
        target.classList.add('active');
        this.activeArticleCategory = target.getAttribute('data-cat') || 'ALL';
        this.renderArticlesGrid();
      });
    });
  }

  private renderArticlesGrid(): void {
    const container = document.getElementById('articles-grid');
    if (!container) return;

    const filtered =
      this.activeArticleCategory === 'ALL'
        ? PROFILE_DATA.articles
        : PROFILE_DATA.articles.filter((a) => a.category === this.activeArticleCategory);

    container.innerHTML = filtered
      .map(
        (art, idx) => `
        <article class="article-thought-card" style="--art-accent: ${art.accentColor || '#38bdf8'};">
          ${art.image ? `
            <div class="article-thumb-banner">
              <img src="${art.image}" alt="${art.title}" class="article-thumb-img" loading="lazy" />
              <div class="article-thumb-gradient"></div>
              <span class="article-category-tag-floating">${art.category}</span>
            </div>
          ` : ''}
          <div class="article-card-inner">
            <div class="article-top-meta">
              <span class="article-num">0${idx + 1} // ESSAY</span>
              <div class="meta-right-tags">
                <span class="article-date-pill">${art.date}</span>
                <span class="article-read-time">${art.readTime}</span>
              </div>
            </div>
            
            <h3 class="article-title">${art.title}</h3>
            <p class="article-summary">${art.summary}</p>
            
            <div class="article-heuristic-callout">
              <span class="heuristic-icon" style="color: var(--art-accent, #38bdf8);">✦</span>
              <p class="heuristic-text">${art.coreInsight}</p>
            </div>
            
            <div class="article-topics-list">
              ${art.topics.map((t) => `<span class="topic-pill">#${t}</span>`).join('')}
            </div>

            <div class="article-card-footer">
              <button type="button" class="btn-article-preview" data-article-id="${art.id}">
                <span>Read Key Insights</span>
                <span class="btn-preview-arrow">▸</span>
              </button>
              <a href="${art.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="article-read-link" title="Open full article on LinkedIn">
                <span class="btn-brand-icon-sm">${BRAND_ICONS.linkedin}</span>
                <span>LinkedIn</span>
                <span class="arrow-glyph">↗</span>
              </a>
            </div>
          </div>
        </article>
      `
      )
      .join('');

    // Attach click listeners to preview buttons
    const previewBtns = container.querySelectorAll('.btn-article-preview');
    previewBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const id = target.getAttribute('data-article-id');
        if (id) this.openArticleModal(id);
      });
    });
  }

  public openArticleModal(articleId: string): void {
    const article = PROFILE_DATA.articles.find((a) => a.id === articleId);
    if (!article) return;

    const modal = document.getElementById('article-modal');
    const modalBody = document.getElementById('article-modal-body');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="article-modal-header">
        <div class="article-modal-meta">
          <span class="modal-essay-tag">LINKEDIN ARTICLE // DESIGN THINKING</span>
          <span class="modal-read-time">${article.readTime}</span>
          <span class="modal-date-tag">${article.date}</span>
        </div>
        <h2 class="article-modal-title">${article.title}</h2>
        <div class="article-modal-cat-wrap">
          <span class="article-modal-cat">${article.category}</span>
        </div>
      </div>

      <div class="article-modal-core-insight">
        <div class="insight-icon">✦</div>
        <div>
          <span class="insight-label">CORE THESIS & HEURISTIC</span>
          <p class="insight-text">${article.coreInsight}</p>
        </div>
      </div>

      <div class="article-modal-section">
        <h4 class="modal-section-heading">CONCEPTUAL OVERVIEW & CONTEXT</h4>
        <p class="article-modal-lead">${article.summary}</p>
        <p class="article-modal-body">${article.excerpt}</p>
      </div>

      <div class="article-modal-section">
        <h4 class="modal-section-heading">ACTIONABLE KEY TAKEAWAYS</h4>
        <ul class="article-takeaways-list">
          ${article.keyTakeaways
            .map(
              (k) => `
            <li>
              <span class="takeaway-check">✓</span>
              <span>${k}</span>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>

      <div class="article-modal-tags-row">
        <span class="tags-label">INDEXED TOPICS:</span>
        <div class="modal-tags-wrap">
          ${article.topics.map((t) => `<span class="modal-topic-chip">#${t}</span>`).join('')}
        </div>
      </div>

      <div class="article-modal-footer">
        <div class="modal-author-credit">
          <div class="author-avatar">VK</div>
          <div>
            <span class="author-name">Vinodh Kumar</span>
            <span class="author-title">Team Lead UX/UI & Motion · Author</span>
          </div>
        </div>
        <a href="${article.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="modal-read-linkedin-btn">
          <span class="btn-brand-icon-sm">${BRAND_ICONS.linkedin}</span>
          <span>Read Full Discussion on LinkedIn</span>
          <span class="arrow-glyph">↗</span>
        </a>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  public closeArticleModal(): void {
    const modal = document.getElementById('article-modal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  private initArticleModalListeners(): void {
    const modal = document.getElementById('article-modal');
    const closeBtn = document.getElementById('article-modal-close');
    const backdrop = document.getElementById('article-modal-backdrop');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeArticleModal());
    }
    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeArticleModal());
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeArticleModal();
    });
  }

  // 6. DESIGN LEADERSHIP
  private renderLeadership(): void {
    const evolutionContainer = document.getElementById('leadership-evolution-track');
    const pillarsContainer = document.getElementById('leadership-pillars-grid');

    if (evolutionContainer) {
      evolutionContainer.innerHTML = PROFILE_DATA.leadership.evolution
        .map(
          (stage, idx, arr) => `
          <div class="evolution-node ${idx === arr.length - 1 ? 'current' : ''}">
            <div class="evolution-step-indicator">
              <span class="step-circle">0${idx + 1}</span>
              ${idx < arr.length - 1 ? '<span class="evolution-connector"></span>' : ''}
            </div>
            <span class="evolution-title">${stage}</span>
          </div>
        `
        )
        .join('');
    }

    const PILLAR_COLORS: Record<string, string> = {
      '01': '#38bdf8',
      '02': '#c084fc',
      '03': '#34d399',
      '04': '#fbbf24'
    };

    if (pillarsContainer) {
      pillarsContainer.innerHTML = PROFILE_DATA.leadership.pillars
        .map(
          (pillar) => {
            const accent = PILLAR_COLORS[pillar.number] || '#38bdf8';
            return `
            <div class="leadership-pillar-card" style="--pillar-accent: ${accent};">
              <div class="pillar-topbar">
                <span class="pillar-num" style="color: ${accent};">${pillar.number}</span>
                ${pillar.metric ? `<span class="pillar-metric-tag" style="border-color: ${accent}40; color: ${accent}; background: ${accent}12;">${pillar.metric}</span>` : ''}
              </div>
              <h4 class="pillar-title">${pillar.title}</h4>
              <span class="pillar-tagline" style="color: ${accent};">${pillar.tagline}</span>
              <p class="pillar-desc">${pillar.description}</p>
            </div>
          `;
          }
        )
        .join('');
    }
  }

  private initInteractiveListeners(): void {
    // Laser scanline animation retrigger on hover
    const vault = document.getElementById('credential-vault-card');
    const scanline = document.getElementById('vault-scanline');
    if (vault && scanline) {
      vault.addEventListener('mouseenter', () => {
        scanline.classList.remove('scanning');
        void scanline.offsetWidth; // reflow
        scanline.classList.add('scanning');
      });
    }
  }
}
