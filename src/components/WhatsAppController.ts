import { CONTACT_CONFIG, buildWhatsAppUrl } from '../config/contactConfig';

export class WhatsAppController {
  private fabBtn: HTMLElement | null = null;
  private hubModal: HTMLElement | null = null;
  private backdrop: HTMLElement | null = null;
  private closeBtn: HTMLElement | null = null;
  private form: HTMLFormElement | null = null;
  private nameInput: HTMLInputElement | null = null;
  private messageInput: HTMLTextAreaElement | null = null;
  private submitBtn: HTMLButtonElement | null = null;
  private quickChips: NodeListOf<HTMLButtonElement> | null = null;
  private isOpen: boolean = false;

  constructor() {
    this.injectMarkup();
    this.initElements();
    this.initEvents();
  }

  private injectMarkup(): void {
    // Check if already injected
    if (document.getElementById('whatsapp-fab-container')) return;

    const container = document.createElement('div');
    container.id = 'whatsapp-fab-container';
    container.innerHTML = `
      <!-- Floating WhatsApp Launcher FAB -->
      <aside aria-label="WhatsApp quick chat" class="wa-fab-wrap">
        <button id="whatsapp-fab" class="wa-fab-btn" aria-label="Open WhatsApp message dialog" title="Message Vinodh on WhatsApp">
          <span class="wa-pulse-ring"></span>
          <span class="wa-status-dot"></span>
          <svg class="wa-icon-svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.21-.17-.46-.3"/>
          </svg>
          <span class="wa-fab-label">Chat on WhatsApp</span>
        </button>
      </aside>

      <!-- Glassmorphic WhatsApp Chat Dialog / Drawer -->
      <div id="whatsapp-hub" class="wa-hub-modal" aria-hidden="true" role="dialog" aria-labelledby="wa-hub-title">
        <div id="wa-backdrop" class="wa-hub-backdrop"></div>
        <div class="wa-card">
          <!-- Hub Header -->
          <header class="wa-header">
            <div class="wa-profile-row">
              <div class="wa-avatar-wrap">
                <span class="wa-avatar-text">VK</span>
                <span class="wa-online-indicator" title="Online for inquiries"></span>
              </div>
              <div class="wa-profile-info">
                <div class="wa-name-badge">
                  <h3 id="wa-hub-title" class="wa-name">Vinodh Kumar</h3>
                  <span class="wa-verified-pill" title="Direct Verified Channel">✓</span>
                </div>
                <p class="wa-status-text">Principal Designer · ${CONTACT_CONFIG.whatsappDisplay}</p>
                <span class="wa-response-time">⚡ Online · Direct to Vinodh's WhatsApp</span>
              </div>
            </div>
            <button id="wa-close-btn" class="wa-close-btn" aria-label="Close WhatsApp chat dialog">✕</button>
          </header>

          <!-- Quick Topic Pills -->
          <div class="wa-topics-bar">
            <span class="wa-topics-label">QUICK INQUIRY TOPICS:</span>
            <div class="wa-chips-row">
              <button type="button" class="wa-chip" data-topic="role">💼 UX / Leadership</button>
              <button type="button" class="wa-chip" data-topic="project">🚀 Project Collaboration</button>
              <button type="button" class="wa-chip" data-topic="gis">🗺️ Geospatial & 3D Maps</button>
              <button type="button" class="wa-chip" data-topic="ai">✦ AI × Creative Tech</button>
            </div>
          </div>

          <!-- Message Form -->
          <form id="wa-form" class="wa-form">
            <div class="wa-field-group">
              <label for="wa-sender-name" class="wa-field-label">YOUR NAME / COMPANY <span class="wa-optional">(Optional)</span></label>
              <input type="text" id="wa-sender-name" class="wa-input" placeholder="e.g. Sarah Jenkins · VP Product" maxlength="60" autocomplete="name" />
            </div>

            <div class="wa-field-group">
              <label for="wa-message-text" class="wa-field-label">YOUR MESSAGE</label>
              <textarea id="wa-message-text" class="wa-textarea" rows="4" placeholder="Hi Vinodh, I saw your portfolio and would like to connect regarding..." required></textarea>
            </div>

            <button type="submit" id="wa-submit-btn" class="wa-send-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.21-.17-.46-.3"/>
              </svg>
              <span>Send Message via WhatsApp</span>
              <span class="wa-btn-arrow">→</span>
            </button>
          </form>

          <footer class="wa-footer-meta">
            <span class="wa-meta-lock">🔒 Direct encrypted message via official WhatsApp</span>
          </footer>
        </div>
      </div>
    `;

    document.body.appendChild(container);
  }

  private initElements(): void {
    this.fabBtn = document.getElementById('whatsapp-fab');
    this.hubModal = document.getElementById('whatsapp-hub');
    this.backdrop = document.getElementById('wa-backdrop');
    this.closeBtn = document.getElementById('wa-close-btn');
    this.form = document.getElementById('wa-form') as HTMLFormElement;
    this.nameInput = document.getElementById('wa-sender-name') as HTMLInputElement;
    this.messageInput = document.getElementById('wa-message-text') as HTMLTextAreaElement;
    this.submitBtn = document.getElementById('wa-submit-btn') as HTMLButtonElement;
    this.quickChips = document.querySelectorAll('.wa-chip');
  }

  private initEvents(): void {
    // Open hub from FAB
    this.fabBtn?.addEventListener('click', () => {
      this.toggle();
    });

    // Close hub
    this.closeBtn?.addEventListener('click', () => this.close());
    this.backdrop?.addEventListener('click', () => this.close());

    // Keyboard ESC to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Quick chip handlers
    this.quickChips?.forEach((chip) => {
      chip.addEventListener('click', () => {
        const topic = chip.dataset.topic;
        this.applyTopicTemplate(topic);
      });
    });

    // Form submit
    this.form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendWhatsAppMessage();
    });

    // Listen for any elements on the page with .open-whatsapp-btn or #footer-whatsapp-link
    document.querySelectorAll('.open-whatsapp-btn, #footer-whatsapp-link, [data-open-whatsapp]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const customPrompt = el.getAttribute('data-whatsapp-prompt') || undefined;
        this.open(customPrompt);
      });
    });
  }

  public open(prefilledMessage?: string): void {
    if (!this.hubModal) return;
    this.isOpen = true;
    this.hubModal.classList.add('active');
    this.hubModal.setAttribute('aria-hidden', 'false');

    if (prefilledMessage && this.messageInput) {
      this.messageInput.value = prefilledMessage;
    } else if (this.messageInput && !this.messageInput.value.trim()) {
      this.messageInput.value = 'Hi Vinodh, I was exploring your portfolio and would like to connect regarding a potential collaboration!';
    }

    setTimeout(() => {
      this.messageInput?.focus();
    }, 150);
  }

  public close(): void {
    if (!this.hubModal) return;
    this.isOpen = false;
    this.hubModal.classList.remove('active');
    this.hubModal.setAttribute('aria-hidden', 'true');
  }

  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private applyTopicTemplate(topic?: string): void {
    if (!this.messageInput) return;

    switch (topic) {
      case 'role':
        this.messageInput.value = 'Hi Vinodh, I came across your portfolio and would like to discuss a Design Leadership / UX role at our company.';
        break;
      case 'project':
        this.messageInput.value = 'Hi Vinodh, I have an upcoming product/project that requires senior UX, front-end, and motion expertise, and would like to collaborate.';
        break;
      case 'gis':
        this.messageInput.value = 'Hi Vinodh, I reviewed your geospatial systems (SmartMap-3D / GeoVision / SmartGeoFleet) and want to consult on an enterprise spatial interface.';
        break;
      case 'ai':
        this.messageInput.value = 'Hi Vinodh, I would love to connect about your AI × Creative Tech workflows and generative design integration.';
        break;
      default:
        this.messageInput.value = 'Hi Vinodh, I was exploring your portfolio and would like to connect!';
    }

    this.messageInput.focus();
  }

  private sendWhatsAppMessage(): void {
    if (!this.messageInput) return;

    const rawMessage = this.messageInput.value.trim();
    if (!rawMessage) {
      this.messageInput.focus();
      return;
    }

    const name = this.nameInput?.value.trim() || '';

    let formattedMessage = '';
    if (name) {
      formattedMessage = `Hello Vinodh!\n\n*From:* ${name}\n*Message:*\n${rawMessage}\n\n_(Sent via Vinodh Kumar Portfolio · vinnysfolio.vercel.app)_`;
    } else {
      formattedMessage = `Hello Vinodh!\n\n${rawMessage}\n\n_(Sent via Vinodh Kumar Portfolio · vinnysfolio.vercel.app)_`;
    }

    const targetUrl = buildWhatsAppUrl(formattedMessage);

    // Provide visual feedback on submit button
    if (this.submitBtn) {
      const originalText = this.submitBtn.innerHTML;
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = `
        <span class="wa-spinner"></span>
        <span>Opening WhatsApp...</span>
      `;

      setTimeout(() => {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
        this.submitBtn!.disabled = false;
        this.submitBtn!.innerHTML = originalText;
        this.close();
      }, 400);
    } else {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      this.close();
    }
  }

  public setPhoneNumber(newNumber: string): void {
    CONTACT_CONFIG.whatsappNumber = newNumber.replace(/\D/g, '');
  }
}

