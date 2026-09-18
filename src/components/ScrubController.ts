export class ScrubController {
  private slider: HTMLInputElement | null;
  private timecodeEl: HTMLElement | null;
  private stageButtons: NodeListOf<HTMLElement>;
  private trackEl: HTMLElement | null;
  private isUserDraggingSlider: boolean = false;
  private onUserScrub?: (progress: number) => void;

  constructor(onUserScrub?: (progress: number) => void) {
    this.slider = document.getElementById('cinematic-slider') as HTMLInputElement;
    this.timecodeEl = document.getElementById('scrub-timecode');
    this.stageButtons = document.querySelectorAll('.stage-step');
    this.trackEl = document.getElementById('cinematic-track');
    this.onUserScrub = onUserScrub;

    this.initSliderEvents();
    this.initStageNavEvents();
  }

  private initSliderEvents(): void {
    if (!this.slider) return;

    this.slider.addEventListener('input', () => {
      this.isUserDraggingSlider = true;
      const val = parseFloat(this.slider!.value);
      const progress = val / 1000;
      if (this.onUserScrub) {
        this.onUserScrub(progress);
      }
    });

    this.slider.addEventListener('change', () => {
      this.isUserDraggingSlider = false;
    });
  }

  private initStageNavEvents(): void {
    const stageProgressMap: Record<number, number> = {
      1: 0.12, // Graphic Design
      2: 0.32, // UX Design
      3: 0.52, // UI / Code
      4: 0.72, // Motion
      5: 0.88  // AI
    };

    this.stageButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const stageNum = parseInt(btn.getAttribute('data-stage') || '1', 10);
        const targetProgress = stageProgressMap[stageNum] ?? 0;
        this.scrollToProgress(targetProgress);
      });
    });
  }

  public scrollToProgress(progress: number): void {
    if (!this.trackEl) return;
    const trackHeight = this.trackEl.offsetHeight - window.innerHeight;
    const targetScroll = this.trackEl.offsetTop + progress * trackHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }

  public updateScrubUI(progress: number, frameIndex: number, totalFrames: number): void {
    // Only update slider value if user is not actively dragging it
    if (this.slider && !this.isUserDraggingSlider) {
      this.slider.value = Math.round(progress * 1000).toString();
    }

    // Format timecode: 599 frames at 24fps ≈ 24.95 seconds
    if (this.timecodeEl) {
      const currentSeconds = (frameIndex / 24);
      const totalSeconds = (totalFrames / 24);
      this.timecodeEl.textContent = `${this.formatTime(currentSeconds)} / ${this.formatTime(totalSeconds)}`;
    }
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds - Math.floor(seconds)) * 24);
    const mm = mins.toString().padStart(2, '0');
    const ss = secs.toString().padStart(2, '0');
    const ff = frames.toString().padStart(2, '0');
    return `${mm}:${ss}:${ff}`;
  }
}
