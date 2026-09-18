import { PROFILE_DATA } from '../data/profileData';

export class AIAssistant {
  private drawer: HTMLElement | null;
  private backdrop: HTMLElement | null;
  private closeBtn: HTMLElement | null;
  private toggleBtn: HTMLElement | null;
  private heroAskBtn: HTMLElement | null;
  private messagesContainer: HTMLElement | null;
  private form: HTMLFormElement | null;
  private input: HTMLInputElement | null;
  private suggestionChips: NodeListOf<HTMLButtonElement>;

  private onOpenProject?: (projectId: string) => void;

  constructor(onOpenProject?: (projectId: string) => void) {
    this.drawer = document.getElementById('ai-drawer');
    this.backdrop = document.getElementById('ai-drawer-backdrop');
    this.closeBtn = document.getElementById('ai-drawer-close');
    this.toggleBtn = document.getElementById('ai-assistant-toggle');
    this.heroAskBtn = document.getElementById('hero-ask-ai-btn');
    this.messagesContainer = document.getElementById('ai-messages');
    this.form = document.getElementById('ai-form') as HTMLFormElement;
    this.input = document.getElementById('ai-input') as HTMLInputElement;
    this.suggestionChips = document.querySelectorAll('.suggestion-chip');
    this.onOpenProject = onOpenProject;

    this.initEvents();
  }

  private initEvents(): void {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.open());
    }
    if (this.heroAskBtn) {
      this.heroAskBtn.addEventListener('click', () => this.open());
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    // Keyboard shortcut (Cmd+K or Ctrl+K)
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Form submit
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = this.input?.value.trim();
        if (query) {
          this.handleUserQuery(query);
          if (this.input) this.input.value = '';
        }
      });
    }

    // Suggestions
    this.updateSuggestionChipsListeners();
  }

  private updateSuggestionChipsListeners(): void {
    const chips = document.querySelectorAll('.suggestion-chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (query) {
          this.handleUserQuery(query);
        }
      });
    });
  }

  public open(): void {
    if (this.drawer) {
      this.drawer.classList.add('open');
      this.drawer.setAttribute('aria-hidden', 'false');
      this.input?.focus();
    }
  }

  public close(): void {
    if (this.drawer) {
      this.drawer.classList.remove('open');
      this.drawer.setAttribute('aria-hidden', 'true');
    }
  }

  public toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  public isOpen(): boolean {
    return this.drawer?.classList.contains('open') || false;
  }

  public handleUserQuery(query: string): void {
    // 1. Append User Message
    this.appendMessage('user', query);

    // 2. Generate intelligent response based on verified portfolio data
    setTimeout(() => {
      const response = this.computeAIResponse(query);
      this.appendMessage('assistant', response.html);

      if (response.projectId && this.onOpenProject) {
        const actionBtn = this.messagesContainer?.querySelector(`[data-project-target="${response.projectId}"]`);
        if (actionBtn) {
          actionBtn.addEventListener('click', () => {
            this.close();
            this.onOpenProject!(response.projectId!);
          });
        }
      }

      if (response.sectionId) {
        const actionBtn = this.messagesContainer?.querySelector(`[data-section-target="${response.sectionId}"]`);
        if (actionBtn) {
          actionBtn.addEventListener('click', () => {
            this.close();
            const targetEl = document.getElementById(response.sectionId!);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          });
        }
      }
    }, 320);
  }

  private appendMessage(role: 'user' | 'assistant', content: string): void {
    if (!this.messagesContainer) return;
    const msgEl = document.createElement('div');
    msgEl.className = `ai-message ${role}`;

    const avatar = role === 'user' ? 'YOU' : 'VK/AI';
    msgEl.innerHTML = `
      <div class="msg-avatar">${avatar}</div>
      <div class="msg-body">${role === 'user' ? `<p>${content}</p>` : content}</div>
    `;

    this.messagesContainer.appendChild(msgEl);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  private computeAIResponse(query: string): { html: string; projectId?: string; sectionId?: string } {
    const q = query.toLowerCase();

    // 1. EXPERIENCE & COMPANY HISTORY
    if (
      q.includes('experience') ||
      q.includes('current role') ||
      q.includes('ispatial') ||
      q.includes('medplus') ||
      q.includes('adama') ||
      q.includes('quadro') ||
      q.includes('penna') ||
      q.includes('cipra') ||
      q.includes('samrat') ||
      q.includes('hamstech') ||
      q.includes('company') ||
      q.includes('companies') ||
      q.includes('job') ||
      q.includes('career') ||
      q.includes('background')
    ) {
      const currentExp = PROFILE_DATA.experience[0];
      return {
        html: `
          <p>Vinodh Kumar has a verified <strong>18+ year continuous design career (2004 — Present)</strong> across 8 organizations:</p>
          <ul style="margin: 8px 0 8px 18px; line-height: 1.6; font-size: 0.88rem;">
            <li><strong>iSpatial Techno Solutions [IST] (2021 — Present):</strong> Currently <em>Team Leader - Design</em>, promoted from Lead UX/UI Designer. Directs an 8-member multidisciplinary design and motion team across enterprise GIS, 3D mapping, and AI platforms.</li>
            <li><strong>Penna Teleservices (2020):</strong> Sr. UX/Web Design Consultant delivering remote digital interface architectures.</li>
            <li><strong>Medplus Digital (2017 — 2020):</strong> Senior UX Designer for one of India's largest healthcare and pharmacy e-commerce networks.</li>
            <li><strong>Adama Solutions & Quadro Pvt Ltd (2012 — 2017):</strong> Sr. UX/Web Designer over 5 years. Led 15+ website launches, drove a <strong>+35% user engagement boost</strong> and <strong>+20% conversions</strong>, and introduced design systems cutting dev time by 30%.</li>
            <li><strong>Lakshmi Tele Solutions (2010 — 2012):</strong> Sr. Web Designer for telecommunications portals.</li>
            <li><strong>CIPRA Systems (2009 — 2010):</strong> Sr. Web Designer / Team Lead guided by: <em>"Designing is my Passion. Creativity is my output. Quality is my product."</em></li>
            <li><strong>Samrat Software (2006 — 2008):</strong> Sole design anchor completing <strong>50+ projects</strong> supporting 14 developers simultaneously.</li>
            <li><strong>Hamstech Institute (2004 — 2006):</strong> Foundational career roots as sole lead designer for celebrity events and the landmark <em>Annual Calendar 2006</em>.</li>
          </ul>
          <button class="suggestion-chip" data-section-target="experience" style="margin-top:10px; border-color: #38bdf8; color: #38bdf8;">✦ Explore Full Experience Timeline</button>
        `,
        sectionId: 'experience'
      };
    }

    // 2. LEADERSHIP & TEAM
    if (
      q.includes('leader') ||
      q.includes('team') ||
      q.includes('mentor') ||
      q.includes('manage') ||
      q.includes('members') ||
      q.includes('direction')
    ) {
      return {
        html: `
          <p>Vinodh leads an <strong>~8-member multidisciplinary design and motion team</strong> at iSpatial Techno Solutions. His leadership focuses on four core pillars:</p>
          <ul style="margin: 6px 0 6px 18px; line-height: 1.6;">
            <li><strong>Mentorship & Culture:</strong> Weekly design reviews, pairing, and individual craft coaching.</li>
            <li><strong>UX & Token Standards:</strong> Establishing multi-platform design token systems with 100% WCAG AAA accessibility.</li>
            <li><strong>Cross-Functional Synergy:</strong> Bridging product, spatial engineering, and executive strategy.</li>
            <li><strong>Emerging Tech:</strong> Integrating AI acceleration and WebGL spatial graphics into production pipelines.</li>
          </ul>
          <button class="suggestion-chip" data-section-target="leadership" style="margin-top:10px; border-color: #fbbf24; color: #fbbf24;">✦ Explore Design Leadership</button>
        `,
        sectionId: 'leadership'
      };
    }

    // 3. CERTIFICATIONS
    if (
      q.includes('certif') ||
      q.includes('claude') ||
      q.includes('anthropic') ||
      q.includes('credential') ||
      q.includes('accreditation')
    ) {
      const cert = PROFILE_DATA.certifications[0];
      return {
        html: `
          <p>Vinodh holds official accreditation from Anthropic:</p>
          <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 10px 14px; margin: 8px 0;">
            <div style="font-weight: 700; color: #fff; font-size: 0.95rem;">${cert.issuer} — ${cert.title}</div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #38bdf8; margin: 2px 0;">Credential ID: ${cert.credentialId}</div>
            <div style="font-size: 0.8rem; color: #94a3b8;">Issued: ${cert.issuedDate} · Valid until: ${cert.expiryDate} · Status: <strong>VERIFIED</strong></div>
          </div>
          <p style="font-size: 0.85rem; color: #94a3b8;">This credential validates advanced competency in frontier LLM reasoning frameworks, contextual prompt architectures, and human-in-the-loop AI orchestration.</p>
          <button class="suggestion-chip" data-section-target="certifications" style="margin-top:10px; border-color: #38bdf8; color: #38bdf8;">✦ Inspect Credential Vault</button>
        `,
        sectionId: 'certifications'
      };
    }

    // 4. TOOLS & TECHNOLOGIES
    if (
      q.includes('tool') ||
      q.includes('figma') ||
      q.includes('software') ||
      q.includes('tech stack') ||
      q.includes('photoshop') ||
      q.includes('after effects') ||
      q.includes('three.js')
    ) {
      return {
        html: `
          <p>Vinodh works with a curated tool ecosystem across four key domains:</p>
          <ul style="margin: 6px 0 6px 18px; line-height: 1.6;">
            <li><strong>Design & Prototyping:</strong> Figma, Adobe Photoshop, Illustrator, After Effects, Premiere Pro.</li>
            <li><strong>AI Models:</strong> Claude (Anthropic Certified), ChatGPT, Gemini, Google Flow, Grok, Midjourney, Flux, Runway.</li>
            <li><strong>Creative Technology:</strong> Three.js, WebGL, HTML5, CSS3, Modern JavaScript, React.</li>
            <li><strong>Building & Ops:</strong> TypeScript, GitHub, Vercel, Lovable, Vite.</li>
          </ul>
          <button class="suggestion-chip" data-section-target="tools" style="margin-top:10px; border-color: #34d399; color: #34d399;">✦ View Tools Ecosystem</button>
        `,
        sectionId: 'tools'
      };
    }

    // 5. AI WORKFLOWS & EXPERIMENTS
    if (
      q.includes('ai tool') ||
      q.includes('ai workflow') ||
      q.includes('generative') ||
      q.includes('face restoration') ||
      q.includes('gpu') ||
      q.includes('model') ||
      q.includes('designing with ai')
    ) {
      const exp = PROFILE_DATA.aiWorkflows.featuredExperiment;
      return {
        html: `
          <p><strong>Vinodh's AI Design Philosophy:</strong> "${PROFILE_DATA.aiWorkflows.philosophy}"</p>
          <p style="margin-top:8px;">His workflow progresses through: <strong>Intent → Thinking → AI Acceleration → Experimentation → Creative Output</strong>.</p>
          <p style="margin-top:8px;"><strong>Featured Experiment:</strong> ${exp.title} — a private desktop tool utilizing local Nvidia CUDA acceleration, CodeFormer, and GFPGAN for high-fidelity facial restoration and temporal video upscaling with zero cloud latency.</p>
          <button class="suggestion-chip" data-section-target="ai-design" style="margin-top:10px; border-color: #fbbf24; color: #fbbf24;">✦ Open AI Workflow Section</button>
        `,
        sectionId: 'ai-design'
      };
    }

    // 6. ARTICLES & THOUGHT PROCESS
    if (
      q.includes('article') ||
      q.includes('write') ||
      q.includes('thought') ||
      q.includes('essay') ||
      q.includes('metaphor') ||
      q.includes('psychology') ||
      q.includes('benchmarking') ||
      q.includes('poster')
    ) {
      return {
        html: `
          <p>Vinodh has authored 6 published articles and design thinking pieces on LinkedIn:</p>
          <ol style="margin: 6px 0 6px 18px; line-height: 1.6;">
            <li><strong>Visual Metaphorism in Graphic Design</strong> (Semiotic mental models)</li>
            <li><strong>Understanding Client Psychology</strong> (Aligning design rationale with business ROI)</li>
            <li><strong>Benchmarking in UX Design</strong> (Quantitative usability metrics & SUS scoring)</li>
            <li><strong>Design Fundamentals for Graphic & UX Designers</strong> (Grid baselines & Gestalt tenets)</li>
            <li><strong>Technical Poster Design</strong> (High-density information architecture)</li>
            <li><strong>AI & Creative Technology Workflows</strong> (Collaborative generative pipelines)</li>
          </ol>
          <button class="suggestion-chip" data-section-target="thinking" style="margin-top:10px; border-color: #c084fc; color: #c084fc;">✦ Read Published Articles</button>
        `,
        sectionId: 'thinking'
      };
    }

    // 7. SKILLS MATRIX
    if (
      q.includes('skill') ||
      q.includes('matrix') ||
      q.includes('competenc') ||
      q.includes('capabilities') ||
      q.includes('front-end') ||
      q.includes('code')
    ) {
      return {
        html: `
          <p>Vinodh's skill matrix is organized into six structured clusters:</p>
          <ul style="margin: 6px 0 6px 18px; line-height: 1.6;">
            <li><strong>Design:</strong> UX/UI, Graphic Design, Interaction Design, Design Systems, Information Architecture.</li>
            <li><strong>Motion:</strong> Kinetic Typography, UI Motion, Video Design, Physics-damped Béziers.</li>
            <li><strong>Front-End:</strong> Semantic HTML5, Modern CSS Architecture, Responsive Tokens, Design-to-Code.</li>
            <li><strong>AI / Creative Tech:</strong> Generative AI, Computer Vision, Prompt Engineering, Creative Coding.</li>
            <li><strong>Geospatial:</strong> GIS Interfaces, Map UX, 3D Spatial Design, Telematics Command Hubs.</li>
            <li><strong>Leadership:</strong> Team Mentoring, Design Reviews, Creative Direction, UX Strategy.</li>
          </ul>
          <button class="suggestion-chip" data-section-target="skills" style="margin-top:10px; border-color: #38bdf8; color: #38bdf8;">✦ Inspect Skill Matrix</button>
        `,
        sectionId: 'skills'
      };
    }

    // 8. GIS / MAPPING PROJECTS
    if (
      q.includes('gis') ||
      q.includes('map') ||
      q.includes('smartmap') ||
      q.includes('spatial') ||
      q.includes('geofleet') ||
      q.includes('terrain')
    ) {
      return {
        html: `
          <p>Vinodh has deep domain authority in <strong>GIS and Spatial 3D Intelligence</strong>:</p>
          <ul style="margin: 6px 0 6px 18px; line-height: 1.6;">
            <li><strong>SmartMap-3D:</strong> Flagship enterprise GIS platform rendering 100,000+ real-time vector markers at 60fps with elevation slicing and sub-second querying (-48% latency).</li>
            <li><strong>SmartGeoFleet:</strong> Real-time telematics platform commanding 12,500+ active transport assets with GPS path interpolation and predictive maintenance alerts.</li>
          </ul>
          <button class="suggestion-chip" data-project-target="smartmap-3d" style="margin-top:10px; border-color: #38bdf8; color: #38bdf8;">✦ Open SmartMap-3D Case Study</button>
        `,
        projectId: 'smartmap-3d'
      };
    }

    // 9. MOTION DESIGN
    if (
      q.includes('motion') ||
      q.includes('animation') ||
      q.includes('particle') ||
      q.includes('kinetics') ||
      q.includes('timing')
    ) {
      return {
        html: `
          <p>In Vinodh's practice, motion is functional spatial grammar. He utilizes custom cubic-bézier velocity curves, physics-damped trajectory easing, and GPU shaders to convey cause-and-effect with zero cognitive dissonance.</p>
          <p style="margin-top:8px;">Check out <strong>Particle2Face</strong>, an experiment blending MediaPipe facial mesh tracking with a 150,000-particle WebGL compute swarm.</p>
          <button class="suggestion-chip" data-project-target="particle2face" style="margin-top:10px; border-color: #c084fc; color: #c084fc;">✦ View Particle2Face Case Study</button>
        `,
        projectId: 'particle2face'
      };
    }

    // 10. SOCIAL / BEHANCE / CONTACT
    if (
      q.includes('contact') ||
      q.includes('email') ||
      q.includes('behance') ||
      q.includes('linkedin') ||
      q.includes('reach') ||
      q.includes('hire')
    ) {
      return {
        html: `
          <p>You can connect with Vinodh across verified channels:</p>
          <ul style="margin: 6px 0 6px 18px; line-height: 1.6;">
            <li><strong>Behance Portfolio:</strong> <a href="${PROFILE_DATA.socialLinks.behance}" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;">behance.net/AkkySigns</a></li>
            <li><strong>LinkedIn Profile:</strong> <a href="${PROFILE_DATA.socialLinks.linkedin}" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;">LinkedIn (22K+ community)</a></li>
            <li><strong>Direct Inquiry:</strong> <a href="mailto:${PROFILE_DATA.socialLinks.email}" style="color:#38bdf8;">${PROFILE_DATA.socialLinks.email}</a></li>
          </ul>
          <button class="suggestion-chip" data-section-target="contact" style="margin-top:10px; border-color: #38bdf8; color: #38bdf8;">✦ Jump to Contact Section</button>
        `,
        sectionId: 'contact'
      };
    }

    // DEFAULT / ALL PROJECTS OVERVIEW
    return {
      html: `
        <p>Vinodh Kumar is a multidisciplinary design leader (18+ yrs experience) and Team Lead at iSpatial Techno Solutions. Here are key areas you can ask about:</p>
        <ol style="margin: 6px 0 6px 18px; line-height: 1.6;">
          <li><strong>Current Role:</strong> Leading ~8 designers at iSpatial Techno Solutions (IST).</li>
          <li><strong>Featured Projects:</strong> SmartMap-3D, GeoVision, SmartGeoFleet, SmartCreativeOS, Particle2Face, Enterprise Spatial Design System.</li>
          <li><strong>Anthropic Certification:</strong> Claude 101 Certified (Credential ID: rnu386y3s85a).</li>
          <li><strong>Published Articles:</strong> 6 design essays on LinkedIn.</li>
          <li><strong>AI & Creative Technology:</strong> Local GPU face restoration and workflow automation.</li>
        </ol>
      `
    };
  }
}
