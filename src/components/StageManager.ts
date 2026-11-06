export class StageManager {
  private currentStageIndex: number = 0;
  private stagePanels: HTMLElement[] = [];
  private navSteps: NodeListOf<HTMLElement>;
  private activeStageLabel: HTMLElement | null;

  constructor() {
    this.stagePanels = [
      document.getElementById('stage-1-panel')!,
      document.getElementById('stage-2-panel')!,
      document.getElementById('stage-3-panel')!,
      document.getElementById('stage-4-panel')!,
      document.getElementById('stage-5-panel')!,
      document.getElementById('stage-hero-panel')!
    ].filter(Boolean);

    this.navSteps = document.querySelectorAll('.stage-step');
    this.activeStageLabel = document.getElementById('scrub-active-stage');

    this.populateStageVisuals();
  }

  private populateStageVisuals(): void {
    // Stage 1: UX/UI Design Visuals (Flow & Systems)
    const s1Visual = document.getElementById('stage-1-visuals');
    if (s1Visual) {
      s1Visual.innerHTML = `
        <div class="ux-flow-network">
          <div class="ux-node"><span class="node-dot"></span><span>INTENT</span></div>
          <div class="ux-connector"></div>
          <div class="ux-node"><span class="node-dot"></span><span>SPATIAL</span></div>
          <div class="ux-connector"></div>
          <div class="ux-node central"><span class="node-dot"></span><span>DESIGN SYSTEM</span></div>
          <div class="ux-connector"></div>
          <div class="ux-node"><span class="node-dot"></span><span>INTERACT</span></div>
          <div class="ux-connector"></div>
          <div class="ux-node"><span class="node-dot"></span><span>ACTION</span></div>
        </div>
      `;
    }

    // Stage 2: Front-End Development (HTML5, Modern CSS & Component Architecture)
    const s2Visual = document.getElementById('stage-2-visuals');
    if (s2Visual) {
      s2Visual.innerHTML = `
        <div class="ui-components-preview">
          <div class="ui-card-mock">
            <div class="ui-card-header">
              <span class="ui-token-code">display: flex; gap: 12px;</span>
              <span class="ui-token-code">HTML5 / CSS3</span>
            </div>
            <div style="font-weight:600; font-size: 0.9rem; margin-bottom: 6px;">Semantic DOM & Component Architecture</div>
            <div style="font-size: 0.8rem; color: #94a3b8;">Zero-dependency, accessible responsive layouts translating Figma to production code.</div>
            <button class="ui-btn-sample" style="background: linear-gradient(135deg, #10b981, #059669);">&lt;Component /&gt;</button>
          </div>
          <div class="ui-card-mock">
            <div class="ui-card-header">
              <span class="ui-token-code">tokens.radius.lg // 16px</span>
              <span class="ui-token-code">60 FPS</span>
            </div>
            <div style="font-weight:600; font-size: 0.9rem; margin-bottom: 6px;">Living Token Pipeline</div>
            <div style="font-size: 0.8rem; color: #94a3b8;">Multi-tenant CSS custom properties syncing design with engineering.</div>
            <button class="ui-btn-sample">Inspect Tokens</button>
          </div>
        </div>
      `;
    }

    // Stage 3: Graphic Design (Grids & Baseline)
    const s3Visual = document.getElementById('stage-3-visuals');
    if (s3Visual) {
      s3Visual.innerHTML = `
        <div class="graphic-grid-system">
          <div class="graphic-module">
            <span class="crop-mark crop-tl"></span>
            <span class="crop-mark crop-tr"></span>
            <span class="crop-mark crop-bl"></span>
            <span class="crop-mark crop-br"></span>
            <span class="module-tag">GRID // 01</span>
            <div class="module-title">Golden Ratio (1:1.618)</div>
          </div>
          <div class="graphic-module">
            <span class="crop-mark crop-tl"></span>
            <span class="crop-mark crop-tr"></span>
            <span class="crop-mark crop-bl"></span>
            <span class="crop-mark crop-br"></span>
            <span class="module-tag">BASE // 08</span>
            <div class="module-title">8pt Typographic Baseline</div>
          </div>
          <div class="graphic-module">
            <span class="crop-mark crop-tl"></span>
            <span class="crop-mark crop-tr"></span>
            <span class="crop-mark crop-bl"></span>
            <span class="crop-mark crop-br"></span>
            <span class="module-tag">FORM // SYMMETRY</span>
            <div class="module-title">Geometric Hierarchy</div>
          </div>
          <div class="graphic-module">
            <span class="crop-mark crop-tl"></span>
            <span class="crop-mark crop-tr"></span>
            <span class="crop-mark crop-bl"></span>
            <span class="crop-mark crop-br"></span>
            <span class="module-tag">SCALE // KERN</span>
            <div class="module-title">Optical Tension</div>
          </div>
        </div>
      `;
    }

    // Stage 4: Motion Graphics Bézier Curve
    const s4Visual = document.getElementById('stage-4-visuals');
    if (s4Visual) {
      s4Visual.innerHTML = `
        <div class="motion-path-viz">
          <span class="bezier-badge">cubic-bezier(0.16, 1, 0.3, 1)</span>
          <div class="kinetic-trail">
            <span class="trail-dot"></span>
            <span class="trail-dot"></span>
            <span class="trail-dot"></span>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #cbd5e1;">60 FPS Physics Easing</span>
        </div>
      `;
    }

    // Stage 5: AI Convergence Visuals
    const s5Visual = document.getElementById('stage-5-visuals');
    if (s5Visual) {
      s5Visual.innerHTML = `
        <div class="ai-constellation">
          <div class="ai-pillar">UX/UI Systems</div>
          <span class="ai-synergy-icon">✦</span>
          <div class="ai-pillar">Front-End Code</div>
          <span class="ai-synergy-icon">✦</span>
          <div class="ai-pillar">Graphic Form</div>
          <span class="ai-synergy-icon">✦</span>
          <div class="ai-pillar">Kinetic Motion</div>
          <span class="ai-synergy-icon">=</span>
          <div class="ai-pillar" style="background: rgba(56, 189, 248, 0.15); border-color: #38bdf8; color: #38bdf8; font-weight:700;">
            Generative Design Intelligence
          </div>
        </div>
      `;
    }
  }

  public update(progress: number): void {
    let activeIndex = -1;
    let label = 'INITIALIZING ENVIRONMENT';

    if (progress >= 0.05 && progress < 0.22) {
      activeIndex = 0;
      label = 'STAGE 01: UX/UI DESIGN';
    } else if (progress >= 0.22 && progress < 0.42) {
      activeIndex = 1;
      label = 'STAGE 02: FRONT-END DEVELOPMENT';
    } else if (progress >= 0.42 && progress < 0.62) {
      activeIndex = 2;
      label = 'STAGE 03: GRAPHIC DESIGN';
    } else if (progress >= 0.62 && progress < 0.82) {
      activeIndex = 3;
      label = 'STAGE 04: MOTION DESIGN';
    } else if (progress >= 0.82 && progress < 0.94) {
      activeIndex = 4;
      label = 'STAGE 05: AI × CREATIVE TECH';
    } else if (progress >= 0.94) {
      activeIndex = 5;
      label = 'VINODH KUMAR — DESIGN INTELLIGENCE';
    }

    this.currentStageIndex = activeIndex;

    // Toggle panel visibility
    this.stagePanels.forEach((panel, idx) => {
      if (idx === activeIndex) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Update Header Pill
    const navIndex = activeIndex < 5 ? activeIndex : 4;
    this.navSteps.forEach((step, idx) => {
      if (idx === navIndex && activeIndex !== -1) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // Update Bottom Scrub Label
    if (this.activeStageLabel) {
      this.activeStageLabel.textContent = label;
    }
  }

  public getCurrentStageIndex(): number {
    return this.currentStageIndex;
  }
}
