import * as THREE from 'three';

export class ThreeScene {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private particles: THREE.Points | null = null;
  private floorGrid: THREE.GridHelper | null = null;
  private floorMesh: THREE.Mesh | null = null;
  private architecturalPillars: THREE.Group = new THREE.Group();
  private spotlightMesh: THREE.Mesh | null = null;
  private animFrameId: number | null = null;

  private targetCameraZ: number = 7;
  private currentCameraZ: number = 7;
  private currentProgress: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    // Renderer with high performance and smooth pixel ratio
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x06080b, 0.045);

    // Perspective Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 1.4, 7);

    this.setupLighting();
    this.setupFloor();
    this.setupArchitecture();
    this.setupParticles();

    window.addEventListener('resize', this.onResize.bind(this));
    this.animate();
  }

  private setupLighting(): void {
    // Soft Ambient Light
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 0.35);
    this.scene.add(ambientLight);

    // Main Overhead Volumetric Spotlight matching Vinodh's video
    const spotLight = new THREE.SpotLight(0xa5f3fc, 4);
    spotLight.position.set(0, 10, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.8;
    spotLight.decay = 1.5;
    spotLight.distance = 25;
    this.scene.add(spotLight);

    // Volumetric Light Cone Illusion Mesh
    const coneGeo = new THREE.CylinderGeometry(0.5, 3.5, 9, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.055,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.spotlightMesh = new THREE.Mesh(coneGeo, coneMat);
    this.spotlightMesh.position.set(0, 4.5, -0.5);
    this.scene.add(this.spotlightMesh);
  }

  private setupFloor(): void {
    // Deep Matte Floor Plane
    const floorGeo = new THREE.PlaneGeometry(80, 80);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a0e13,
      roughness: 0.88,
      metalness: 0.08
    });
    this.floorMesh = new THREE.Mesh(floorGeo, floorMat);
    this.floorMesh.rotation.x = -Math.PI / 2;
    this.floorMesh.position.y = -1.25;
    this.scene.add(this.floorMesh);

    // Spatial Architectural Perspective Grid
    this.floorGrid = new THREE.GridHelper(60, 40, 0x38bdf8, 0x1e293b);
    this.floorGrid.position.y = -1.24;
    (this.floorGrid.material as THREE.Material).transparent = true;
    (this.floorGrid.material as THREE.Material).opacity = 0.18;
    this.scene.add(this.floorGrid);
  }

  private setupArchitecture(): void {
    // Distant Architectural Structural Fins / Curved Wall Portals
    const finCount = 14;
    const finGeo = new THREE.BoxGeometry(0.12, 8, 0.4);
    const finMat = new THREE.MeshStandardMaterial({
      color: 0x151c24,
      roughness: 0.75,
      metalness: 0.2
    });

    for (let i = 0; i < finCount; i++) {
      const angle = (i / (finCount - 1)) * Math.PI - Math.PI / 2;
      const radius = 14;
      const x = Math.sin(angle) * radius;
      const z = -Math.cos(angle) * radius - 4;

      const fin = new THREE.Mesh(finGeo, finMat);
      fin.position.set(x, 2.5, z);
      fin.rotation.y = -angle;
      this.architecturalPillars.add(fin);
    }
    this.scene.add(this.architecturalPillars);
  }

  private setupParticles(): void {
    // Floating Spatial Ambient Dust
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = Math.random() * 8 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      scales[i] = Math.random() * 2 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  public updateScrollProgress(progress: number): void {
    this.currentProgress = progress;
    // Smooth camera pull back at the climax to give heroic scale
    // Progress 0.0 -> 0.8: Camera tracks walking subject at z=7
    // Progress 0.8 -> 1.0: Camera expands back to z=8.5 to frame the five disciplines
    if (progress > 0.8) {
      const factor = (progress - 0.8) / 0.2;
      this.targetCameraZ = 7 + factor * 1.5;
    } else {
      this.targetCameraZ = 7;
    }

    // Rotate architectural pillars subtly with parallax
    if (this.architecturalPillars) {
      this.architecturalPillars.rotation.y = (progress - 0.5) * 0.12;
    }
  }

  private animate(): void {
    this.animFrameId = requestAnimationFrame(this.animate.bind(this));

    // Smooth camera lerp
    this.currentCameraZ += (this.targetCameraZ - this.currentCameraZ) * 0.05;
    this.camera.position.z = this.currentCameraZ;

    // Slowly oscillate spotlight cone
    if (this.spotlightMesh) {
      this.spotlightMesh.rotation.y += 0.002;
    }

    // Drift particles subtly
    if (this.particles) {
      this.particles.rotation.y += 0.0008;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private onResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  public destroy(): void {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onResize.bind(this));
    this.renderer.dispose();
  }
}
