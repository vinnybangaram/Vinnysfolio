// Controller for Articles Hub Page (articles.html)
import { ARTICLES_DATA, DetailedArticle } from './data/articlesData';

class ArticlesHubController {
  private searchQuery: string = '';
  private selectedCategory: string = 'all';

  private searchInput: HTMLInputElement | null = null;
  private clearBtn: HTMLButtonElement | null = null;
  private categoryTabs: HTMLElement | null = null;
  private featuredContainer: HTMLElement | null = null;
  private gridContainer: HTMLElement | null = null;
  private countLabel: HTMLElement | null = null;
  private emptyState: HTMLElement | null = null;
  private resetBtn: HTMLButtonElement | null = null;

  constructor() {
    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  private init(): void {
    this.searchInput = document.getElementById('articles-search-input') as HTMLInputElement;
    this.clearBtn = document.getElementById('search-clear-btn') as HTMLButtonElement;
    this.categoryTabs = document.getElementById('articles-category-tabs');
    this.featuredContainer = document.getElementById('featured-article-container');
    this.gridContainer = document.getElementById('articles-magazine-grid');
    this.countLabel = document.getElementById('articles-grid-count');
    this.emptyState = document.getElementById('articles-empty-state');
    this.resetBtn = document.getElementById('reset-search-btn') as HTMLButtonElement;

    this.bindEvents();
    this.render();
  }

  private bindEvents(): void {
    // Search input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = (e.target as HTMLInputElement).value.trim().toLowerCase();
        if (this.clearBtn) {
          this.clearBtn.style.display = this.searchQuery ? 'block' : 'none';
        }
        this.render();
      });
    }

    // Clear search
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => {
        if (this.searchInput) {
          this.searchInput.value = '';
        }
        this.searchQuery = '';
        this.clearBtn!.style.display = 'none';
        this.render();
      });
    }

    // Category pill tabs
    if (this.categoryTabs) {
      this.categoryTabs.addEventListener('click', (e) => {
        const target = (e.target as HTMLElement).closest('.cat-pill') as HTMLElement;
        if (!target) return;

        const cat = target.dataset.category || 'all';
        this.selectedCategory = cat;

        // Update active class
        this.categoryTabs!.querySelectorAll('.cat-pill').forEach((pill) => {
          pill.classList.toggle('active', pill === target);
        });

        this.render();
      });
    }

    // Reset button in empty state
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        this.searchQuery = '';
        this.selectedCategory = 'all';
        if (this.searchInput) this.searchInput.value = '';
        if (this.clearBtn) this.clearBtn.style.display = 'none';

        if (this.categoryTabs) {
          this.categoryTabs.querySelectorAll('.cat-pill').forEach((p, idx) => {
            p.classList.toggle('active', idx === 0);
          });
        }
        this.render();
      });
    }
  }

  private getFilteredArticles(): DetailedArticle[] {
    return ARTICLES_DATA.filter((article) => {
      // Category filter
      const matchesCategory =
        this.selectedCategory === 'all' ||
        article.categorySlug === this.selectedCategory;

      if (!matchesCategory) return false;

      // Search filter
      if (!this.searchQuery) return true;

      const q = this.searchQuery;
      const titleMatch = article.title.toLowerCase().includes(q);
      const subMatch = article.subtitle.toLowerCase().includes(q);
      const summaryMatch = article.summary.toLowerCase().includes(q);
      const topicsMatch = article.topics.some((t) => t.toLowerCase().includes(q));
      const sectionMatch = article.sections.some((s) =>
        s.heading.toLowerCase().includes(q) ||
        s.paragraphs.some((p) => p.toLowerCase().includes(q))
      );

      return titleMatch || subMatch || summaryMatch || topicsMatch || sectionMatch;
    });
  }

  private render(): void {
    const filtered = this.getFilteredArticles();

    this.renderFeatured(filtered);
    this.renderGrid(filtered);

    // Update count label
    if (this.countLabel) {
      if (this.searchQuery || this.selectedCategory !== 'all') {
        this.countLabel.textContent = `Showing ${filtered.length} of ${ARTICLES_DATA.length} Articles`;
      } else {
        this.countLabel.textContent = `All Publications (${ARTICLES_DATA.length})`;
      }
    }

    // Empty state toggle
    if (this.emptyState && this.gridContainer) {
      if (filtered.length === 0) {
        this.emptyState.style.display = 'block';
        this.gridContainer.style.display = 'none';
      } else {
        this.emptyState.style.display = 'none';
        this.gridContainer.style.display = 'grid';
      }
    }
  }

  private renderFeatured(filtered: DetailedArticle[]): void {
    if (!this.featuredContainer) return;

    // Only show featured section if no restrictive search is active, or use first matching article
    const featured = filtered.length > 0 ? filtered[0] : null;

    if (!featured || (this.searchQuery && filtered.length > 1)) {
      this.featuredContainer.style.display = 'none';
      return;
    }

    this.featuredContainer.style.display = 'block';
    this.featuredContainer.innerHTML = `
      <div class="articles-container">
        <div class="featured-spotlight-card">
          <div class="featured-image-box">
            <img src="${featured.heroImage}" alt="${featured.title}" class="featured-hero-img" loading="eager" />
            <div class="featured-image-overlay"></div>
            <div class="featured-badge-overlay">
              <span class="spotlight-tag">★ FLAGSHIP EDITORIAL</span>
              <span class="spotlight-cat">${featured.category}</span>
            </div>
          </div>
          
          <div class="featured-content-box">
            <div class="featured-meta-row">
              <span class="meta-date">${featured.date}</span>
              <span class="meta-bullet">•</span>
              <span class="meta-time">${featured.readTime}</span>
              <span class="meta-bullet">•</span>
              <span class="meta-author">By ${featured.author.name}</span>
            </div>

            <h2 class="featured-headline">
              <a href="article.html?id=${featured.id}" class="featured-title-link">
                ${featured.title}
              </a>
            </h2>

            <p class="featured-lead">${featured.subtitle}</p>
            <p class="featured-summary">${featured.summary}</p>

            <div class="featured-insight-callout">
              <span class="insight-label">CORE ARCHITECTURAL INSIGHT:</span>
              <p class="insight-text">“${featured.coreInsight}”</p>
            </div>

            <div class="featured-topics-row">
              ${featured.topics.map((t) => `<span class="topic-tag">${t}</span>`).join('')}
            </div>

            <div class="featured-actions-row">
              <a href="article.html?id=${featured.id}" class="featured-cta-btn">
                <span>Read Full Essay</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="${featured.linkedinOriginalUrl}" target="_blank" rel="noopener noreferrer" class="featured-linkedin-link">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
                <span>Discuss on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderGrid(filtered: DetailedArticle[]): void {
    if (!this.gridContainer) return;

    if (filtered.length === 0) {
      this.gridContainer.innerHTML = '';
      return;
    }

    this.gridContainer.innerHTML = filtered.map((article, index) => {
      return `
        <article class="article-magazine-card" data-category="${article.categorySlug}">
          <a href="article.html?id=${article.id}" class="article-card-cover-link" aria-label="Read ${article.title}">
            <div class="article-cover-frame">
              <img src="${article.heroImage}" alt="${article.title}" class="article-card-img" loading="lazy" />
              <div class="article-cover-gradient"></div>
              <span class="article-read-badge">${article.readTime}</span>
            </div>
          </a>

          <div class="article-card-body">
            <div class="article-card-meta">
              <span class="article-category-pill badge-${article.categorySlug}">${article.category}</span>
              <span class="card-sep">•</span>
              <span class="card-date">${article.date}</span>
              <span class="card-sep">•</span>
              <span class="card-num">ESSAY // 0${index + 1}</span>
            </div>

            <h3 class="article-card-title">
              <a href="article.html?id=${article.id}">${article.title}</a>
            </h3>

            <p class="article-card-subtitle">${article.subtitle}</p>

            <div class="article-card-topics">
              ${article.topics.slice(0, 3).map((t) => `<span class="card-topic-pill">${t}</span>`).join('')}
            </div>

            <div class="article-card-footer">
              <div class="card-author-info">
                <div class="author-micro-avatar">VK</div>
                <div class="author-micro-text">
                  <span class="author-name">Vinodh Kumar</span>
                  <span class="author-role">UX Lead · AI Specialist</span>
                </div>
              </div>

              <a href="article.html?id=${article.id}" class="article-read-link" aria-label="Read ${article.title}">
                <span>Read</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }
}

new ArticlesHubController();
