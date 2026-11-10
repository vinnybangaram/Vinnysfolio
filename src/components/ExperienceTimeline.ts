import { PROFILE_DATA, ExperienceMilestone } from '../data/profileData';
import { getMilestoneIcon, getToolIcon } from '../utils/icons';

const ERA_COLORS: Record<string, string> = {
  'ispatial-team-lead': '#38bdf8', // Electric Cyan
  'ispatial-lead-designer': '#0284c7', // Ocean Blue
  'people-tech-group': '#34d399', // Mint Emerald
  'nextrow-digital': '#fb923c', // Warm Coral
  'aparaa-solutions': '#c084fc', // Kinetic Violet
  'lakshmi-info-solutions': '#f43f5e', // Rose Fuchsia
  'cipra-systems': '#fbbf24', // Radiant Amber
  'scorelogix': '#818cf8', // Indigo Slate
  'hamstech-institute': '#ec4899' // Electric Pink
};

const ERA_YEARS: Record<string, string> = {
  'ispatial-team-lead': '2022',
  'ispatial-lead-designer': '2019',
  'people-tech-group': '2018',
  'nextrow-digital': '2017',
  'aparaa-solutions': '2015',
  'lakshmi-info-solutions': '2014',
  'cipra-systems': '2011',
  'scorelogix': '2007',
  'hamstech-institute': '2004'
};

const ERA_DURATIONS: Record<string, string> = {
  'ispatial-team-lead': '3+ Yrs Active',
  'ispatial-lead-designer': '3 Yrs 2 Mos',
  'people-tech-group': '9 Mos',
  'nextrow-digital': '1 Yr 4 Mos',
  'aparaa-solutions': '2 Yrs 3 Mos',
  'lakshmi-info-solutions': '4 Mos',
  'cipra-systems': '3 Yrs 4 Mos',
  'scorelogix': '3 Yrs 10 Mos',
  'hamstech-institute': '2 Yrs 11 Mos'
};

const MILESTONE_CATEGORIES: Record<string, string[]> = {
  'ispatial-team-lead': ['leadership', 'gis-enterprise'],
  'ispatial-lead-designer': ['leadership', 'gis-enterprise'],
  'people-tech-group': ['gis-enterprise'],
  'nextrow-digital': ['gis-enterprise'],
  'aparaa-solutions': ['gis-enterprise'],
  'lakshmi-info-solutions': ['design-systems'],
  'cipra-systems': ['leadership', 'design-systems'],
  'scorelogix': ['design-systems'],
  'hamstech-institute': ['design-systems']
};

export class ExperienceTimeline {
  private container: HTMLElement | null;
  private currentFilter: string = 'all';
  private allExpanded: boolean = false;
  private observer: IntersectionObserver | null = null;

  constructor() {
    this.container = document.getElementById('experience-timeline-container');
    this.init();
  }

  private init(): void {
    if (!this.container) return;
    this.render();
    this.bindEvents();
    this.initScrollReveal();
  }

  public render(): void {
    if (!this.container) return;

    const milestones = PROFILE_DATA.experience;

    this.container.innerHTML = `
      <!-- 1. Executive Telemetry Bar -->
      <div class="timeline-telemetry-hud">
        <div class="hud-stat-cell">
          <span class="stat-num">18+</span>
          <div class="stat-info">
            <span class="stat-label">YEARS PRACTICE</span>
            <span class="stat-sub">Continuous Design Craft</span>
          </div>
        </div>
        <div class="hud-stat-cell">
          <span class="stat-num">9</span>
          <div class="stat-info">
            <span class="stat-label">STRATEGIC ERAS</span>
            <span class="stat-sub">Foundations to Leadership</span>
          </div>
        </div>
        <div class="hud-stat-cell">
          <span class="stat-num">8+</span>
          <div class="stat-info">
            <span class="stat-label">TEAM LEADERSHIP</span>
            <span class="stat-sub">UX & Motion Designers Directed</span>
          </div>
        </div>
        <div class="hud-stat-cell">
          <span class="stat-num">40+</span>
          <div class="stat-info">
            <span class="stat-label">GLOBAL SYSTEMS</span>
            <span class="stat-sub">Mission-Critical GIS & AI</span>
          </div>
        </div>
      </div>

      <!-- 2. Controls & Filter Bar -->
      <div class="timeline-control-panel">
        <div class="timeline-filter-group" role="tablist" aria-label="Career Trajectory Filters">
          <button type="button" class="timeline-filter-tab ${this.currentFilter === 'all' ? 'active' : ''}" data-filter="all">
            <span>All Tenures (9)</span>
          </button>
          <button type="button" class="timeline-filter-tab ${this.currentFilter === 'leadership' ? 'active' : ''}" data-filter="leadership">
            <span>★ Leadership & Team Lead</span>
          </button>
          <button type="button" class="timeline-filter-tab ${this.currentFilter === 'gis-enterprise' ? 'active' : ''}" data-filter="gis-enterprise">
            <span>🗺️ GIS & Enterprise UX</span>
          </button>
          <button type="button" class="timeline-filter-tab ${this.currentFilter === 'design-systems' ? 'active' : ''}" data-filter="design-systems">
            <span>✦ Design Systems & Code</span>
          </button>
        </div>

        <button type="button" id="timeline-toggle-all-btn" class="timeline-global-toggle-btn" aria-label="Toggle All Experience Details">
          <span id="global-toggle-text">${this.allExpanded ? 'Collapse to Executive View' : 'Expand All Details'}</span>
          <span class="global-toggle-icon">${this.allExpanded ? '↑' : '↓'}</span>
        </button>
      </div>

      <!-- 3. Interactive Trajectory Horizon (Warp Track) -->
      <nav class="timeline-horizon-navigator" aria-label="Career Milestones Horizon">
        <div class="horizon-track-line"></div>
        <div class="horizon-nodes-row">
          ${milestones
            .map((m, idx) => {
              const color = ERA_COLORS[m.id] || '#38bdf8';
              const year = ERA_YEARS[m.id] || '2020';
              const isCurrent = m.isCurrent;
              return `
              <button type="button" class="horizon-warp-node ${idx === 0 ? 'active' : ''}" style="--era-color: ${color};" data-target-node="timeline-node-${m.id}" aria-label="Jump to ${m.role} at ${m.companyShort} (${year})">
                <span class="horizon-beacon ${isCurrent ? 'live' : ''}"></span>
                <span class="horizon-year">${year}</span>
                <span class="horizon-company">${m.companyShort}</span>
              </button>
            `;
            })
            .join('')}
        </div>
      </nav>

      <!-- 4. Central Spatial Alternating Spine -->
      <div class="timeline-spatial-wrapper">
        <div class="timeline-track-rail">
          <div class="timeline-rail-line" id="timeline-rail-line"></div>
        </div>

        <div class="timeline-nodes-list" id="timeline-nodes-list">
          ${milestones
            .map((m, idx) => {
              const isCurrent = m.isCurrent;
              const color = ERA_COLORS[m.id] || '#38bdf8';
              const year = ERA_YEARS[m.id] || '2020';
              const duration = ERA_DURATIONS[m.id] || '';
              const sideClass = idx % 2 === 0 ? 'node-left' : 'node-right';
              const categories = (MILESTONE_CATEGORIES[m.id] || []).join(' ');
              const isInitiallyExpanded = isCurrent || this.allExpanded;

              return `
              <article class="timeline-node-item ${sideClass} ${isCurrent ? 'current-role-spotlight' : ''} ${isInitiallyExpanded ? 'is-expanded' : ''}" style="--era-color: ${color};" data-index="${idx}" data-categories="${categories}" id="timeline-node-${m.id}">
                <!-- Central Spine Marker Node Hub -->
                <div class="node-spine-hub" aria-hidden="true">
                  <div class="hub-pulse-ring ${isCurrent ? 'active' : ''}"></div>
                  <div class="hub-core-disc">
                    <span class="hub-year-stamp">'${year.slice(2)}</span>
                  </div>
                </div>

                <!-- High-End Glassmorphic Card -->
                <div class="timeline-card-content">
                  <!-- Large Year Watermark -->
                  <span class="timeline-card-year-watermark" aria-hidden="true">${year}</span>

                  <!-- Header Area -->
                  <header class="timeline-card-header">
                    <div class="card-meta-row">
                      <span class="timeline-icon-badge" style="color: ${color}; border-color: ${color}40; background: ${color}15;">
                        ${getMilestoneIcon(m.id)}
                      </span>
                      <span class="timeline-period-badge" style="color: ${color}; border-color: ${color}40; background: ${color}12;">
                        <span class="cal-glyph">📅</span> ${m.period}
                      </span>
                      ${duration ? `<span class="timeline-duration-badge">${duration}</span>` : ''}
                      ${isCurrent ? '<span class="status-live-badge"><span class="live-dot"></span> CURRENT LEADERSHIP</span>' : ''}
                    </div>

                    <h3 class="timeline-role-title">${m.role}</h3>

                    <div class="timeline-company-row">
                      <span class="company-title">${m.company}</span>
                      ${m.location ? `<span class="timeline-location-pill">📍 ${m.location}</span>` : ''}
                      ${m.teamScope ? `<span class="team-scope-pill">✦ ${m.teamScope}</span>` : ''}
                    </div>

                    ${m.promotionNote ? `
                      <div class="promotion-note-badge" style="border-color: ${color}40; color: ${color}; background: ${color}10;">
                        <span class="promo-icon">⚡</span>
                        <span>${m.promotionNote}</span>
                      </div>
                    ` : ''}
                  </header>

                  <!-- Editorial Summary -->
                  <p class="timeline-summary-text">${m.summary}</p>

                  <!-- Guiding Creative Principle (Motto) -->
                  ${m.motto ? `
                    <blockquote class="timeline-motto-callout" style="border-left-color: ${color};">
                      <span class="motto-lead" style="color: ${color};">CREATIVE PRINCIPLE:</span>
                      <p class="motto-text">“${m.motto}”</p>
                    </blockquote>
                  ` : ''}

                  <!-- Key Achievements Grid (High-Impact Highlights) -->
                  ${m.achievements && m.achievements.length > 0 ? `
                    <div class="timeline-achievements-box" style="border-color: ${color}30;">
                      <span class="achievements-label" style="color: ${color};">★ IMPACT & MEASURED OUTCOMES:</span>
                      <div class="achievements-grid">
                        ${m.achievements.map((ach) => `
                          <div class="achievement-pill">
                            <span class="ach-check" style="color: ${color};">✓</span>
                            <span class="ach-text">${ach}</span>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  ` : ''}

                  <!-- Progressive Disclosure Drawer (Detailed Scope & Tech) -->
                  <div class="timeline-details-drawer" id="details-${m.id}">
                    ${m.responsibilities && m.responsibilities.length > 0 ? `
                      <div class="timeline-responsibilities-list">
                        <span class="responsibilities-title">CORE RESPONSIBILITIES & ARCHITECTURE:</span>
                        ${m.responsibilities.map((resp) => `
                          <div class="responsibility-bullet">
                            <span class="bullet-caret" style="color: ${color};">▹</span>
                            <span>${resp}</span>
                          </div>
                        `).join('')}
                      </div>
                    ` : ''}

                    <div class="timeline-tags-footer">
                      <div class="timeline-disciplines-tags">
                        ${m.disciplines.map((d) => `
                          <span class="disc-tag" style="border-color: ${color}35; color: ${color}; background: ${color}10;">${d}</span>
                        `).join('')}
                      </div>
                      <div class="timeline-tech-tags">
                        ${m.technologies.map((t) => `
                          <span class="tech-tag"><span class="tag-icon-sm">${getToolIcon(t)}</span> ${t}</span>
                        `).join('')}
                      </div>
                    </div>
                  </div>

                  <!-- Expand / Collapse Toggle Button -->
                  <button type="button" class="timeline-expand-toggle-btn" data-target="details-${m.id}" aria-expanded="${isInitiallyExpanded ? 'true' : 'false'}">
                    <span class="expand-btn-text">${isInitiallyExpanded ? 'Hide Detailed Architecture' : 'View Full Architecture & Scope'}</span>
                    <span class="expand-chevron">${isInitiallyExpanded ? '▲' : '▼'}</span>
                  </button>
                </div>
              </article>
            `;
            })
            .join('')}
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    if (!this.container) return;

    // 1. Horizon Navigation Buttons
    const horizonButtons = this.container.querySelectorAll<HTMLButtonElement>('.horizon-warp-node');
    horizonButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target-node');
        if (!targetId) return;

        const targetNode = document.getElementById(targetId);
        if (targetNode) {
          // If node was hidden by filter, reset to all
          if (targetNode.style.display === 'none') {
            this.setFilter('all');
          }

          targetNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetNode.classList.add('node-highlight-flash');
          setTimeout(() => targetNode.classList.remove('node-highlight-flash'), 1800);

          horizonButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });

    // 2. Filter Tabs
    const filterTabs = this.container.querySelectorAll<HTMLButtonElement>('.timeline-filter-tab');
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter') || 'all';
        this.setFilter(filter);
      });
    });

    // 3. Card Expand / Collapse Toggle Buttons
    const expandButtons = this.container.querySelectorAll<HTMLButtonElement>('.timeline-expand-toggle-btn');
    expandButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cardItem = btn.closest('.timeline-node-item');
        if (!cardItem) return;

        const isCurrentlyExpanded = cardItem.classList.contains('is-expanded');
        if (isCurrentlyExpanded) {
          cardItem.classList.remove('is-expanded');
          btn.setAttribute('aria-expanded', 'false');
          const textEl = btn.querySelector('.expand-btn-text');
          const chevronEl = btn.querySelector('.expand-chevron');
          if (textEl) textEl.textContent = 'View Full Architecture & Scope';
          if (chevronEl) chevronEl.textContent = '▼';
        } else {
          cardItem.classList.add('is-expanded');
          btn.setAttribute('aria-expanded', 'true');
          const textEl = btn.querySelector('.expand-btn-text');
          const chevronEl = btn.querySelector('.expand-chevron');
          if (textEl) textEl.textContent = 'Hide Detailed Architecture';
          if (chevronEl) chevronEl.textContent = '▲';
        }
      });
    });

    // 4. Global Toggle (Expand All / Collapse All)
    const globalToggleBtn = document.getElementById('timeline-toggle-all-btn');
    globalToggleBtn?.addEventListener('click', () => {
      this.allExpanded = !this.allExpanded;
      const cardItems = this.container?.querySelectorAll('.timeline-node-item');
      cardItems?.forEach((item) => {
        const btn = item.querySelector('.timeline-expand-toggle-btn');
        const textEl = btn?.querySelector('.expand-btn-text');
        const chevronEl = btn?.querySelector('.expand-chevron');

        if (this.allExpanded) {
          item.classList.add('is-expanded');
          btn?.setAttribute('aria-expanded', 'true');
          if (textEl) textEl.textContent = 'Hide Detailed Architecture';
          if (chevronEl) chevronEl.textContent = '▲';
        } else {
          item.classList.remove('is-expanded');
          btn?.setAttribute('aria-expanded', 'false');
          if (textEl) textEl.textContent = 'View Full Architecture & Scope';
          if (chevronEl) chevronEl.textContent = '▼';
        }
      });

      const globalText = document.getElementById('global-toggle-text');
      const globalIcon = globalToggleBtn.querySelector('.global-toggle-icon');
      if (globalText) {
        globalText.textContent = this.allExpanded ? 'Collapse to Executive View' : 'Expand All Details';
      }
      if (globalIcon) {
        globalIcon.textContent = this.allExpanded ? '↑' : '↓';
      }
    });
  }

  private setFilter(filter: string): void {
    this.currentFilter = filter;
    const filterTabs = this.container?.querySelectorAll<HTMLButtonElement>('.timeline-filter-tab');
    filterTabs?.forEach((tab) => {
      if (tab.getAttribute('data-filter') === filter) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    const cardItems = this.container?.querySelectorAll<HTMLElement>('.timeline-node-item');
    cardItems?.forEach((item) => {
      if (filter === 'all') {
        item.style.display = 'block';
        item.classList.add('visible');
      } else {
        const cats = item.getAttribute('data-categories') || '';
        if (cats.includes(filter)) {
          item.style.display = 'block';
          item.classList.add('visible');
        } else {
          item.style.display = 'none';
        }
      }
    });

    // Re-adjust alternating left/right layout for visible items
    let visibleIndex = 0;
    cardItems?.forEach((item) => {
      if (item.style.display !== 'none') {
        item.classList.remove('node-left', 'node-right');
        item.classList.add(visibleIndex % 2 === 0 ? 'node-left' : 'node-right');
        visibleIndex++;
      }
    });
  }

  private initScrollReveal(): void {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.timeline-node-item').forEach((el) => el.classList.add('visible'));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Update progressive height of the central glowing line
            const line = document.getElementById('timeline-rail-line');
            if (line) {
              const visibleCount = document.querySelectorAll('.timeline-node-item.visible').length;
              const totalCount = document.querySelectorAll('.timeline-node-item').length;
              const percent = Math.min(100, Math.round((visibleCount / totalCount) * 100));
              line.style.height = `${percent}%`;
            }

            // Sync active horizon warp node
            const nodeId = entry.target.id;
            const activeBtn = this.container?.querySelector(`.horizon-warp-node[data-target-node="${nodeId}"]`);
            if (activeBtn) {
              this.container?.querySelectorAll('.horizon-warp-node').forEach((b) => b.classList.remove('active'));
              activeBtn.classList.add('active');
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    document.querySelectorAll('.timeline-node-item').forEach((node) => {
      this.observer?.observe(node);
    });
  }
}
