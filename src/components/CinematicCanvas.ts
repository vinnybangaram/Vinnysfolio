import { FrameLoader } from '../systems/FrameLoader';

export class CinematicCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private frameLoader: FrameLoader;

  private targetFrame: number = 0;
  private currentFrame: number = 0;
  private totalFrames: number;
  private animFrameId: number | null = null;
  private onFrameUpdate?: (frameIndex: number, progress: number) => void;

  constructor(
    canvas: HTMLCanvasElement,
    frameLoader: FrameLoader,
    onFrameUpdate?: (frameIndex: number, progress: number) => void
  ) {
    this.canvas = canvas;
    const context = this.canvas.getContext('2d', { alpha: true });
    if (!context) throw new Error('Could not get 2D canvas context');
    this.ctx = context;

    this.frameLoader = frameLoader;
    this.totalFrames = frameLoader.getTotalFrames();
    this.onFrameUpdate = onFrameUpdate;

    this.resize();
    window.addEventListener('resize', this.resize.bind(this));

    this.loop();
  }

  public resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    this.canvas.width = displayWidth * dpr;
    this.canvas.height = displayHeight * dpr;
    this.canvas.style.width = `${displayWidth}px`;
    this.canvas.style.height = `${displayHeight}px`;

    this.ctx.scale(dpr, dpr);
  }

  public setProgress(progress: number): void {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    this.targetFrame = clampedProgress * (this.totalFrames - 1);
  }

  private loop(): void {
    this.animFrameId = requestAnimationFrame(this.loop.bind(this));

    // Smooth spring dampening between current frame and target frame
    const delta = this.targetFrame - this.currentFrame;
    if (Math.abs(delta) > 0.001) {
      this.currentFrame += delta * 0.18; // responsive cinematic scrub
    } else {
      this.currentFrame = this.targetFrame;
    }

    this.render();

    if (this.onFrameUpdate) {
      const progress = this.currentFrame / (this.totalFrames - 1);
      this.onFrameUpdate(Math.round(this.currentFrame), progress);
    }
  }

  private render(): void {
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    this.ctx.clearRect(0, 0, displayWidth, displayHeight);

    const img = this.frameLoader.getFrame(this.currentFrame);
    if (!img || !img.complete || img.naturalWidth === 0) {
      return;
    }

    // Preserve 16:9 Aspect Ratio (Cover logic tailored to keep human subject centered and feet aligned with floor)
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth: number;
    let drawHeight: number;
    let drawX: number;
    let drawY: number;

    if (canvasAspect > imgAspect) {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgAspect;
      drawX = 0;
      // Bias upward so head/face is never clipped on wide displays
      drawY = Math.min(0, (displayHeight - drawHeight) * 0.15);
    } else {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgAspect;
      drawX = (displayWidth - drawWidth) / 2;
      drawY = 0;
    }

    // Draw the human video frame
    this.ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    // Subtle edge gradient vignette to seamlessly meld frame border into WebGL floor
    const gradientBottom = this.ctx.createLinearGradient(0, displayHeight - 120, 0, displayHeight);
    gradientBottom.addColorStop(0, 'rgba(7, 9, 12, 0)');
    gradientBottom.addColorStop(1, 'rgba(7, 9, 12, 0.85)');

    this.ctx.fillStyle = gradientBottom;
    this.ctx.fillRect(0, displayHeight - 120, displayWidth, 120);

    const gradientTop = this.ctx.createLinearGradient(0, 0, 0, 80);
    gradientTop.addColorStop(0, 'rgba(7, 9, 12, 0.7)');
    gradientTop.addColorStop(1, 'rgba(7, 9, 12, 0)');

    this.ctx.fillStyle = gradientTop;
    this.ctx.fillRect(0, 0, displayWidth, 80);
  }

  public getCurrentFrameIndex(): number {
    return Math.round(this.currentFrame);
  }

  public destroy(): void {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.resize.bind(this));
  }
}
