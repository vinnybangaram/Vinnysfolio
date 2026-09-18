import { PROFILE_DATA } from '../data/profileData';
import { BRAND_ICONS, getToolIcon, getCategoryIcon } from '../utils/icons';

export class ProfileController {
  private activeSkillCategory: string = 'ALL';
  private activeArticleCategory: string = 'ALL';

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
        if (d.id === 'graphic-design') {
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
        } else if (d.id === 'ux-design') {
          sandboxMarkup = `
            <div class="discipline-sandbox ux-sandbox">
              <div class="sandbox-header">
                <span class="sandbox-tag">INTERACTIVE FLOW TELEMETRY</span>
                <span class="sandbox-status">● LIVE PIPELINE</span>
              </div>
              <div class="journey-flow-nodes">
                <button type="button" class="journey-flow-node active" data-node="intent">01 Intent</button>
                <span class="flow-arrow">→</span>
                <button type="button" class="journey-flow-node" data-node="spatial">02 Spatial</button>
                <span class="flow-arrow">→</span>
                <button type="button" class="journey-flow-node" data-node="cognition">03 Cognition</button>
                <span class="flow-arrow">→</span>
                <button type="button" class="journey-flow-node" data-node="decision">04 Action</button>
              </div>
              <div class="journey-readout-box">
                <h5 id="journey-readout-title">01 // INTENT DETECTION & CONTEXT</h5>
                <p id="journey-readout-desc">Capturing real-time operator queries, telemetry triggers, or map interactions without cognitive friction.</p>
                <span class="journey-metric" id="journey-readout-metric">LATENCY: &lt;8ms · RECOG: 99.4%</span>
              </div>
            </div>
          `;
        } else if (d.id === 'ui-design') {
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
                  <code>--glass-blur: 20px; --radius: 16px;</code>
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

    // Filters
    if (filtersContainer) {
      filtersContainer.innerHTML = `
        <button class="skill-filter-btn ${this.activeSkillCategory === 'ALL' ? 'active' : ''}" data-category="ALL">
          <span>All Categories</span>
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

    const filtered =
      this.activeSkillCategory === 'ALL'
        ? PROFILE_DATA.skills
        : PROFILE_DATA.skills.filter((s) => s.category === this.activeSkillCategory);

    gridContainer.innerHTML = filtered
      .map(
        (cat) => `
        <div class="skill-category-group">
          <div class="category-header">
            <span class="cat-icon">${getCategoryIcon(cat.category)}</span>
            <h4 class="cat-title">${cat.category}</h4>
            <span class="cat-count-badge">${cat.skills.length} competencies</span>
          </div>

          <div class="skills-pill-cloud">
            ${cat.skills
              .map(
                (skill) => `
              <div class="skill-matrix-pill">
                <span class="skill-dot"></span>
                <span class="skill-text">${skill}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `
      )
      .join('');
  }

  // 3. TOOLS ECOSYSTEM
  private renderToolsEcosystem(): void {
    const container = document.getElementById('tools-ecosystem-grid');
    if (!container) return;

    const cardsMarkup = PROFILE_DATA.tools
      .map(
        (group) => `
        <div class="tool-cluster-card">
          <div class="cluster-header">
            <div class="cluster-meta">
              <span class="cluster-badge">${group.badge}</span>
              <h4 class="cluster-title">${group.category}</h4>
            </div>
          </div>
          <p class="cluster-desc">${group.description}</p>

          <div class="tools-pills-list">
            ${group.tools
              .map(
                (tool) => `
              <div class="tool-pill-item ${tool.highlighted ? 'highlighted' : ''}" role="button" tabindex="0" title="Click to add to pipeline synthesizer">
                <div class="tool-name-line">
                  <span class="tool-brand-icon">${getToolIcon(tool.name)}</span>
                  <span class="tool-name">${tool.name}</span>
                </div>
                <span class="tool-tag-label">${tool.tag}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `
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
        <article class="article-thought-card">
          <div class="article-top-meta">
            <span class="article-num">0${idx + 1} // ESSAY</span>
            <div class="meta-right-tags">
              <span class="article-date-pill">${art.date}</span>
              <span class="article-read-time">${art.readTime}</span>
            </div>
          </div>
          
          <span class="article-category-badge">${art.category}</span>
          <h3 class="article-title">${art.title}</h3>
          <p class="article-summary">${art.summary}</p>
          
          <div class="article-heuristic-callout">
            <span class="heuristic-icon">✦</span>
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

    if (pillarsContainer) {
      pillarsContainer.innerHTML = PROFILE_DATA.leadership.pillars
        .map(
          (pillar) => `
          <div class="leadership-pillar-card">
            <div class="pillar-topbar">
              <span class="pillar-num">${pillar.number}</span>
              ${pillar.metric ? `<span class="pillar-metric-tag">${pillar.metric}</span>` : ''}
            </div>
            <h4 class="pillar-title">${pillar.title}</h4>
            <span class="pillar-tagline">${pillar.tagline}</span>
            <p class="pillar-desc">${pillar.description}</p>
          </div>
        `
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
