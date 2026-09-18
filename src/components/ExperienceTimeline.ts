import { PROFILE_DATA, ExperienceMilestone } from '../data/profileData';
import { getMilestoneIcon, getToolIcon } from '../utils/icons';

export class ExperienceTimeline {
  private container: HTMLElement | null;
  private observer: IntersectionObserver | null = null;

  constructor() {
    this.container = document.getElementById('experience-timeline-container');
    this.init();
  }

  private init(): void {
    if (!this.container) return;
    this.render();
    this.bindEraButtons();
    this.initScrollReveal();
  }

  public render(): void {
    if (!this.container) return;

    const milestones = PROFILE_DATA.experience;

    this.container.innerHTML = `
      <!-- Timeline Flight Controller Bar (All 8 Authentic Eras) -->
      <div class="timeline-flight-deck">
        <div class="deck-meta">
          <span class="deck-tag">TIMELINE FLIGHT CONTROLLER // 18+ YEAR CAREER WARP</span>
          <span class="deck-hint">CLICK AN ERA TO WARP TO CAREER MILESTONE (2004 — PRESENT)</span>
        </div>
        <div class="deck-eras-bar">
          ${milestones
            .map(
              (m, idx) => `
            <button type="button" class="timeline-era-btn ${idx === 0 ? 'active' : ''}" data-target-node="timeline-node-${m.id}" aria-label="Warp to ${m.role} at ${m.companyShort}">
              <span class="era-year">${m.period.split('–')[0].trim()}</span>
              <span class="era-company">${m.companyShort}</span>
            </button>
          `
            )
            .join('')}
        </div>
      </div>

      <div class="timeline-track-rail">
        <div class="timeline-rail-line" id="timeline-rail-line"></div>
      </div>

      <div class="timeline-nodes-list">
        ${milestones
          .map((m, idx) => {
            const isCurrent = m.isCurrent;
            return `
            <div class="timeline-node-item ${isCurrent ? 'current-role-spotlight' : ''}" data-index="${idx}" id="timeline-node-${m.id}">
              <div class="node-marker-wrap">
                <div class="node-ping-ring ${isCurrent ? 'active' : ''}"></div>
                <div class="node-dot ${isCurrent ? 'current' : ''}"></div>
              </div>

              <div class="timeline-card-content">
                <div class="timeline-card-header">
                  <div class="company-badge-wrap">
                    <span class="timeline-icon-badge">${getMilestoneIcon(m.id)}</span>
                    <span class="timeline-period-badge">${m.period}</span>
                    ${isCurrent ? '<span class="status-live-badge"><span class="live-dot"></span> CURRENT LEADERSHIP</span>' : ''}
                    ${m.location ? `<span class="timeline-location-pill">${m.location}</span>` : ''}
                    ${m.employmentType ? `<span class="timeline-emp-type-pill">${m.employmentType}</span>` : ''}
                  </div>

                  <h3 class="timeline-role-title">${m.role}</h3>
                  <div class="timeline-company-name">
                    <span class="company-title">${m.company}</span>
                    ${m.teamScope ? `<span class="team-scope-pill">✦ ${m.teamScope}</span>` : ''}
                  </div>

                  ${m.promotionNote ? `
                    <div class="promotion-note-badge">
                      <span class="promo-icon">⚡</span>
                      <span>${m.promotionNote}</span>
                    </div>
                  ` : ''}
                </div>

                <p class="timeline-summary-text">${m.summary}</p>

                ${m.motto ? `
                  <div class="timeline-motto-callout">
                    <span class="motto-lead">GUIDING CREATIVE PRINCIPLE:</span>
                    <p class="motto-text">“${m.motto}”</p>
                  </div>
                ` : ''}

                ${m.achievements && m.achievements.length > 0 ? `
                  <div class="timeline-achievements-box">
                    <span class="achievements-label">★ VERIFIED IMPACT & ACHIEVEMENTS:</span>
                    <div class="achievements-grid">
                      ${m.achievements.map((ach) => `
                        <div class="achievement-pill">
                          <span class="ach-check">✓</span>
                          <span class="ach-text">${ach}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                ${m.responsibilities && m.responsibilities.length > 0 ? `
                  <div class="timeline-responsibilities-list">
                    <span class="responsibilities-title">CORE RESPONSIBILITIES & FOCUS:</span>
                    ${m.responsibilities
                      .map(
                        (resp) => `
                      <div class="responsibility-bullet">
                        <span class="bullet-caret">▹</span>
                        <span>${resp}</span>
                      </div>
                    `
                      )
                      .join('')}
                  </div>
                ` : ''}

                <div class="timeline-tags-footer">
                  <div class="timeline-disciplines-tags">
                    ${m.disciplines.map((d) => `<span class="disc-tag">${d}</span>`).join('')}
                  </div>
                  <div class="timeline-tech-tags">
                    ${m.technologies.map((t) => `<span class="tech-tag"><span class="tag-icon-sm">${getToolIcon(t)}</span> ${t}</span>`).join('')}
                  </div>
                </div>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>
    `;
  }

  private bindEraButtons(): void {
    if (!this.container) return;
    const buttons = this.container.querySelectorAll<HTMLButtonElement>('.timeline-era-btn');

    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target-node');
        if (!targetId) return;

        const targetNode = document.getElementById(targetId);
        if (targetNode) {
          targetNode.scrollIntoView({ behavior: 'smooth', block: 'center' });

          // Flash highlight
          targetNode.classList.add('node-highlight-flash');
          setTimeout(() => targetNode.classList.remove('node-highlight-flash'), 1800);

          buttons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
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
            const line = document.getElementById('timeline-rail-line');
            if (line) {
              const visibleCount = document.querySelectorAll('.timeline-node-item.visible').length;
              const totalCount = document.querySelectorAll('.timeline-node-item').length;
              const percent = Math.min(100, Math.round((visibleCount / totalCount) * 100));
              line.style.height = `${percent}%`;
            }

            // Sync active era button with visible node
            const nodeId = entry.target.id;
            const activeBtn = this.container?.querySelector(`.timeline-era-btn[data-target-node="${nodeId}"]`);
            if (activeBtn) {
              this.container?.querySelectorAll('.timeline-era-btn').forEach((b) => b.classList.remove('active'));
              activeBtn.classList.add('active');
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    document.querySelectorAll('.timeline-node-item').forEach((node) => {
      this.observer?.observe(node);
    });
  }
}
