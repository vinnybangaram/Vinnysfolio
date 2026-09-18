// Controller for Article Detail Page (article.html)
import { ARTICLES_DATA, DetailedArticle, ArticleSection } from './data/articlesData';

class ArticleDetailController {
  private article: DetailedArticle | null = null;
  private canvas: HTMLElement | null = null;
  private progressBar: HTMLElement | null = null;
  private breadcrumbTitle: HTMLElement | null = null;
  private navLinkedinOriginal: HTMLAnchorElement | null = null;
  private copyLinkBtn: HTMLButtonElement | null = null;

  constructor() {
    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  private init(): void {
    this.canvas = document.getElementById('article-canvas');
    this.progressBar = document.getElementById('reading-progress-bar');
    this.breadcrumbTitle = document.getElementById('breadcrumb-title');
    this.navLinkedinOriginal = document.getElementById('nav-linkedin-original') as HTMLAnchorElement;
    this.copyLinkBtn = document.getElementById('copy-article-link-btn') as HTMLButtonElement;

    this.loadArticle();
    this.setupReadingProgress();
    this.setupShareButton();
  }

  private loadArticle(): void {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // Find requested article, or fallback to first one
    const found = ARTICLES_DATA.find((a) => a.id === id) || ARTICLES_DATA[0];
    this.article = found;

    if (!this.article) {
      if (this.canvas) {
        this.canvas.innerHTML = `
          <div class="article-not-found">
            <h2>Article Not Found</h2>
            <p>The requested essay could not be located.</p>
            <a href="articles.html" class="cta-back">Return to All Articles</a>
          </div>
        `;
      }
      return;
    }

    // Update document metadata
    document.title = `${this.article.title} — Vinodh Kumar`;
    const metaDesc = document.getElementById('page-meta-desc');
    if (metaDesc) metaDesc.setAttribute('content', this.article.summary);

    if (this.breadcrumbTitle) {
      this.breadcrumbTitle.textContent = this.article.title;
    }

    if (this.navLinkedinOriginal) {
      this.navLinkedinOriginal.href = this.article.linkedinOriginalUrl;
    }

    this.render();
  }

  private setupReadingProgress(): void {
    const updateProgress = () => {
      if (!this.progressBar) return;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        this.progressBar.style.width = '0%';
        return;
      }
      const currentScroll = window.scrollY;
      const progressPercent = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
      this.progressBar.style.width = `${progressPercent}%`;
    };

    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateProgress);
    }, { passive: true });

    updateProgress();
  }

  private setupShareButton(): void {
    if (!this.copyLinkBtn) return;

    this.copyLinkBtn.addEventListener('click', async () => {
      const shareBtnText = document.getElementById('share-btn-text');
      try {
        await navigator.clipboard.writeText(window.location.href);
        if (shareBtnText) shareBtnText.textContent = 'Copied! ✓';
        this.copyLinkBtn?.classList.add('copied');

        setTimeout(() => {
          if (shareBtnText) shareBtnText.textContent = 'Share Link';
          this.copyLinkBtn?.classList.remove('copied');
        }, 2200);
      } catch (err) {
        // Fallback
        prompt('Copy article URL:', window.location.href);
      }
    });
  }

  private render(): void {
    if (!this.canvas || !this.article) return;

    const art = this.article;

    // Find Previous and Next articles for pagination
    const currentIndex = ARTICLES_DATA.findIndex((a) => a.id === art.id);
    const prevArticle = currentIndex > 0 ? ARTICLES_DATA[currentIndex - 1] : null;
    const nextArticle = currentIndex < ARTICLES_DATA.length - 1 ? ARTICLES_DATA[currentIndex + 1] : null;

    this.canvas.innerHTML = `
      <div class="article-header-wrapper">
        <a href="articles.html" class="article-back-hub-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>All Published Articles</span>
        </a>

        <div class="article-meta-tags-row">
          <span class="article-category-badge badge-${art.categorySlug}">${art.category}</span>
          <span class="meta-dot">•</span>
          <span class="article-meta-item">${art.readTime}</span>
          <span class="meta-dot">•</span>
          <span class="article-meta-item">${art.date}</span>
        </div>

        <h1 class="article-reading-title">${art.title}</h1>
        <p class="article-reading-subtitle">${art.subtitle}</p>

        <!-- Author Bylaw Card -->
        <div class="article-author-card">
          <div class="author-avatar-block">
            <span class="avatar-text">VK</span>
            <span class="avatar-verified" title="Verified Author">✓</span>
          </div>
          <div class="author-text-block">
            <div class="author-name-row">
              <span class="author-display-name">${art.author.name}</span>
              <span class="author-role-pill">Author</span>
            </div>
            <p class="author-bio-line">${art.author.role} · ${art.author.company}</p>
          </div>
          <div class="author-actions-block">
            <a href="${art.linkedinOriginalUrl}" target="_blank" rel="noopener noreferrer" class="article-discuss-btn">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
              <span>View on LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Hero Visual Banner -->
      <div class="article-hero-banner-frame">
        <img src="${art.heroImage}" alt="${art.title}" class="article-hero-banner-img" />
        <div class="article-banner-glow"></div>
        <div class="article-banner-caption">
          <span class="caption-icon">ℹ</span>
          <span>${art.heroCaption}</span>
        </div>
      </div>

      <!-- Core Architectural Insight Highlight -->
      <div class="article-core-insight-card">
        <div class="insight-mark">“</div>
        <div class="insight-content">
          <span class="insight-lead-title">EXECUTIVE ARCHITECTURAL THESIS</span>
          <p class="insight-quote-text">${art.coreInsight}</p>
        </div>
      </div>

      <!-- Table of Contents Quick Nav -->
      <div class="article-toc-box">
        <div class="toc-header">
          <span class="toc-icon">☰</span>
          <span class="toc-title">KEY ESSAY CHAPTERS & COGNITIVE FRAMEWORKS</span>
        </div>
        <div class="toc-links-grid">
          ${art.sections.map((sec, idx) => `
            <a href="#section-${idx}" class="toc-anchor-link">
              <span class="toc-idx">0${idx + 1}</span>
              <span class="toc-label">${sec.heading}</span>
            </a>
          `).join('')}
        </div>
      </div>

      <!-- Main Long-Form Article Body -->
      <div class="article-body-content">
        ${art.sections.map((sec, idx) => this.renderSection(sec, idx)).join('')}
      </div>

      <!-- Key Takeaways Practical Checklist -->
      <div class="article-takeaways-box">
        <div class="takeaways-header">
          <div class="takeaways-icon-box">⚡</div>
          <div>
            <h3 class="takeaways-title">Actionable Conclusions for Designers & Product Leaders</h3>
            <span class="takeaways-subtitle">Core principles distilled from Vinodh Kumar's practice</span>
          </div>
        </div>
        <ul class="takeaways-list">
          ${art.keyTakeaways.map((item) => `
            <li class="takeaway-item">
              <span class="takeaway-check">✓</span>
              <span class="takeaway-text">${item}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- LinkedIn Discussion Card -->
      <div class="article-discussion-card">
        <div class="discussion-content">
          <div class="discussion-icon-badge">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
          </div>
          <div>
            <h3 class="discussion-title">Join the Discourse on LinkedIn</h3>
            <p class="discussion-subtitle">
              This essay was originally published to Vinodh's network of 22,000+ design and tech practitioners. Leave your thoughts, counter-arguments, or share your own experience.
            </p>
          </div>
        </div>
        <a href="${art.linkedinOriginalUrl}" target="_blank" rel="noopener noreferrer" class="discussion-cta-btn">
          <span>Read Comments & Share on LinkedIn</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
        </a>
      </div>

      <!-- Next & Previous Article Pagination Navigation -->
      <div class="article-pagination-nav">
        ${prevArticle ? `
          <a href="article.html?id=${prevArticle.id}" class="pagination-card prev-card">
            <span class="pagination-label">← PREVIOUS PUBLICATION</span>
            <h4 class="pagination-title">${prevArticle.title}</h4>
            <span class="pagination-meta">${prevArticle.category} · ${prevArticle.readTime}</span>
          </a>
        ` : `<div class="pagination-placeholder"></div>`}

        ${nextArticle ? `
          <a href="article.html?id=${nextArticle.id}" class="pagination-card next-card">
            <span class="pagination-label">NEXT PUBLICATION →</span>
            <h4 class="pagination-title">${nextArticle.title}</h4>
            <span class="pagination-meta">${nextArticle.category} · ${nextArticle.readTime}</span>
          </a>
        ` : `<div class="pagination-placeholder"></div>`}
      </div>

      <!-- Detailed Author Bio Block -->
      <div class="article-author-bio-footer">
        <div class="bio-left">
          <div class="bio-avatar">VK</div>
        </div>
        <div class="bio-right">
          <div class="bio-badge">ABOUT THE AUTHOR</div>
          <h3 class="bio-name">Vinodh Kumar</h3>
          <p class="bio-role">Team Lead — UX/UI, Motion & AI Design @ iSpatial Techno Solutions</p>
          <p class="bio-description">
            Vinodh has spent 18+ years advancing digital design craft, leading teams in building high-consequence geospatial mapping suites, spatial intelligence dashboards, and generative AI design systems. Based in Hyderabad, India, he writes regularly on cognitive ergonomics, creative technology, and leadership.
          </p>
          <div class="bio-links">
            <a href="index.html#portfolio" class="bio-link">View Portfolio Work</a>
            <a href="https://www.linkedin.com/in/vinnythewebdesigner/" target="_blank" rel="noopener noreferrer" class="bio-link special">LinkedIn (22K+) ↗</a>
            <a href="https://www.behance.net/AkkySigns" target="_blank" rel="noopener noreferrer" class="bio-link">Behance ↗</a>
          </div>
        </div>
      </div>
    `;
  }

  private renderSection(sec: ArticleSection, idx: number): string {
    const paragraphsHtml = sec.paragraphs.map((p) => `<p class="article-p">${p}</p>`).join('');

    const quoteHtml = sec.quote ? `
      <blockquote class="article-pull-quote">
        <p>“${sec.quote}”</p>
      </blockquote>
    ` : '';

    const calloutHtml = sec.callout ? `
      <div class="article-callout-box callout-${sec.callout.type}">
        <div class="callout-header">
          <span class="callout-badge">${sec.callout.type.toUpperCase()}</span>
          <h4 class="callout-title">${sec.callout.title}</h4>
        </div>
        <p class="callout-text">${sec.callout.text}</p>
      </div>
    ` : '';

    const bulletsHtml = sec.bulletPoints && sec.bulletPoints.length > 0 ? `
      <ul class="article-bullet-list">
        ${sec.bulletPoints.map((item) => `
          <li class="bullet-item">
            <span class="bullet-chevron">›</span>
            <span class="bullet-text">${item}</span>
          </li>
        `).join('')}
      </ul>
    ` : '';

    return `
      <section class="article-content-section" id="section-${idx}">
        <h2 class="article-h2">
          <span class="h2-index">0${idx + 1}.</span>
          <span class="h2-text">${sec.heading}</span>
        </h2>
        ${paragraphsHtml}
        ${quoteHtml}
        ${calloutHtml}
        ${bulletsHtml}
      </section>
    `;
  }
}

new ArticleDetailController();
