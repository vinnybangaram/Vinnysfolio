import { PROFILE_DATA, Project } from '../data/profileData';

export class PortfolioSection {
  private grid: HTMLElement;
  private filterButtons: NodeListOf<HTMLButtonElement>;
  private modal: HTMLElement | null;
  private modalContent: HTMLElement | null;
  private modalBackdrop: HTMLElement | null;
  private modalCloseBtn: HTMLElement | null;
  private currentFilter: string = 'all';

  constructor() {
    this.grid = document.getElementById('projects-grid')!;
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.modal = document.getElementById('project-modal');
    this.modalContent = document.getElementById('modal-content');
    this.modalBackdrop = document.getElementById('modal-backdrop');
    this.modalCloseBtn = document.getElementById('modal-close-btn');

    this.initFilters();
    this.initModalListeners();
    this.renderProjects(this.currentFilter);
  }

  private initFilters(): void {
    this.filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-filter') || 'all';
        this.renderProjects(this.currentFilter);
      });
    });
  }

  private initModalListeners(): void {
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }
    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', () => this.closeModal());
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  public renderProjects(category: string): void {
    const filtered =
      category === 'all'
        ? PROFILE_DATA.projects
        : PROFILE_DATA.projects.filter((p) => p.category === category);

    this.grid.innerHTML = filtered
      .map(
        (project) => `
        <article class="project-card" data-id="${project.id}">
          <div class="project-thumb-wrap" style="background: radial-gradient(circle at 70% 30%, ${project.accentColor}25 0%, #0d1218 80%);">
            ${project.image ? `
              <img src="${project.image}" alt="${project.title}" class="project-thumb-img" loading="lazy" />
              <div class="project-thumb-scrim"></div>
            ` : `
              <div class="project-thumb-scrim" style="opacity: 0.3;"></div>
            `}
            <div class="project-card-badges-top">
              <span class="project-category-badge">${project.categoryLabel}</span>
              ${project.client ? `<span class="project-client-badge" title="${project.client}">${project.client}</span>` : ''}
            </div>
            <div class="project-metrics-overlay">
              <div style="font-family: var(--font-mono); font-size: 0.65rem; color: ${project.accentColor}; margin-bottom: 4px; letter-spacing: 0.08em;">SYSTEM METRICS</div>
              <div style="display: flex; gap: 14px;">
                ${project.metrics
                  .map(
                    (m) => `
                  <div>
                    <div style="font-size: 1.05rem; font-weight: 700; color: #fff; line-height: 1.1;">${m.value}</div>
                    <div style="font-family: var(--font-mono); font-size: 0.625rem; color: #94a3b8; text-transform: uppercase;">${m.label}</div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          </div>
          <div class="project-card-body">
            <h3 class="project-card-title">${project.title}</h3>
            <p class="project-card-desc">${project.summary}</p>
            <div class="project-tech-pills">
              ${project.tags.map((t) => `<span class="tech-pill">${t}</span>`).join('')}
            </div>
            <div class="project-card-footer">
              <span class="project-explore-cta">
                <span>Explore Case Study</span>
                <span style="font-size: 1.1rem;">→</span>
              </span>
              ${project.behanceUrl ? `
                <a href="${project.behanceUrl}" target="_blank" rel="noopener noreferrer" class="project-behance-link" onclick="event.stopPropagation();" title="View project on Behance">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.137 0-6.625-2.857-6.625-6.875 0-4.085 2.664-6.875 6.643-6.875 3.901 0 6.275 2.627 6.275 6.625v1.25h-9.918c.085 2.227 1.637 3.875 4.125 3.875 1.761 0 3.033-.922 3.6-2h2zM9.5 13c0-1.854-.85-2.8-2.3-2.8H4v5.6h3.2c1.45 0 2.3-.946 2.3-2.8zm-2.5-4.8c1.2 0 1.9-.7 1.9-2 0-1.2-.7-1.9-1.9-1.9H4v3.9h3zm8.3 1.8h5.9c-.1-1.6-1.1-2.9-2.9-2.9-1.8 0-2.8 1.3-3 2.9zm-7.8 7.3H0V3.7h7.2c2.8 0 4.6 1.4 4.6 3.6 0 1.4-.7 2.5-1.9 3.1 1.6.6 2.6 1.9 2.6 3.7 0 2.4-2.1 3.2-5 3.2z"/></svg>
                  <span>Behance ↗</span>
                </a>
              ` : ''}
            </div>
          </div>
        </article>
      `
      )
      .join('');

    // Attach card click handlers
    this.grid.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        if (id) this.openProjectModal(id);
      });
    });
  }

  public openProjectModal(projectId: string): void {
    const project = PROFILE_DATA.projects.find((p) => p.id === projectId);
    if (!project || !this.modal || !this.modalContent) return;

    this.modalContent.innerHTML = `
      ${project.image ? `
        <div class="modal-banner-wrap">
          <img src="${project.image}" alt="${project.title}" class="modal-banner-img" />
          <div class="modal-banner-scrim"></div>
          <div class="modal-banner-badge-row">
            <span class="project-category-badge">${project.categoryLabel.toUpperCase()} // CASE STUDY</span>
            ${project.client ? `<span class="project-client-badge">${project.client}</span>` : ''}
          </div>
        </div>
      ` : ''}

      <div class="modal-header-hero ${project.image ? 'with-banner' : ''}">
        ${!project.image ? `<div class="modal-category">${project.categoryLabel.toUpperCase()} // CASE STUDY</div>` : ''}
        <h2 class="modal-title">${project.title}</h2>
        <p class="modal-overview">${project.subtitle} — ${project.summary}</p>
        ${project.behanceUrl ? `
          <div style="margin-top: var(--space-4);">
            <a href="${project.behanceUrl}" target="_blank" rel="noopener noreferrer" class="modal-behance-cta">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.137 0-6.625-2.857-6.625-6.875 0-4.085 2.664-6.875 6.643-6.875 3.901 0 6.275 2.627 6.275 6.625v1.25h-9.918c.085 2.227 1.637 3.875 4.125 3.875 1.761 0 3.033-.922 3.6-2h2zM9.5 13c0-1.854-.85-2.8-2.3-2.8H4v5.6h3.2c1.45 0 2.3-.946 2.3-2.8zm-2.5-4.8c1.2 0 1.9-.7 1.9-2 0-1.2-.7-1.9-1.9-1.9H4v3.9h3zm8.3 1.8h5.9c-.1-1.6-1.1-2.9-2.9-2.9-1.8 0-2.8 1.3-3 2.9zm-7.8 7.3H0V3.7h7.2c2.8 0 4.6 1.4 4.6 3.6 0 1.4-.7 2.5-1.9 3.1 1.6.6 2.6 1.9 2.6 3.7 0 2.4-2.1 3.2-5 3.2z"/></svg>
              <span>Explore High-Resolution Gallery on Behance ↗</span>
            </a>
          </div>
        ` : ''}
      </div>

      <div class="modal-grid-details">
        <div class="modal-main-column">
          <div style="margin-bottom: var(--space-6);">
            <h4 class="modal-section-title">THE PROBLEM & CONTEXT</h4>
            <p class="modal-body-p">${project.problem}</p>
          </div>

          <div style="margin-bottom: var(--space-6);">
            <h4 class="modal-section-title">UX THINKING & INFORMATION ARCHITECTURE</h4>
            <p class="modal-body-p">${project.uxThinking}</p>
          </div>

          <div style="margin-bottom: var(--space-6);">
            <h4 class="modal-section-title">DESIGN, MOTION & COMPONENT ENGINEERING</h4>
            <p class="modal-body-p">${project.designMotion}</p>
          </div>

          <div>
            <h4 class="modal-section-title">SYSTEM IMPACT & OUTCOMES</h4>
            <p class="modal-body-p">${project.outcome}</p>
          </div>
        </div>

        <aside class="modal-sidebar-column">
          <div class="modal-sidebar-meta">
            ${project.client ? `
              <div>
                <span class="meta-group-label">CLIENT / ORGANIZATION</span>
                <div class="meta-group-val" style="color: var(--hud-cyan);">${project.client}</div>
              </div>
            ` : ''}
            <div>
              <span class="meta-group-label">MY ROLE</span>
              <div class="meta-group-val">${project.role}</div>
            </div>
            <div>
              <span class="meta-group-label">TIMELINE</span>
              <div class="meta-group-val">${project.timeline}</div>
            </div>
            <div>
              <span class="meta-group-label">CORE TECHNOLOGIES</span>
              <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px;">
                ${project.tags.map((t) => `<span class="tech-pill">${t}</span>`).join('')}
              </div>
            </div>
            <div>
              <span class="meta-group-label">KEY MEASUREMENTS</span>
              <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 8px;">
                ${project.metrics
                  .map(
                    (m) => `
                  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 4px;">
                    <span style="font-size: 0.8rem; color: #94a3b8;">${m.label}</span>
                    <span style="font-family: var(--font-mono); font-size: 0.85rem; color: ${project.accentColor}; font-weight:700;">${m.value}</span>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          </div>
        </aside>
      </div>
    `;

    this.modal.classList.add('open');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  public closeModal(): void {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
}
