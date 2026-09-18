// 3D Orbital Competency Galaxy & Reactive Kinetic Skills System
import { PROFILE_DATA } from '../data/profileData';

interface OrbitalNode {
  name: string;
  category: string;
  orbitRadius: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  screenR: number;
  highlighted: boolean;
}

export class OrbitalSkillGalaxy {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private nodes: OrbitalNode[] = [];
  private animId: number | null = null;
  private activeCategory: string = 'ALL';

  private mouse = { x: -999, y: -999 };
  private hoveredNode: OrbitalNode | null = null;
  private tilt = { x: 0, y: 0, targetX: 0, targetY: 0 };

  private categoryColors: Record<string, string> = {
    'UI & UX DESIGN': '#38bdf8',
    'MOTION & INTERACTION': '#c084fc',
    'FRONT-END & CREATIVE TECH': '#34d399',
    'AI & FRONTIER WORKFLOWS': '#fbbf24',
    'GEOSPATIAL & PRODUCT SYSTEMS': '#38bdf8',
    'DESIGN LEADERSHIP & OPS': '#f43f5e'
  };

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;
    this.init();
  }

  private init(): void {
    if (!this.canvas) return;
    this.resize();
    this.buildNodes();
    this.initListeners();
    this.animate();
  }

  private resize(): void {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    if (!parent) return;
    this.canvas.width = parent.clientWidth || 800;
    this.canvas.height = 480;
  }

  private buildNodes(): void {
    this.nodes = [];
    const categories = PROFILE_DATA.skills;
    const ringRadii = [60, 110, 160, 210, 250, 280];

    categories.forEach((catGroup, catIdx) => {
      const radius = ringRadii[catIdx % ringRadii.length] || 150;
      const color = this.categoryColors[catGroup.category] || '#38bdf8';
      const count = catGroup.skills.length;

      catGroup.skills.forEach((skill, skillIdx) => {
        const angle = (skillIdx / count) * Math.PI * 2 + catIdx * 0.4;
        const speed = (0.003 + (catIdx % 3) * 0.001) * (catIdx % 2 === 0 ? 1 : -1);

        this.nodes.push({
          name: skill,
          category: catGroup.category,
          orbitRadius: radius + (Math.random() - 0.5) * 15,
          angle: angle,
          speed: speed,
          size: Math.random() * 2 + 3,
          color: color,
          x: 0,
          y: 0,
          z: 0,
          screenX: 0,
          screenY: 0,
          screenR: 0,
          highlighted: false
        });
      });
    });
  }

  private initListeners(): void {
    if (!this.canvas) return;

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas!.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;

      // 3D Perspective Tilt on Mouse
      const centerX = this.canvas!.width / 2;
      const centerY = this.canvas!.height / 2;
      this.tilt.targetX = (this.mouse.y - centerY) * 0.0008;
      this.tilt.targetY = (this.mouse.x - centerX) * 0.0008;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -999;
      this.mouse.y = -999;
      this.tilt.targetX = 0;
      this.tilt.targetY = 0;
      this.hoveredNode = null;
      this.updateHUD(null);
    });

    window.addEventListener('resize', () => {
      this.resize();
    });

    // Category Filter Buttons
    const filterBtns = document.querySelectorAll('.skill-filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const cat = target.getAttribute('data-category') || 'ALL';
        this.filterCategory(cat);
      });
    });
  }

  public filterCategory(category: string): void {
    this.activeCategory = category;
    this.nodes.forEach((n) => {
      n.highlighted = category === 'ALL' || n.category === category;
    });
  }

  private animate(): void {
    this.animId = requestAnimationFrame(this.animate.bind(this));
    if (!this.canvas || !this.ctx) return;

    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // Smooth tilt lerp
    this.tilt.x += (this.tilt.targetX - this.tilt.x) * 0.08;
    this.tilt.y += (this.tilt.targetY - this.tilt.y) * 0.08;

    // 1. Draw Central Core Beacon (VK Intelligence)
    ctx.save();
    ctx.translate(cx, cy);

    // Orbital Ellipse Guide Rings
    const ringRadii = [60, 110, 160, 210, 250, 280];
    ringRadii.forEach((r, idx) => {
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r * 0.45, this.tilt.y, 0, Math.PI * 2);
      ctx.strokeStyle = idx % 2 === 0 ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Central Core Pulse
    const time = performance.now() * 0.002;
    const coreGlow = 14 + Math.sin(time) * 4;

    const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, coreGlow * 2);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
    grad.addColorStop(0.5, 'rgba(129, 140, 248, 0.4)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, coreGlow * 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Project Nodes in 3D Elliptical Space
    let closestNode: OrbitalNode | null = null;
    let closestDist = 20; // 20px hit test radius

    for (const node of this.nodes) {
      node.angle += node.speed;

      // 3D coordinates on orbital plane with tilt
      const ox = Math.cos(node.angle) * node.orbitRadius;
      const oz = Math.sin(node.angle) * node.orbitRadius;
      const oy = oz * 0.45; // compressed perspective

      // Apply 3D perspective rotation
      const cosY = Math.cos(this.tilt.y);
      const sinY = Math.sin(this.tilt.y);
      const rx = ox * cosY - oz * sinY;
      const rz = ox * sinY + oz * cosY;

      // Depth scaling
      const scale = 250 / (250 + rz * 0.5);
      const screenX = cx + rx * scale;
      const screenY = cy + oy * scale;
      const screenR = node.size * scale;

      node.screenX = screenX;
      node.screenY = screenY;
      node.screenR = screenR;

      // Hit testing against mouse
      if (this.mouse.x > 0) {
        const dx = screenX - this.mouse.x;
        const dy = screenY - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closestDist) {
          closestDist = dist;
          closestNode = node;
        }
      }

      // Determine opacity based on category filter & depth
      const isFiltered = this.activeCategory === 'ALL' || node.category === this.activeCategory;
      const depthOpacity = Math.max(0.2, Math.min(1, (scale - 0.5) * 1.5));
      const finalAlpha = isFiltered ? depthOpacity : depthOpacity * 0.15;

      // Draw Connection Filament to Core if active/filtered
      if (isFiltered && Math.random() > 0.85) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(screenX, screenY);
        ctx.strokeStyle = `rgba(56, 189, 248, ${finalAlpha * 0.25})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw Orbital Node
      ctx.beginPath();
      ctx.arc(screenX, screenY, screenR, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.globalAlpha = finalAlpha;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = isFiltered ? 10 : 0;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Draw subtle label for nodes in foreground (high scale)
      if (isFiltered && scale > 1.05) {
        ctx.font = '500 9px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText(node.name, screenX + screenR + 4, screenY + 3);
      }
    }

    // 3. Hovered Node Inspection Spotlight
    if (closestNode) {
      this.hoveredNode = closestNode;
      this.updateHUD(closestNode);

      // Draw Reticle around hovered node
      ctx.save();
      ctx.beginPath();
      ctx.arc(closestNode.screenX, closestNode.screenY, closestNode.screenR + 8, 0, Math.PI * 2);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();

      // Energy line to center
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(closestNode.screenX, closestNode.screenY);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.stroke();

      // Prominent Label
      ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.fillText(closestNode.name, closestNode.screenX + 16, closestNode.screenY - 4);

      ctx.font = '600 9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(closestNode.category, closestNode.screenX + 16, closestNode.screenY + 10);
      ctx.restore();
    }
  }

  private updateHUD(node: OrbitalNode | null): void {
    const hud = document.getElementById('galaxy-skill-hud');
    if (!hud) return;

    if (!node) {
      hud.classList.remove('active');
      return;
    }

    hud.classList.add('active');
    const nameEl = document.getElementById('galaxy-node-name');
    const catEl = document.getElementById('galaxy-node-cat');
    const metricEl = document.getElementById('galaxy-node-metric');

    if (nameEl) nameEl.textContent = node.name;
    if (catEl) catEl.textContent = node.category;
    if (metricEl) metricEl.textContent = 'STATUS: ACTIVE IN PRODUCTION';
  }

  public destroy(): void {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}
