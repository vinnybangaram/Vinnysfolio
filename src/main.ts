import { FrameLoader } from './systems/FrameLoader';
import { ThreeScene } from './components/ThreeScene';
import { CinematicCanvas } from './components/CinematicCanvas';
import { HUDSystem } from './components/HUDSystem';
import { StageManager } from './components/StageManager';
import { PortfolioSection } from './components/PortfolioSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProfileController } from './components/ProfileController';
import { InteractivePlayground } from './components/InteractivePlayground';
import { OrbitalSkillGalaxy } from './components/OrbitalSkillGalaxy';
import { AIAssistant } from './components/AIAssistant';
import { ScrubController } from './components/ScrubController';

class App {
  private frameLoader!: FrameLoader;
  private threeScene!: ThreeScene;
  private cinematicCanvas!: CinematicCanvas;
  private hudSystem!: HUDSystem;
  private stageManager!: StageManager;
  private portfolioSection!: PortfolioSection;
  private aiAssistant!: AIAssistant;
  private scrubController!: ScrubController;

  private trackEl: HTMLElement | null = null;
  private scrollProgress: number = 0;
  private targetScrollProgress: number = 0;
  private isScrubbingViaSlider: boolean = false;

  constructor() {
    this.init();
  }

  private init(): void {
    this.trackEl = document.getElementById('cinematic-track');

    // 1. Initialize Frame Loader
    const loaderStatusText = document.getElementById('loader-status-text');
    const loaderPercent = document.getElementById('loader-percent');
    const loaderProgressFill = document.getElementById('loader-progress-fill');
    const loaderFrameCount = document.getElementById('loader-frame-count');

    this.frameLoader = new FrameLoader({
      totalFrames: 599,
      startFrameNumber: 1000,
      baseUrl: '/frames',
      onProgress: (loaded, total, percent) => {
        if (loaderPercent) loaderPercent.textContent = `${percent}%`;
        if (loaderProgressFill) loaderProgressFill.style.width = `${percent}%`;
        if (loaderFrameCount) loaderFrameCount.textContent = `STREAMING SPATIAL FRAMES: ${loaded} / ${total}`;
        if (loaderStatusText) loaderStatusText.textContent = percent < 100 ? 'CALIBRATING DESIGN ARCHITECTURE...' : 'STREAM CALIBRATED // READY';
      },
      onReady: () => {
        setTimeout(() => {
          document.body.classList.remove('loading-state');
        }, 400);
      }
    });

    // Start preloading keyframes
    this.frameLoader.startPreloading();

    // 2. Initialize Three.js Environment
    const webglCanvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
    this.threeScene = new ThreeScene(webglCanvas);

    // 3. Initialize HUD System
    const hudSvg = document.getElementById('hud-svg') as unknown as SVGSVGElement;
    this.hudSystem = new HUDSystem(hudSvg);

    // 4. Initialize Stage Manager
    this.stageManager = new StageManager();

    // 5. Initialize Cinematic Human Compositor Canvas
    const humanCanvas = document.getElementById('human-canvas') as HTMLCanvasElement;
    this.cinematicCanvas = new CinematicCanvas(
      humanCanvas,
      this.frameLoader,
      (frameIdx, progress) => {
        const frameNumber = 1000 + frameIdx;
        this.hudSystem.updateTelemetry(frameNumber, progress);
        this.scrubController?.updateScrubUI(progress, frameIdx, 599);
      }
    );

    // 6. Initialize Portfolio Section & Modal
    this.portfolioSection = new PortfolioSection();

    // 7. Initialize Experience Timeline, Profile Systems & Orbital Galaxy
    new ExperienceTimeline();
    new ProfileController();
    new InteractivePlayground();
    new OrbitalSkillGalaxy('orbital-galaxy-canvas');

    // 8. Initialize AI Assistant with deep link callback
    this.aiAssistant = new AIAssistant((projectId: string) => {
      this.portfolioSection.openProjectModal(projectId);
      const portfolioSec = document.getElementById('portfolio');
      if (portfolioSec) {
        portfolioSec.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // 8. Initialize Scrub Controller
    this.scrubController = new ScrubController((sliderProgress: number) => {
      this.isScrubbingViaSlider = true;
      this.targetScrollProgress = sliderProgress;
      this.scrubController.scrollToProgress(sliderProgress);
      setTimeout(() => {
        this.isScrubbingViaSlider = false;
      }, 50);
    });

    // 9. Scroll Listener & Animation Loop
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
    this.onScroll(); // initial check

    this.renderLoop();
  }

  private onScroll(): void {
    if (!this.trackEl || this.isScrubbingViaSlider) return;

    const trackRect = this.trackEl.getBoundingClientRect();
    const trackHeight = this.trackEl.offsetHeight - window.innerHeight;
    const currentScrollY = -trackRect.top;

    const rawProgress = currentScrollY / trackHeight;
    this.targetScrollProgress = Math.max(0, Math.min(1, rawProgress));
  }

  private renderLoop(): void {
    requestAnimationFrame(this.renderLoop.bind(this));

    // Smooth lerp for scroll progress to eliminate mouse wheel jank
    const diff = this.targetScrollProgress - this.scrollProgress;
    if (Math.abs(diff) > 0.0005) {
      this.scrollProgress += diff * 0.15;
    } else {
      this.scrollProgress = this.targetScrollProgress;
    }

    // Distribute normalized progress to all systems
    this.cinematicCanvas.setProgress(this.scrollProgress);
    this.threeScene.updateScrollProgress(this.scrollProgress);
    this.stageManager.update(this.scrollProgress);
  }
}

// Instantiate on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  new App();
});
