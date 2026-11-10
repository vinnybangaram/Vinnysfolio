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
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: var(--space-4);">
            ${project.behanceUrl ? `
              <a href="${project.behanceUrl}" target="_blank" rel="noopener noreferrer" class="modal-behance-cta">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.137 0-6.625-2.857-6.625-6.875 0-4.085 2.664-6.875 6.643-6.875 3.901 0 6.275 2.627 6.275 6.625v1.25h-9.918c.085 2.227 1.637 3.875 4.125 3.875 1.761 0 3.033-.922 3.6-2h2zM9.5 13c0-1.854-.85-2.8-2.3-2.8H4v5.6h3.2c1.45 0 2.3-.946 2.3-2.8zm-2.5-4.8c1.2 0 1.9-.7 1.9-2 0-1.2-.7-1.9-1.9-1.9H4v3.9h3zm8.3 1.8h5.9c-.1-1.6-1.1-2.9-2.9-2.9-1.8 0-2.8 1.3-3 2.9zm-7.8 7.3H0V3.7h7.2c2.8 0 4.6 1.4 4.6 3.6 0 1.4-.7 2.5-1.9 3.1 1.6.6 2.6 1.9 2.6 3.7 0 2.4-2.1 3.2-5 3.2z"/></svg>
                <span>Explore Gallery on Behance ↗</span>
              </a>
            ` : ''}
            <button type="button" class="modal-behance-cta modal-wa-discuss-btn" data-whatsapp-prompt="Hi Vinodh, I am reviewing your '${project.title}' (${project.subtitle}) case study and would like to discuss it!" style="background: rgba(37, 211, 102, 0.12); border-color: rgba(37, 211, 102, 0.4); color: #25D366; cursor: pointer;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.21-.17-.46-.3"/>
              </svg>
              <span>Discuss on WhatsApp 💬</span>
            </button>
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

    const waBtn = this.modalContent.querySelector('.modal-wa-discuss-btn');
    if (waBtn) {
      waBtn.addEventListener('click', () => {
        const prompt = waBtn.getAttribute('data-whatsapp-prompt') || undefined;
        this.closeModal();
        const waFab = document.getElementById('whatsapp-fab');
        if (waFab) {
          waFab.click();
          const msgInput = document.getElementById('wa-message-text') as HTMLTextAreaElement;
          if (msgInput && prompt) {
            msgInput.value = prompt;
          }
        }
      });
    }
  }

  public closeModal(): void {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
}
