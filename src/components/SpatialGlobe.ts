// 3D Spatial GIS Digital Twin & Telemetry Cockpit (Three.js)
import * as THREE from 'three';

export interface SpatialHotspot {
  id: string;
  name: string;
  category: string;
  lat: number;
  lon: number;
  metric: string;
  summary: string;
  tech: string[];
}

export class SpatialGlobe {
  private container: HTMLElement | null = null;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private globeGroup!: THREE.Group;
  private particleCloud!: THREE.Points;
  private atmosphereMesh!: THREE.Mesh;
  private arcGroup!: THREE.Group;
  private markerGroup!: THREE.Group;
  private animId: number | null = null;

  // Interaction & Orbit
  private isDragging: boolean = false;
  private previousMousePosition = { x: 0, y: 0 };
  private rotationVelocity = { x: 0.0015, y: 0.0005 };
  private activeLayer: 'all' | 'satellite' | 'fleet' | 'lidar' = 'all';

  // Hotspot data matching Vinodh's actual flagship enterprise GIS platforms
  private hotspots: SpatialHotspot[] = [
    {
      id: 'smartmap-3d',
      name: 'SmartMap-3D Platform',
      category: 'ENTERPRISE 3D GIS',
      lat: 24.7136, // Riyadh
      lon: 46.6753,
      metric: '100K+ VECTORS @ 60FPS',
      summary: 'High-performance 3D spatial terrain slicing, elevation gradient modeling, and municipal urban digital twins.',
      tech: ['WebGL', 'Calcite Design', 'Spatial UX', 'Cesium']
    },
    {
      id: 'smartgeofleet',
      name: 'SmartGeoFleet Telematics',
      category: 'IOT TELEMATICS HUB',
      lat: 25.2048, // Dubai
      lon: 55.2708,
      metric: '15,000+ VEHICLES LIVE',
      summary: 'Real-time vehicle tracking, geofence intrusion alerts, driver behavior scoring, and fleet route dispatch.',
      tech: ['IoT Streaming', 'Mapbox GL', 'Reactive HUD', 'WebSockets']
    },
    {
      id: 'geovision-ai',
      name: 'GeoVision Vision Suite',
      category: 'SATELLITE COMPUTER VISION',
      lat: 17.3850, // Hyderabad
      lon: 78.4867,
      metric: 'SUB-SECOND ANOMALY DETECTION',
      summary: 'Automated municipal infrastructure shift detection and structural anomaly audits using deep learning models.',
      tech: ['PyTorch', 'Inference Scrubber', 'Dual Loupe', 'Temporal GIS']
    },
    {
      id: 'spatial-us',
      name: 'Global Spatial Cloud Gateway',
      category: 'CLOUD DATA PIPELINE',
      lat: 37.7749, // Silicon Valley
      lon: -122.4194,
      metric: 'ZERO-LATENCY SYNC',
      summary: 'Distributed microservice telemetry mesh delivering low-latency GeoJSON streams to command dashboards.',
      tech: ['GeoJSON API', 'Vector Tiles', 'Distributed Mesh']
    },
    {
      id: 'spatial-eu',
      name: 'European Spatial Standards Hub',
      category: 'COMPLIANCE & SYSTEM TOKENS',
      lat: 51.5074, // London
      lon: -0.1278,
      metric: 'WCAG AAA CERTIFIED',
      summary: 'Harmonized spatial design token library enforcing strict contrast and ergonomic spatial workflows.',
      tech: ['Design Tokens', 'Accessibility', 'Figma Libraries']
    }
  ];

  constructor(containerId: string) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.init();
  }

  private init(): void {
    if (!this.container) return;

    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 450;

    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 180;

    // 2. Renderer with transparent background and antialiasing
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // 3. Globe Group
    this.globeGroup = new THREE.Group();
    this.scene.add(this.globeGroup);

    // 4. Build 3D Holographic Earth Sphere
    this.buildGlobeSphere();
    this.buildParticleCloud();
    this.buildAtmosphereHalo();
    this.buildFlightArcs();
    this.buildHotspotMarkers();

    // 5. Mount Controls & Listeners
    this.initMouseControls();
    this.initLayerControls();
    this.initResizeListener();

    // 6. Start Render Loop
    this.animate();
  }

  private buildGlobeSphere(): void {
    const radius = 60;
    // Core dark metallic sphere
    const coreGeo = new THREE.SphereGeometry(radius - 0.5, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x05080c,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.globeGroup.add(coreMesh);

    // Holographic wireframe grid
    const wireGeo = new THREE.SphereGeometry(radius, 32, 32);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    this.globeGroup.add(wireMesh);

    // Latitude & Longitude Key Rings (Equator, Prime Meridian, Tropics)
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35
    });

    const equatorGeo = new THREE.BufferGeometry();
    const ringPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      ringPoints.push(new THREE.Vector3(Math.cos(theta) * (radius + 0.2), 0, Math.sin(theta) * (radius + 0.2)));
    }
    equatorGeo.setFromPoints(ringPoints);
    const equator = new THREE.Line(equatorGeo, ringMat);
    this.globeGroup.add(equator);
  }

  private buildParticleCloud(): void {
    const radius = 60.5;
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color(0x38bdf8);
    const accentColor = new THREE.Color(0x818cf8);
    const goldColor = new THREE.Color(0xfbbf24);

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution for uniform spherical coverage
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      let c = baseColor;
      if (i % 7 === 0) c = goldColor;
      else if (i % 3 === 0) c = accentColor;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    this.particleCloud = new THREE.Points(geometry, material);
    this.globeGroup.add(this.particleCloud);
  }

  private buildAtmosphereHalo(): void {
    const haloGeo = new THREE.SphereGeometry(68, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    this.atmosphereMesh = new THREE.Mesh(haloGeo, haloMat);
    this.scene.add(this.atmosphereMesh);
  }

  private latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }

  private buildFlightArcs(): void {
    this.arcGroup = new THREE.Group();
    this.globeGroup.add(this.arcGroup);

    // Arcs between Riyadh <-> Dubai, Riyadh <-> Hyderabad, Riyadh <-> London, Dubai <-> Silicon Valley
    const pairs: [number, number][] = [
      [0, 1], // Riyadh -> Dubai
      [0, 2], // Riyadh -> Hyderabad
      [0, 4], // Riyadh -> London
      [1, 3], // Dubai -> Silicon Valley
      [2, 4]  // Hyderabad -> London
    ];

    pairs.forEach(([fromIdx, toIdx]) => {
      const from = this.hotspots[fromIdx];
      const to = this.hotspots[toIdx];
      if (!from || !to) return;

      const p1 = this.latLonToVector3(from.lat, from.lon, 61);
      const p2 = this.latLonToVector3(to.lat, to.lon, 61);

      // Compute midpoint arc elevation
      const distance = p1.distanceTo(p2);
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const midLength = mid.length();
      mid.normalize();
      mid.multiplyScalar(midLength + distance * 0.28); // elevated arc

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });

      const line = new THREE.Line(geometry, material);
      this.arcGroup.add(line);
    });
  }

  private buildHotspotMarkers(): void {
    this.markerGroup = new THREE.Group();
    this.globeGroup.add(this.markerGroup);

    this.hotspots.forEach((spot) => {
      const pos = this.latLonToVector3(spot.lat, spot.lon, 61.5);

      // Marker Stem & Beacon
      const markerObj = new THREE.Group();
      markerObj.position.copy(pos);
      markerObj.lookAt(pos.clone().multiplyScalar(2)); // orient outwards

      // Outer Pulsing Ring
      const ringGeo = new THREE.RingGeometry(1.2, 1.8, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      markerObj.add(ring);

      // Glowing Center Dot
      const dotGeo = new THREE.CircleGeometry(0.8, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        side: THREE.DoubleSide
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      markerObj.add(dot);

      // Attach data to marker
      markerObj.userData = spot;
      this.markerGroup.add(markerObj);
    });
  }

  private initMouseControls(): void {
    if (!this.container) return;

    this.container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.globeGroup.rotation.y += deltaX * 0.005;
      this.globeGroup.rotation.x += deltaY * 0.005;

      this.rotationVelocity = {
        x: deltaY * 0.001,
        y: deltaX * 0.001
      };

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch support for mobile devices
    this.container.addEventListener('touchstart', (e) => {
      if (e.touches[0]) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || !e.touches[0]) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.globeGroup.rotation.y += deltaX * 0.005;
      this.globeGroup.rotation.x += deltaY * 0.005;

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Click on Hotspot Markers with Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    this.container.addEventListener('click', (e) => {
      const rect = this.container!.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(this.markerGroup.children, true);

      if (intersects.length > 0) {
        let root = intersects[0].object;
        while (root.parent && root.parent !== this.markerGroup) {
          root = root.parent;
        }
        if (root.userData && root.userData.name) {
          this.displayHotspotTelemetry(root.userData as SpatialHotspot);
        }
      }
    });
  }

  public displayHotspotTelemetry(spot: SpatialHotspot): void {
    const card = document.getElementById('globe-telemetry-hud');
    if (!card) return;

    card.classList.remove('active');
    void card.offsetWidth; // force reflow
    card.classList.add('active');

    const titleEl = document.getElementById('globe-spot-title');
    const catEl = document.getElementById('globe-spot-cat');
    const metricEl = document.getElementById('globe-spot-metric');
    const descEl = document.getElementById('globe-spot-desc');
    const techEl = document.getElementById('globe-spot-tech');

    if (titleEl) titleEl.textContent = spot.name;
    if (catEl) catEl.textContent = spot.category;
    if (metricEl) metricEl.textContent = spot.metric;
    if (descEl) descEl.textContent = spot.summary;
    if (techEl) {
      techEl.innerHTML = spot.tech
        .map((t) => `<span class="spot-tech-chip">${t}</span>`)
        .join('');
    }
  }

  private initLayerControls(): void {
    const layerBtns = document.querySelectorAll('.globe-layer-btn');
    layerBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        layerBtns.forEach((b) => b.classList.remove('active'));
        const target = e.currentTarget as HTMLElement;
        target.classList.add('active');
        const layer = target.getAttribute('data-layer') as 'all' | 'satellite' | 'fleet' | 'lidar';
        this.setLayer(layer);
      });
    });
  }

  public setLayer(layer: 'all' | 'satellite' | 'fleet' | 'lidar'): void {
    this.activeLayer = layer;
    const pMat = this.particleCloud.material as THREE.PointsMaterial;
    if (layer === 'satellite') {
      this.arcGroup.visible = true;
      this.markerGroup.visible = true;
      pMat.opacity = 0.5;
    } else if (layer === 'fleet') {
      this.arcGroup.visible = true;
      this.markerGroup.visible = true;
      pMat.opacity = 0.9;
    } else if (layer === 'lidar') {
      this.arcGroup.visible = false;
      this.markerGroup.visible = true;
      pMat.opacity = 1.0;
    } else {
      this.arcGroup.visible = true;
      this.markerGroup.visible = true;
      pMat.opacity = 0.85;
    }
  }

  private initResizeListener(): void {
    window.addEventListener('resize', () => {
      if (!this.container) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      if (width === 0 || height === 0) return;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  private animate(): void {
    this.animId = requestAnimationFrame(this.animate.bind(this));

    // Slow ambient autorotation when user is not dragging
    if (!this.isDragging) {
      this.globeGroup.rotation.y += this.rotationVelocity.y;
      this.globeGroup.rotation.x += this.rotationVelocity.x;

      // Dampen velocity back to gentle cruise speed
      this.rotationVelocity.y += (0.0012 - this.rotationVelocity.y) * 0.05;
      this.rotationVelocity.x += (0.0003 - this.rotationVelocity.x) * 0.05;
    }

    // Pulse hotspot marker rings
    const time = performance.now() * 0.003;
    this.markerGroup.children.forEach((marker, idx) => {
      const ring = marker.children[0] as THREE.Mesh;
      if (ring) {
        const scale = 1 + Math.sin(time + idx) * 0.25;
        ring.scale.set(scale, scale, 1);
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  public destroy(): void {
    if (this.animId) cancelAnimationFrame(this.animId);
    this.renderer.dispose();
  }
}
