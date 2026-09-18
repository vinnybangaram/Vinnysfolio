// Interactive Systems & Creative Technology Playground for Post-Hero Sections

export class InteractivePlayground {
  constructor() {
    this.init();
  }

  public init(): void {
    // 1. Disciplines Micro-Sandboxes
    this.initTokenWorkbench();
    this.initMotionPlayground();
    this.initJourneyGraph();
    this.initGraphicWorkbench();
    this.initNeuralCanvas();

    // 2. AI Before/After Loupe Comparison Slider
    this.initComparisonSlider();

    // 3. 3D Holographic Tilt & Decryption Scanner for Credential Vault
    this.initHoloVault();

    // 4. Timeline Flight Deck (Quick Era Scrubber)
    this.initTimelineFlightDeck();

    // 5. Tool Stack Combinator (Interactive Workflow Synthesizer)
    this.initStackCombinator();
  }

  // -------------------------------------------------------------
  // 1. TOKEN WORKBENCH (Discipline 03: UI Design & Systems)
  // -------------------------------------------------------------
  private initTokenWorkbench(): void {
    const card = document.getElementById('token-preview-card');
    const blurSlider = document.getElementById('token-slider-blur') as HTMLInputElement | null;
    const radiusSlider = document.getElementById('token-slider-radius') as HTMLInputElement | null;
    const depthSlider = document.getElementById('token-slider-depth') as HTMLInputElement | null;
    const codeOut = document.getElementById('token-code-output');
    const hueBtns = document.querySelectorAll('.token-hue-dot');

    if (!card) return;

    let currentHue = '#38bdf8';

    const updateTokens = () => {
      const blur = blurSlider ? blurSlider.value : '20';
      const radius = radiusSlider ? radiusSlider.value : '16';
      const depth = depthSlider ? depthSlider.value : '2';

      card.style.setProperty('--card-blur', `${blur}px`);
      card.style.setProperty('--card-radius', `${radius}px`);
      card.style.setProperty('--card-accent', currentHue);
      card.style.setProperty('--card-shadow-scale', depth);

      const blurVal = document.getElementById('val-blur');
      const radiusVal = document.getElementById('val-radius');
      const depthVal = document.getElementById('val-depth');
      if (blurVal) blurVal.textContent = `${blur}px`;
      if (radiusVal) radiusVal.textContent = `${radius}px`;
      if (depthVal) depthVal.textContent = `L${depth}`;

      if (codeOut) {
        codeOut.innerHTML = `<code>--glass-blur: ${blur}px; --radius: ${radius}px; --accent: ${currentHue};</code>`;
      }
    };

    blurSlider?.addEventListener('input', updateTokens);
    radiusSlider?.addEventListener('input', updateTokens);
    depthSlider?.addEventListener('input', updateTokens);

    hueBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        hueBtns.forEach((b) => b.classList.remove('active'));
        target.classList.add('active');
        currentHue = target.getAttribute('data-hue') || '#38bdf8';
        updateTokens();
      });
    });

    updateTokens();
  }

  // -------------------------------------------------------------
  // 2. MOTION PHYSICS & SPRING PLAYGROUND (Discipline 04: Motion)
  // -------------------------------------------------------------
  private initMotionPlayground(): void {
    const canvas = document.getElementById('motion-graph-canvas') as HTMLCanvasElement | null;
    const runnerBall = document.getElementById('physics-runner-ball');
    const triggerBtn = document.getElementById('trigger-physics-btn');
    const dampSlider = document.getElementById('motion-slider-damp') as HTMLInputElement | null;
    const stiffSlider = document.getElementById('motion-slider-stiff') as HTMLInputElement | null;
    const presetBtns = document.querySelectorAll('.motion-preset-chip');

    if (!canvas || !runnerBall) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let damping = 18;
    let stiffness = 220;
    let mass = 1.2;
    let animId: number | null = null;

    const drawCurve = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw baseline grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h - 15);
      ctx.lineTo(w, h - 15);
      ctx.moveTo(0, 15);
      ctx.lineTo(w, 15);
      ctx.stroke();

      // Compute damped harmonic oscillator trajectory
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const points: number[] = [];
      let pos = 0;
      let vel = 0;
      const target = 1;
      const dt = 0.016;

      for (let i = 0; i < 120; i++) {
        const springForce = -stiffness * (pos - target);
        const dampForce = -damping * vel;
        const accel = (springForce + dampForce) / mass;
        vel += accel * dt;
        pos += vel * dt;
        points.push(pos);
      }

      points.forEach((val, idx) => {
        const x = (idx / 120) * w;
        const y = h - 15 - val * (h - 35);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Target Line
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(0, 15);
      ctx.lineTo(w, 15);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const runPhysicsAnimation = () => {
      if (animId) cancelAnimationFrame(animId);

      let pos = 0;
      let vel = 0;
      const target = 1;
      const dt = 0.016;
      let step = 0;

      const animate = () => {
        const springForce = -stiffness * (pos - target);
        const dampForce = -damping * vel;
        const accel = (springForce + dampForce) / mass;
        vel += accel * dt;
        pos += vel * dt;
        step++;

        const progress = Math.max(0, Math.min(1.4, pos));
        runnerBall.style.left = `${progress * 82}%`;

        if (step < 120 && (Math.abs(pos - target) > 0.002 || Math.abs(vel) > 0.02)) {
          animId = requestAnimationFrame(animate);
        } else {
          runnerBall.style.left = '82%';
        }
      };

      animate();
    };

    triggerBtn?.addEventListener('click', () => {
      runPhysicsAnimation();
    });

    const updateControls = () => {
      damping = dampSlider ? parseFloat(dampSlider.value) : 18;
      stiffness = stiffSlider ? parseFloat(stiffSlider.value) : 220;
      const dVal = document.getElementById('val-damp');
      const sVal = document.getElementById('val-stiff');
      if (dVal) dVal.textContent = `${damping}`;
      if (sVal) sVal.textContent = `${stiffness}`;
      drawCurve();
    };

    dampSlider?.addEventListener('input', updateControls);
    stiffSlider?.addEventListener('input', updateControls);

    presetBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        presetBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const preset = btn.getAttribute('data-preset');
        if (preset === 'snappy') {
          damping = 24;
          stiffness = 360;
        } else if (preset === 'elastic') {
          damping = 8;
          stiffness = 200;
        } else {
          damping = 28;
          stiffness = 140;
        }
        if (dampSlider) dampSlider.value = `${damping}`;
        if (stiffSlider) stiffSlider.value = `${stiffness}`;
        updateControls();
        runPhysicsAnimation();
      });
    });

    drawCurve();
  }

  // -------------------------------------------------------------
  // 3. UX JOURNEY GRAPH (Discipline 02: UX Design)
  // -------------------------------------------------------------
  private initJourneyGraph(): void {
    const nodes = document.querySelectorAll('.journey-flow-node');
    const readoutTitle = document.getElementById('journey-readout-title');
    const readoutDesc = document.getElementById('journey-readout-desc');
    const readoutMetric = document.getElementById('journey-readout-metric');

    if (!nodes.length) return;

    const data: Record<string, { title: string; desc: string; metric: string }> = {
      intent: {
        title: '01 // INTENT DETECTION & CONTEXT',
        desc: 'Capturing real-time operator queries, telemetry triggers, or map interactions without cognitive friction.',
        metric: 'LATENCY: <8ms · RECOG: 99.4%'
      },
      spatial: {
        title: '02 // SPATIAL & TELEMATICS GATEWAY',
        desc: 'Aggregating GeoJSON coordinate streams, asset tracking telemetry, and layer hierarchies at 60 FPS.',
        metric: 'THROUGHPUT: 45K pts/sec · LOSS: 0%'
      },
      cognition: {
        title: '03 // COGNITIVE ERGONOMICS FILTER',
        desc: 'Eliminating visual noise, clustering high-density markers, and prioritizing mission-critical alerts.',
        metric: 'CLUTTER REDUCTION: -72%'
      },
      decision: {
        title: '04 // ACTION DISPATCH & REACTION',
        desc: 'Instant operational dispatch, automated vehicle routing, and high-clarity status confirmation.',
        metric: 'RESPONSE TIME: <120ms'
      }
    };

    nodes.forEach((node) => {
      node.addEventListener('click', () => {
        nodes.forEach((n) => n.classList.remove('active'));
        node.classList.add('active');
        const key = node.getAttribute('data-node') || 'intent';
        const info = data[key];
        if (info && readoutTitle && readoutDesc && readoutMetric) {
          readoutTitle.textContent = info.title;
          readoutDesc.textContent = info.desc;
          readoutMetric.textContent = info.metric;
        }
      });
    });
  }

  // -------------------------------------------------------------
  // 4. GRAPHIC GRID RULER (Discipline 01: Graphic Design)
  // -------------------------------------------------------------
  private initGraphicWorkbench(): void {
    const gridColsSlider = document.getElementById('grid-slider-cols') as HTMLInputElement | null;
    const previewBox = document.getElementById('grid-demo-columns');
    const colsLabel = document.getElementById('val-cols');
    const phiToggle = document.getElementById('toggle-phi-guide');

    if (!previewBox) return;

    const updateGrid = () => {
      const cols = gridColsSlider ? parseInt(gridColsSlider.value, 10) : 6;
      if (colsLabel) colsLabel.textContent = `${cols} cols`;

      previewBox.innerHTML = '';
      for (let i = 0; i < cols; i++) {
        const col = document.createElement('div');
        col.className = 'grid-demo-col';
        col.innerHTML = `<span class="col-idx">${i + 1}</span>`;
        previewBox.appendChild(col);
      }
    };

    gridColsSlider?.addEventListener('input', updateGrid);

    phiToggle?.addEventListener('click', () => {
      phiToggle.classList.toggle('active');
      previewBox.classList.toggle('show-golden-ratio');
    });

    updateGrid();
  }

  // -------------------------------------------------------------
  // 5. NEURAL PARTICLE CANVAS (Discipline 05: AI Design)
  // -------------------------------------------------------------
  private initNeuralCanvas(): void {
    const canvas = document.getElementById('neural-interactive-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth || 280;
    canvas.height = canvas.offsetHeight || 140;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
    }

    const nodes: Node[] = [];
    const colors = ['#38bdf8', '#818cf8', '#fbbf24', '#34d399'];
    const count = 28;

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        r: Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let mouseX = -999;
    let mouseY = -999;

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      mouseX = -999;
      mouseY = -999;
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / 80 * 0.8})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & draw nodes
      nodes.forEach((n) => {
        if (mouseX > 0) {
          const mdx = n.x - mouseX;
          const mdy = n.y - mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 70) {
            n.vx += (mdx / mdist) * 0.4;
            n.vy += (mdy / mdist) * 0.4;
          }
        }

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        n.vx *= 0.98;
        n.vy *= 0.98;

        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(render);
    };

    render();
  }

  // -------------------------------------------------------------
  // 6. BEFORE/AFTER AI SPLIT SLIDER & LOUPE (Section: AI Design)
  // -------------------------------------------------------------
  private initComparisonSlider(): void {
    const container = document.getElementById('ai-comparison-container');
    const divider = document.getElementById('ai-slider-divider');
    const rightSide = document.getElementById('ai-slider-restored');
    const loupe = document.getElementById('ai-slider-loupe');

    if (!container || !divider || !rightSide) return;

    let isDragging = false;

    const setSliderPosition = (xPos: number) => {
      const rect = container.getBoundingClientRect();
      const offsetX = Math.max(0, Math.min(rect.width, xPos - rect.left));
      const percent = (offsetX / rect.width) * 100;

      divider.style.left = `${percent}%`;
      rightSide.style.clipPath = `polygon(${percent}% 0, 100% 0, 100% 100%, ${percent}% 100%)`;

      const splitPct = document.getElementById('ai-split-percent');
      if (splitPct) splitPct.textContent = `${Math.round(percent)}% CURTAIN`;
    };

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        setSliderPosition(e.clientX);
      }

      if (loupe) {
        const rect = container.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          loupe.style.opacity = '1';
          const lx = e.clientX - rect.left;
          const ly = e.clientY - rect.top;
          loupe.style.transform = `translate(${lx - 40}px, ${ly - 40}px)`;

          const bgX = (lx / rect.width) * 100;
          const bgY = (ly / rect.height) * 100;
          loupe.style.backgroundPosition = `${bgX}% ${bgY}%`;
        } else {
          loupe.style.opacity = '0';
        }
      }
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    container.addEventListener('touchmove', (e) => {
      if (e.touches[0]) {
        setSliderPosition(e.touches[0].clientX);
      }
    });

    const btnRaw = document.getElementById('btn-show-raw');
    const btnSplit = document.getElementById('btn-show-split');
    const btnRestored = document.getElementById('btn-show-restored');

    btnRaw?.addEventListener('click', () => {
      const rect = container.getBoundingClientRect();
      setSliderPosition(rect.left + rect.width * 0.95);
    });

    btnSplit?.addEventListener('click', () => {
      const rect = container.getBoundingClientRect();
      setSliderPosition(rect.left + rect.width * 0.5);
    });

    btnRestored?.addEventListener('click', () => {
      const rect = container.getBoundingClientRect();
      setSliderPosition(rect.left + rect.width * 0.05);
    });
  }

  // -------------------------------------------------------------
  // 7. 3D HOLOGRAPHIC TILT CARD & MATRIX DECRYPTOR (Credential Vault)
  // -------------------------------------------------------------
  private initHoloVault(): void {
    const vault = document.getElementById('credential-vault-card');
    const foil = document.getElementById('vault-holographic-foil');
    const verifyBtn = document.getElementById('btn-decrypt-record');
    const codeTag = document.getElementById('vault-credential-code');

    if (!vault) return;

    vault.addEventListener('mousemove', (e) => {
      const rect = vault.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      vault.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

      if (foil) {
        const sheenX = (x / rect.width) * 100;
        const sheenY = (y / rect.height) * 100;
        foil.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.16) 0%, rgba(56,189,248,0.12) 35%, rgba(192,132,252,0.15) 65%, transparent 100%)`;
      }
    });

    vault.addEventListener('mouseleave', () => {
      vault.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      if (foil) {
        foil.style.background = 'none';
      }
    });

    const realCode = 'rnu386y3s85a';
    const glyphs = '0123456789ABCDEF!@#$%&*';

    verifyBtn?.addEventListener('click', () => {
      if (!codeTag) return;
      let iterations = 0;
      const interval = setInterval(() => {
        codeTag.innerText = realCode
          .split('')
          .map((char, idx) => {
            if (idx < iterations) return realCode[idx];
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('');

        if (iterations >= realCode.length) {
          clearInterval(interval);
          codeTag.classList.add('decrypted-flash');
          setTimeout(() => codeTag.classList.remove('decrypted-flash'), 1200);
        }
        iterations += 1 / 2;
      }, 40);
    });
  }

  // -------------------------------------------------------------
  // 8. TIMELINE FLIGHT DECK (Quick-Warp Scrubber)
  // -------------------------------------------------------------
  private initTimelineFlightDeck(): void {
    const eraBtns = document.querySelectorAll('.timeline-era-btn');

    eraBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        eraBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.getAttribute('data-target-node');
        if (!targetId) return;

        const targetNode = document.getElementById(targetId);
        if (targetNode) {
          targetNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetNode.classList.remove('warp-spotlight');
          void targetNode.offsetWidth;
          targetNode.classList.add('warp-spotlight');
        }
      });
    });
  }

  // -------------------------------------------------------------
  // 9. TOOL STACK COMBINATOR (Interactive Workflow Synthesizer)
  // -------------------------------------------------------------
  private initStackCombinator(): void {
    const toolItems = document.querySelectorAll('.tool-pill-item');
    const resultBox = document.getElementById('stack-combinator-result');
    const resultTitle = document.getElementById('stack-combo-title');
    const resultDesc = document.getElementById('stack-combo-desc');
    const resultPills = document.getElementById('stack-combo-pills');
    const clearBtn = document.getElementById('btn-clear-stack');

    if (!toolItems.length || !resultBox) return;

    const selectedTools: string[] = [];

    const synergies: Record<string, { title: string; desc: string }> = {
      'figma+claude': {
        title: '⚡ GENERATIVE SPATIAL UI PROTOTYPING',
        desc: 'Bridging high-fidelity wireframes in Figma with Claude 3.7 reasoning to rapidly synthesize interactive React/TypeScript component trees.'
      },
      'figma+three.js': {
        title: '🌐 3D SPATIAL UI & WEBGL ARCHITECTURE',
        desc: 'Translating 2D spatial layouts into interactive Three.js 3D viewport coordinate layers with live shader reflections.'
      },
      'after effects+illustrator': {
        title: '🎬 KINETIC BRAND & VECTOR MOTION SYSTEMS',
        desc: 'Crafting precision vector iconography in Illustrator and engineering mathematical Bézier choreography in After Effects.'
      },
      'react+typescript': {
        title: '💻 PRODUCTION DESIGN TOKEN ARCHITECTURE',
        desc: 'Architecting rock-solid TypeScript design systems with strict token contracts, WCAG AAA accessibility, and zero-runtime CSS variables.'
      },
      'chatgpt+claude': {
        title: '🧠 MULTI-MODEL REASONING ENSEMBLE',
        desc: 'Orchestrating multi-turn prompt architectures for edge-case user discovery, heuristic evaluation, and competitive UX benchmarking.'
      }
    };

    const updateCombinator = () => {
      if (selectedTools.length === 0) {
        resultBox.classList.remove('active');
        return;
      }

      resultBox.classList.add('active');

      if (resultPills) {
        resultPills.innerHTML = selectedTools
          .map((t) => `<span class="active-stack-token">${t}</span>`)
          .join('');
      }

      let matched = false;
      for (const key in synergies) {
        const parts = key.split('+');
        const hasAll = parts.every((p) =>
          selectedTools.some((st) => st.toLowerCase().includes(p))
        );
        if (hasAll) {
          if (resultTitle) resultTitle.textContent = synergies[key].title;
          if (resultDesc) resultDesc.textContent = synergies[key].desc;
          matched = true;
          break;
        }
      }

      if (!matched && resultTitle && resultDesc) {
        resultTitle.textContent = `✦ CUSTOM WORKFLOW: ${selectedTools.slice(0, 3).join(' + ')}`;
        resultDesc.textContent = `Vinodh seamlessly integrates ${selectedTools.join(', ')} into enterprise GIS telemetry, UX design engineering, and generative product cycles.`;
      }
    };

    toolItems.forEach((item) => {
      item.addEventListener('click', () => {
        const nameEl = item.querySelector('.tool-name');
        const name = nameEl?.textContent?.trim() || '';
        if (!name) return;

        const idx = selectedTools.indexOf(name);
        if (idx >= 0) {
          selectedTools.splice(idx, 1);
          item.classList.remove('stack-selected');
        } else {
          if (selectedTools.length >= 3) {
            const removed = selectedTools.shift();
            toolItems.forEach((ti) => {
              if (ti.querySelector('.tool-name')?.textContent?.trim() === removed) {
                ti.classList.remove('stack-selected');
              }
            });
          }
          selectedTools.push(name);
          item.classList.add('stack-selected');
        }

        updateCombinator();
      });
    });

    clearBtn?.addEventListener('click', () => {
      selectedTools.length = 0;
      toolItems.forEach((ti) => ti.classList.remove('stack-selected'));
      updateCombinator();
    });
  }
}
