export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'gis' | 'ux' | 'ai' | 'motion';
  categoryLabel: string;
  role: string;
  timeline: string;
  summary: string;
  problem: string;
  uxThinking: string;
  designMotion: string;
  outcome: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'smartmap-3d',
    title: 'SmartMap-3D',
    subtitle: 'Next-Gen Enterprise Geospatial Intelligence',
    category: 'gis',
    categoryLabel: 'GIS & Spatial 3D',
    role: 'Lead UX/UI Architect & Spatial Designer',
    timeline: '2024 – Present',
    summary: 'A high-performance 3D GIS platform delivering sub-second spatial querying, terrain slicing, and fluid multi-layer rendering across dense geographic datasets.',
    problem: 'Enterprise GIS analysts were bogged down by sluggish 2D web interfaces that struggled to visualize elevation gradients, subterranean utilities, and multi-temporal satellite datasets without browser lag.',
    uxThinking: 'Engineered contextual spatial breadcrumbs, layer blend modes, intuitive terrain pitch/yaw controls, and a bespoke spatial HUD with non-destructive attribute filtering.',
    designMotion: 'Custom WebGL terrain shading with smooth camera orbit transitions, elevation contour glow pulses, and physics-damped map navigation.',
    outcome: 'Decreased spatial query time by 48%, supported 100,000+ real-time vector markers at 60fps, and adopted across municipal urban planning agencies.',
    tags: ['GIS 3D', 'WebGL', 'Spatial UX', 'Calcite Design', 'Mapbox/Cesium'],
    metrics: [
      { label: 'Query Latency', value: '-48%' },
      { label: 'Render Performance', value: '60 FPS' },
      { label: 'Data Points', value: '100K+' }
    ],
    accentColor: '#38bdf8'
  },
  {
    id: 'geovision-ai',
    title: 'GeoVision',
    subtitle: 'AI Computer Vision & Geospatial Analytics',
    category: 'ai',
    categoryLabel: 'AI & Creative Tech',
    role: 'Principal Product Designer',
    timeline: '2023 – 2024',
    summary: 'Computer-vision powered platform that automatically detects urban infrastructure shifts, structural anomalies, and environmental changes from satellite and drone telemetry.',
    problem: 'Manual inspection of satellite imagery for civil infrastructure risks was error-prone, labor-intensive, and weeks behind real-world physical changes.',
    uxThinking: 'Created a dual-viewport temporal scrubber allowing instant before/after AI inference comparisons with confidence threshold dials and bounding-box audit logs.',
    designMotion: 'Radar-sweep spatial overlays, micro-animations highlighting detected anomalies, and kinetic telemetry metrics.',
    outcome: 'Achieved 4x faster incident response times for civil engineering teams with 94.8% anomaly detection accuracy.',
    tags: ['Computer Vision', 'Temporal Diffing', 'Geospatial AI', 'Analytics UI'],
    metrics: [
      { label: 'Response Velocity', value: '4x Faster' },
      { label: 'Model Accuracy', value: '94.8%' },
      { label: 'Imagery Monitored', value: '1.2M km²' }
    ],
    accentColor: '#818cf8'
  },
  {
    id: 'smartgeofleet',
    title: 'SmartGeoFleet',
    subtitle: 'Real-Time Telematics & Fleet Command Center',
    category: 'gis',
    categoryLabel: 'GIS & Telematics',
    role: 'Staff UX Architect',
    timeline: '2023 – 2024',
    summary: 'Mission-critical fleet telematics system tracking thousands of active transport assets with live route optimization, driver safety alerts, and predictive maintenance.',
    problem: 'Fleet dispatchers were overwhelmed by cluttered 2D maps and asynchronous alert modals, leading to missed delay notifications and increased driver fatigue.',
    uxThinking: 'Developed high-contrast dark mode HUD optimized for multi-monitor command centers, dynamic vehicle cluster heatmaps, and glanceable trip health cards.',
    designMotion: 'Live GPS path interpolation, vector velocity vectors indicating acceleration, and emergency alert pulsation rings.',
    outcome: 'Reduced fleet idle fuel burn by 18% and increased dispatcher operational throughput by 35%.',
    tags: ['Telematics', 'Real-time IoT', 'Fleet UX', 'Command Center'],
    metrics: [
      { label: 'Fuel Burn Saved', value: '18%' },
      { label: 'Active Vehicles', value: '12,500+' },
      { label: 'Dispatcher Throughput', value: '+35%' }
    ],
    accentColor: '#34d399'
  },
  {
    id: 'smartcreative-os',
    title: 'SmartCreativeOS & SmartSlide AI',
    subtitle: 'Generative Storytelling & Executive Presentation Suite',
    category: 'ai',
    categoryLabel: 'AI & Creative Tech',
    role: 'Creative Technologist & UI Architect',
    timeline: '2024',
    summary: 'AI-augmented slide creation platform translating raw business data and natural language prompts into kinetic, beautifully typeset executive presentations.',
    problem: 'Executives and designers spent countless hours manually aligning slide components, choosing color palettes, and reformatting tables.',
    uxThinking: 'Natural language chat interface paired with an interactive spatial canvas that auto-adjusts layout using golden ratio grids and design tokens.',
    designMotion: 'Fluid slide transitions with kinetic text reveals, morphing chart geometries, and real-time layout reflows.',
    outcome: 'Saved over 15 hours per presentation deck with executive acclaim across multi-billion-dollar enterprise pitches.',
    tags: ['Generative UI', 'LLM Workflows', 'Kinetic Layout', 'Design Ops'],
    metrics: [
      { label: 'Time Saved', value: '70%' },
      { label: 'Slide Generations', value: '250K+' },
      { label: 'User Rating', value: '4.9/5' }
    ],
    accentColor: '#f43f5e'
  },
  {
    id: 'particle2face',
    title: 'Particle2Face & RealTime-AIDance',
    subtitle: 'Interactive GPU Particle Physics & Pose Synthesis',
    category: 'motion',
    categoryLabel: 'Motion & Creative Tech',
    role: 'Creative Director & Motion Technologist',
    timeline: '2023',
    summary: 'Cutting-edge creative technology experiment combining webcam facial mesh detection with a 150,000-particle WebGL compute swarm that morphs to human expressions.',
    problem: 'Exploring the emotional resonance of real-time human interaction with generative particle fields without requiring specialized hardware.',
    uxThinking: 'Zero-friction web browser onboarding using MediaPipe ML, instant calibration, and intuitive gesture-based particle parameter controls.',
    designMotion: 'Dynamic curl noise vector fields, attraction forces keyed to eye blinks and smiles, and smooth temporal dampening.',
    outcome: 'Featured in creative coding showcases with over 50,000 interactive user sessions and silky 60fps browser rendering.',
    tags: ['Three.js', 'Shader Physics', 'Pose Tracking', 'Generative Motion'],
    metrics: [
      { label: 'Particle Count', value: '150,000' },
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Global Sessions', value: '50K+' }
    ],
    accentColor: '#c084fc'
  },
  {
    id: 'knowledgehub-ds',
    title: 'Enterprise Spatial Design System',
    subtitle: 'Unified Token Architecture & Component Ecosystem',
    category: 'ux',
    categoryLabel: 'UX / UI Systems',
    role: 'Design System Lead',
    timeline: '2022 – 2024',
    summary: 'A comprehensive multi-tenant design system unifying 14 geospatial products under consistent ergonomic guidelines, token pipelines, and accessible components.',
    problem: 'Multiple siloed teams built inconsistent UI components, resulting in conflicting UX patterns, broken accessibility, and 3x longer design-to-code delivery cycles.',
    uxThinking: 'Created atomic tokens (spacing, typography, map marker glyphs, elevation tiers) synced seamlessly between Figma and React/Vanilla TS repositories.',
    designMotion: 'Standardized motion curve library (entrance, exit, layout shift, hover states) ensuring consistent kinetic feel.',
    outcome: 'Achieved 100% WCAG AAA accessibility compliance and reduced engineering handoff time by 60%.',
    tags: ['Design Systems', 'Design Tokens', 'Accessibility', 'Figma Tokens'],
    metrics: [
      { label: 'Adoption Rate', value: '100%' },
      { label: 'Handoff Speed', value: '+60%' },
      { label: 'WCAG Rating', value: 'AAA' }
    ],
    accentColor: '#fbbf24'
  }
];

export const AI_KNOWLEDGE_BASE = {
  about: `Vinodh Kumar is an ultra-skilled Principal Designer, UX/UI Architect, Motion Director, and Creative AI Technologist. He specializes in designing complex digital experiences, enterprise geospatial intelligence platforms (GIS), telematics systems, and generative AI interfaces.`,
  disciplines: [
    'Graphic Design (Form, Balance, Baseline Grids, Typography)',
    'UX Design (Information Architecture, Mental Models, Cognitive Load Reduction, User Journeys)',
    'UI Design & Code (Design Systems, HTML/CSS, Token Architecture, Component Engineering)',
    'Motion Graphics (Bézier Kinematics, Physics-Damped Transitions, 60fps Micro-interactions)',
    'AI & Creative Tech (Geospatial Computer Vision, Generative UI, Pose Detection, LLM Workflows)'
  ],
  philosophy: `Design is human intent amplified by computational precision. An interface must eliminate cognitive friction while delighting through kinetic rhythm and spatial clarity.`
};
