export class HUDSystem {
  private svg: SVGSVGElement;
  private telemetryFrame: HTMLElement | null;
  private telemetryVec: HTMLElement | null;
  private telemetryFps: HTMLElement | null;
  private lastFpsUpdate: number = performance.now();
  private frameCounter: number = 0;

  constructor(svgElement: SVGSVGElement) {
    this.svg = svgElement;
    this.telemetryFrame = document.getElementById('telemetry-frame');
    this.telemetryVec = document.getElementById('telemetry-vec');
    this.telemetryFps = document.getElementById('telemetry-fps');

    this.renderStaticGridLines();
    window.addEventListener('resize', this.renderStaticGridLines.bind(this));
  }

  public renderStaticGridLines(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    this.svg.innerHTML = `
      <defs>
        <radialGradient id="pulse-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(56, 189, 248, 0)" />
          <stop offset="80%" stop-color="rgba(56, 189, 248, 0.4)" />
          <stop offset="100%" stop-color="rgba(56, 189, 248, 0)" />
        </radialGradient>
      </defs>

      <!-- Center Crosshair Reference -->
      <g stroke="rgba(255, 255, 255, 0.12)" stroke-width="1">
        <line x1="${width / 2 - 20}" y1="${height / 2}" x2="${width / 2 + 20}" y2="${height / 2}" />
        <line x1="${width / 2}" y1="${height / 2 - 20}" x2="${width / 2}" y2="${height / 2 + 20}" />
        <circle cx="${width / 2}" cy="${height / 2}" r="32" fill="none" stroke="rgba(56, 189, 248, 0.18)" stroke-dasharray="3 3" />
      </g>

      <!-- Precision Corner Alignment Marks -->
      <g stroke="#38bdf8" stroke-width="1.5" opacity="0.65">
        <!-- Top Left -->
        <path d="M 40 55 L 40 40 L 55 40" fill="none" />
        <!-- Top Right -->
        <path d="M ${width - 55} 40 L ${width - 40} 40 L ${width - 40} 55" fill="none" />
        <!-- Bottom Left -->
        <path d="M 40 ${height - 55} L 40 ${height - 40} L 55 ${height - 40}" fill="none" />
        <!-- Bottom Right -->
        <path d="M ${width - 55} ${height - 40} L ${width - 40} ${height - 40} L ${width - 40} ${height - 55}" fill="none" />
      </g>

      <!-- Subtle Floor Perspective Horizon Line -->
      <line x1="0" y1="${height * 0.72}" x2="${width}" y2="${height * 0.72}" stroke="rgba(56, 189, 248, 0.08)" stroke-width="1" stroke-dasharray="4 8" />

      <!-- Floor Radial Pulse Rings (at feet position) -->
      <g id="floor-pulse-group">
        <ellipse cx="${width / 2}" cy="${height * 0.78}" rx="140" ry="24" fill="none" stroke="rgba(56, 189, 248, 0.22)" stroke-width="1.5" />
        <ellipse cx="${width / 2}" cy="${height * 0.78}" rx="240" ry="42" fill="none" stroke="rgba(56, 189, 248, 0.12)" stroke-width="1" stroke-dasharray="6 4" />
      </g>
    `;
  }

  public updateTelemetry(frameNum: number, progress: number): void {
    if (this.telemetryFrame) {
      this.telemetryFrame.textContent = `${frameNum} / 1598`;
    }

    if (this.telemetryVec) {
      const x = (Math.sin(progress * Math.PI * 2) * 0.85).toFixed(2);
      const y = (progress * 1.5).toFixed(2);
      const z = (Math.cos(progress * Math.PI) * 0.5).toFixed(2);
      this.telemetryVec.textContent = `[${x}, ${y}, ${z}]`;
    }

    // Measure FPS
    this.frameCounter++;
    const now = performance.now();
    if (now - this.lastFpsUpdate >= 500) {
      const fps = ((this.frameCounter * 1000) / (now - this.lastFpsUpdate)).toFixed(1);
      if (this.telemetryFps) this.telemetryFps.textContent = fps;
      this.lastFpsUpdate = now;
      this.frameCounter = 0;
    }
  }
}
