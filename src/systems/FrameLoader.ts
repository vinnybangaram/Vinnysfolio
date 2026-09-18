export interface FrameLoaderOptions {
  totalFrames: number;
  startFrameNumber: number;
  baseUrl: string;
  onProgress?: (loadedCount: number, totalCount: number, percent: number) => void;
  onReady?: () => void;
}

export class FrameLoader {
  private totalFrames: number;
  private startFrameNumber: number;
  private baseUrl: string;
  private onProgress?: (loadedCount: number, totalCount: number, percent: number) => void;
  private onReady?: () => void;

  private imageCache: Map<number, HTMLImageElement> = new Map();
  private loadingSet: Set<number> = new Set();
  private loadedCount: number = 0;
  private isInitialReady: boolean = false;
  private maxCacheSize: number = 90; // Sliding window size to keep RAM < 70MB

  constructor(options: FrameLoaderOptions) {
    this.totalFrames = options.totalFrames;
    this.startFrameNumber = options.startFrameNumber;
    this.baseUrl = options.baseUrl;
    this.onProgress = options.onProgress;
    this.onReady = options.onReady;
  }

  public getFrameUrl(index: number): string {
    const frameNum = this.startFrameNumber + index;
    return `${this.baseUrl}/Comp%20${frameNum}.jpg`;
  }

  /**
   * Start intelligent multi-stage preloading:
   * Phase 1: Load every 10th frame (60 keyframes) for instant scrub response.
   * Phase 2: Progressively fill in surrounding frames with proximity priority.
   */
  public startPreloading(): void {
    const keyframeStep = 10;
    const initialKeyframes: number[] = [];

    for (let i = 0; i < this.totalFrames; i += keyframeStep) {
      initialKeyframes.push(i);
    }
    // Always include the very first and last frames
    if (!initialKeyframes.includes(0)) initialKeyframes.unshift(0);
    if (!initialKeyframes.includes(this.totalFrames - 1)) initialKeyframes.push(this.totalFrames - 1);

    let keyframesLoaded = 0;
    const totalKeyframes = initialKeyframes.length;

    // Load Phase 1 keyframes with high concurrency
    initialKeyframes.forEach((frameIdx) => {
      this.loadSingleFrame(frameIdx, () => {
        keyframesLoaded++;
        const percent = Math.min(100, Math.round((keyframesLoaded / totalKeyframes) * 100));
        
        if (this.onProgress) {
          this.onProgress(keyframesLoaded, totalKeyframes, percent);
        }

        if (keyframesLoaded >= Math.min(15, totalKeyframes) && !this.isInitialReady) {
          this.isInitialReady = true;
          if (this.onReady) this.onReady();
        }

        // Once initial keyframes finish, start background idle stream
        if (keyframesLoaded === totalKeyframes) {
          this.loadRemainingBackground();
        }
      });
    });
  }

  private loadSingleFrame(index: number, callback?: (img: HTMLImageElement) => void): void {
    if (this.imageCache.has(index)) {
      if (callback) callback(this.imageCache.get(index)!);
      return;
    }
    if (this.loadingSet.has(index)) return;

    this.loadingSet.add(index);
    const img = new Image();
    img.decoding = 'async';

    img.onload = () => {
      this.loadingSet.delete(index);
      this.imageCache.set(index, img);
      this.loadedCount++;
      if (callback) callback(img);
    };

    img.onerror = () => {
      this.loadingSet.delete(index);
      // Fallback silent fail
    };

    img.src = this.getFrameUrl(index);
  }

  /**
   * Request a frame by exact index (0 to totalFrames - 1).
   * If exact frame is cached, returns it.
   * If not, loads it in the background and returns the NEAREST cached frame
   * to guarantee stutter-free 60fps rendering without any white flashes!
   */
  public getFrame(index: number): HTMLImageElement | null {
    const clampedIndex = Math.max(0, Math.min(this.totalFrames - 1, Math.round(index)));

    // Trigger proximity prefetch for ±10 frames around current position
    this.prefetchProximity(clampedIndex);

    if (this.imageCache.has(clampedIndex)) {
      return this.imageCache.get(clampedIndex)!;
    }

    // Load missing target frame immediately
    this.loadSingleFrame(clampedIndex);

    // Find closest loaded frame
    let closestIndex = -1;
    let minDistance = Infinity;

    for (const cachedIndex of this.imageCache.keys()) {
      const dist = Math.abs(cachedIndex - clampedIndex);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = cachedIndex;
      }
    }

    if (closestIndex !== -1) {
      return this.imageCache.get(closestIndex)!;
    }

    return null;
  }

  /**
   * Prioritize loading frames surrounding the user's active playhead
   */
  public prefetchProximity(currentIndex: number): void {
    const radius = 15;
    for (let offset = 1; offset <= radius; offset++) {
      const next = currentIndex + offset;
      const prev = currentIndex - offset;
      if (next < this.totalFrames && !this.imageCache.has(next)) {
        this.loadSingleFrame(next);
      }
      if (prev >= 0 && !this.imageCache.has(prev)) {
        this.loadSingleFrame(prev);
      }
    }

    // LRU purge if cache exceeds maximum allowed size
    if (this.imageCache.size > this.maxCacheSize) {
      for (const [key] of this.imageCache) {
        if (Math.abs(key - currentIndex) > 40) {
          this.imageCache.delete(key);
          if (this.imageCache.size <= this.maxCacheSize) break;
        }
      }
    }
  }

  private loadRemainingBackground(): void {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= this.totalFrames) {
        clearInterval(interval);
        return;
      }
      if (!this.imageCache.has(index)) {
        this.loadSingleFrame(index);
      }
      index++;
    }, 40);
  }

  public getLoadedCount(): number {
    return this.imageCache.size;
  }

  public getTotalFrames(): number {
    return this.totalFrames;
  }
}
