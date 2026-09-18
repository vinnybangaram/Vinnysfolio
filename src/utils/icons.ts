// Authentic Brand & System SVGs for Tools, Social Platforms, and Skill Categories

export const BRAND_ICONS: Record<string, string> = {
  // 1. Social & Professional
  behance: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M7.799 6c1.171 0 2.115.244 2.832.732.717.488 1.076 1.206 1.076 2.154 0 .61-.165 1.127-.494 1.551-.33.424-.775.738-1.336.942.744.183 1.306.549 1.684 1.098.379.549.568 1.244.568 2.086 0 1.073-.39 1.909-1.171 2.508-.781.598-1.842.897-3.183.897H1V6h6.799zm-4.04 4.502h3.69c.561 0 .994-.122 1.299-.366.305-.244.458-.616.458-1.116 0-.537-.159-.922-.476-1.153-.317-.232-.775-.348-1.373-.348H3.759v2.983zm0 5.48h3.916c.646 0 1.147-.14 1.501-.421.354-.281.531-.726.531-1.336 0-.585-.183-1.018-.549-1.299-.366-.281-.909-.421-1.629-.421H3.759v3.477zM16.326 6.32h5.087v1.446h-5.087V6.32zm6.276 7.643c0 1.293-.384 2.318-1.153 3.074-.769.756-1.83 1.135-3.183 1.135-1.415 0-2.525-.403-3.33-1.208-.805-.805-1.208-1.921-1.208-3.348 0-1.403.409-2.513 1.226-3.33.817-.817 1.897-1.226 3.239-1.226 1.318 0 2.361.397 3.129 1.19.768.793 1.153 1.867 1.153 3.221v.492h-6.148c.024.781.275 1.385.751 1.812.476.427 1.11.641 1.903.641.561 0 1.018-.116 1.372-.348.354-.232.61-.531.769-.897h1.486zm-1.486-1.19c-.024-.659-.226-1.171-.604-1.537-.378-.366-.909-.549-1.592-.549-.659 0-1.183.177-1.574.531-.39.354-.61.872-.659 1.555h4.429z"/>
    </svg>
  `,
  linkedin: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
    </svg>
  `,
  email: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  `,

  // 2. Design Tools
  figma: `
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="#F24E1E" d="M8 2h4v4H8z"/>
      <path fill="#FF7262" d="M12 2h4a4 4 0 0 1 0 8h-4V2z"/>
      <path fill="#A259FF" d="M8 6h4v4H8z"/>
      <path fill="#1ABCFE" d="M8 10h4v4H8a4 4 0 0 1 0-8h4v4H8a4 4 0 0 0 0 8z"/>
      <path fill="#0ACF83" d="M8 14h4v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z"/>
      <circle fill="#1ABCFE" cx="16" cy="14" r="2"/>
    </svg>
  `,
  photoshop: `
    <svg viewBox="0 0 24 24" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#001E36"/>
      <path fill="#31A8FF" d="M6 6.5h3.8c1.3 0 2.3.3 2.9.9.6.6 1 1.4 1 2.4s-.3 1.9-.9 2.5c-.6.6-1.6.9-2.9.9H7.8V17H6V6.5zm1.8 1.5v3.8h1.9c.7 0 1.2-.2 1.6-.5.4-.3.6-.8.6-1.4s-.2-1-.6-1.4c-.4-.3-.9-.5-1.6-.5H7.8z"/>
      <path fill="#31A8FF" d="M15.8 12.3c-.6 0-1.1.1-1.5.3-.4.2-.6.5-.6.9 0 .4.2.7.5.9.3.2.9.4 1.7.7.9.2 1.6.6 2.1 1 .5.4.7 1.1.7 1.8 0 .9-.3 1.6-1 2.1-.7.5-1.6.8-2.7.8-1 0-1.8-.2-2.5-.5l.4-1.5c.6.3 1.4.5 2.1.5.6 0 1-.1 1.4-.4.4-.3.5-.6.5-1 0-.4-.2-.7-.5-.9-.3-.2-.9-.5-1.8-.7-.9-.3-1.5-.6-2-.9-.5-.4-.7-1-.7-1.7 0-.8.3-1.5.9-2 .6-.5 1.5-.7 2.5-.7.8 0 1.6.2 2.3.5l-.4 1.4c-.5-.4-1.1-.5-1.7-.5z"/>
    </svg>
  `,
  illustrator: `
    <svg viewBox="0 0 24 24" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#330000"/>
      <path fill="#FF9A00" d="M9.6 6.5h1.7L14.7 17H13l-.8-2.5h-3.5L8 17H6.3l3.3-10.5zm1.2 3.8L9.2 13h2.7l-1.1-2.7z"/>
      <path fill="#FF9A00" d="M16.5 7.6c.5 0 .9-.4.9-.9s-.4-.9-.9-.9-.9.4-.9.9.4.9.9.9zm-.8 9.4h1.7v-6.8h-1.7V17z"/>
    </svg>
  `,
  aftereffects: `
    <svg viewBox="0 0 24 24" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#00005B"/>
      <path fill="#9999FF" d="M9.6 6.5h1.7L14.7 17H13l-.8-2.5h-3.5L8 17H6.3l3.3-10.5zm1.2 3.8L9.2 13h2.7l-1.1-2.7z"/>
      <path fill="#9999FF" d="M18.8 13.9c-.8 0-1.5.3-2 .8-.5.5-.8 1.2-.8 2 0 .9.3 1.6.8 2.1.5.5 1.2.8 2.1.8.8 0 1.5-.2 2.1-.6l.4 1.2c-.8.5-1.7.8-2.7.8-1.4 0-2.4-.4-3.2-1.3-.8-.9-1.2-2-1.2-3.4 0-1.4.4-2.5 1.2-3.4.8-.9 1.9-1.3 3.2-1.3 1.3 0 2.3.4 3 1.2.7.8 1.1 1.9 1 3.2H16c0 .7.3 1.3.7 1.7.4.4 1 .6 1.7.6.6 0 1.2-.2 1.7-.5l.4 1.2c-.7.5-1.5.7-2.3.7zm-.1-4.7c-.6 0-1.1.2-1.5.6-.4.4-.6 1-.7 1.7h4.1c0-.7-.2-1.3-.6-1.7-.3-.4-.8-.6-1.3-.6z"/>
    </svg>
  `,
  premiere: `
    <svg viewBox="0 0 24 24" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#00005B"/>
      <path fill="#EA77FF" d="M6 6.5h3.8c1.3 0 2.3.3 2.9.9.6.6 1 1.4 1 2.4s-.3 1.9-.9 2.5c-.6.6-1.6.9-2.9.9H7.8V17H6V6.5zm1.8 1.5v3.8h1.9c.7 0 1.2-.2 1.6-.5.4-.3.6-.8.6-1.4s-.2-1-.6-1.4c-.4-.3-.9-.5-1.6-.5H7.8z"/>
      <path fill="#EA77FF" d="M14.5 17v-6.8h1.6v1.3c.3-.5.6-.8.9-1 .4-.2.8-.3 1.3-.3.4 0 .7.1 1 .2l-.3 1.6c-.3-.1-.6-.2-.9-.2-.5 0-.9.2-1.3.6-.4.4-.6 1-.6 1.7V17h-1.7z"/>
    </svg>
  `,

  // 3. AI Frontier Models & Workflows
  claude: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#D97706">
      <path d="M13.5 2c-.3 0-.6.2-.8.5l-3.3 5.7c-.2.4-.2.9 0 1.3l3.3 5.7c.2.3.5.5.8.5s.6-.2.8-.5l3.3-5.7c.2-.4.2-.9 0-1.3l-3.3-5.7c-.2-.3-.5-.5-.8-.5zm-7 5c-.3 0-.6.2-.8.5L2.4 13.2c-.2.4-.2.9 0 1.3l3.3 5.7c.2.3.5.5.8.5s.6-.2.8-.5l3.3-5.7c.2-.4.2-.9 0-1.3L7.3 7.5c-.2-.3-.5-.5-.8-.5zm14 0c-.3 0-.6.2-.8.5l-3.3 5.7c-.2.4-.2.9 0 1.3l3.3 5.7c.2.3.5.5.8.5s.6-.2.8-.5l3.3-5.7c.2-.4.2-.9 0-1.3l-3.3-5.7c-.2-.3-.5-.5-.8-.5z"/>
    </svg>
  `,
  chatgpt: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#10A37F">
      <path d="M20.5 9.5a5.5 5.5 0 0 0-.5-3.3 5.7 5.7 0 0 0-3.8-2.8 5.7 5.7 0 0 0-4.6.6A5.5 5.5 0 0 0 7.8 3a5.7 5.7 0 0 0-4.4 2.8 5.7 5.7 0 0 0 .5 5.8 5.7 5.7 0 0 0-.5 3.3 5.7 5.7 0 0 0 3.8 2.8 5.7 5.7 0 0 0 4.6-.6 5.5 5.5 0 0 0 3.8 1 5.7 5.7 0 0 0 4.4-2.8 5.7 5.7 0 0 0-.5-5.8zm-8.5 9.8a4.3 4.3 0 0 1-2.4-.7l.1-.2 2.7-1.5a.7.7 0 0 0 .4-.6v-3.7l1.2.7v3.2a4.3 4.3 0 0 1-2 2.8zm-5.8-2.6a4.2 4.2 0 0 1-.8-2.3l.2.1 2.7 1.5c.2.1.5.1.7 0l3.2-1.9v1.4l-2.8 1.6a4.3 4.3 0 0 1-3.2-.4zm-1.5-6.3a4.2 4.2 0 0 1 1.6-1.7V8l.1 3.1a.7.7 0 0 0 .3.6l3.2 1.8-1.2.7-2.8-1.6a4.3 4.3 0 0 1-1.2-2.2zm11.3 2.5-3.2-1.8 1.2-.7 2.8 1.6a4.3 4.3 0 0 1 1.2 2.2 4.2 4.2 0 0 1-1.6 1.7V17l-.1-3.1a.7.7 0 0 0-.3-.6zm2.3-1.6-.2-.1-2.7-1.5a.7.7 0 0 0-.7 0l-3.2 1.9v-1.4l2.8-1.6a4.3 4.3 0 0 1 3.2.4 4.2 4.2 0 0 1 .8 2.3zm-5.5-2.7-1.2-.7v-3.2a4.3 4.3 0 0 1 4.4 2.1l-.1.2-2.7 1.5a.7.7 0 0 0-.4.6v3.7l-1.2-.7v-3.5zm-2.4 2.8 1.5-.9 1.5.9v1.7l-1.5.9-1.5-.9v-1.7z"/>
    </svg>
  `,
  gemini: `
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="url(#gemini-grad)" d="M12 2C12 7.5 7.5 12 2 12c5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z"/>
      <defs>
        <linearGradient id="gemini-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stop-color="#4E95FF"/>
          <stop offset="0.5" stop-color="#8F71FF"/>
          <stop offset="1" stop-color="#FF6392"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  aiGeneric: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#38bdf8" stroke-width="2">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `,

  // 4. Creative Technology & Front-End
  threejs: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M21.7 6.8L12.5 1.5c-.3-.2-.7-.2-1 0L2.3 6.8c-.3.2-.5.5-.5.8v10.8c0 .4.2.7.5.8l9.2 5.3c.3.2.7.2 1 0l9.2-5.3c.3-.2.5-.5.5-.8V7.6c0-.3-.2-.6-.5-.8zm-9.7 14L4 16.2V8l8 4.6v8.2zm1-9.9L5.2 6.5 12 2.6l6.8 3.9-5.8 4.4zm7 5.3l-6 3.5v-8.2l6-3.5v8.2z"/>
    </svg>
  `,
  webgl: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#990000" stroke-width="2">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" stroke="#FF5555" fill="rgba(255,85,85,0.1)"/>
      <path d="M12 22V12m0 0L22 8.5M12 12L2 8.5" stroke="#FF5555"/>
    </svg>
  `,
  html5: `
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="#E34F26" d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3z"/>
      <path fill="#EF652A" d="M12 3.6v16.7l5.9-1.4L19.3 3.6H12z"/>
      <path fill="#FFF" d="M12 8.4H8.4l.2 2.4H12V8.4zm0 4.8H8.8l.3 2.8 2.9.8v-2.2l-1.3-.4-.2-1h1.5v-2.4zm0-6.8H6.5l.7 8h4.8V6.4z"/>
      <path fill="#EBEBEB" d="M12 8.4h3.6l-.3 3.6H12v2.4h3.1l-.3 3.2-2.8.8v2.2l5.1-1.4.6-6.8h-5.7V8.4zm0-2h5.8l.2-2.4H12v2.4z"/>
    </svg>
  `,
  css3: `
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="#1572B6" d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3z"/>
      <path fill="#33A9DC" d="M12 3.6v16.7l5.9-1.4L19.3 3.6H12z"/>
      <path fill="#FFF" d="M12 8.4H8.4l.2 2.4H12V8.4zm0 4.8H8.8l.3 2.8 2.9.8v-2.2l-1.3-.4-.2-1h1.5v-2.4zm0-6.8H6.5l.7 8h4.8V6.4z"/>
      <path fill="#EBEBEB" d="M12 8.4h3.6l-.3 3.6H12v2.4h3.1l-.3 3.2-2.8.8v2.2l5.1-1.4.6-6.8h-5.7V8.4zm0-2h5.8l.2-2.4H12v2.4z"/>
    </svg>
  `,
  typescript: `
    <svg viewBox="0 0 24 24" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#3178C6"/>
      <path fill="#FFF" d="M11.5 13.5h-2v5H7.7v-5h-2V12h5.8v1.5zm6.8 1.3c0 .8-.3 1.5-.9 2-.6.5-1.5.8-2.6.8-1 0-1.8-.2-2.5-.5l.4-1.6c.7.3 1.4.5 2.1.5.6 0 1-.1 1.3-.4.3-.2.4-.5.4-.9 0-.3-.1-.6-.4-.8-.2-.2-.7-.4-1.4-.7-.8-.3-1.4-.6-1.8-.9-.5-.4-.7-.9-.7-1.6 0-.8.3-1.4.8-1.9.6-.5 1.4-.7 2.4-.7.8 0 1.6.2 2.3.4l-.4 1.5c-.6-.3-1.2-.4-1.8-.4-.5 0-.9.1-1.2.3-.3.2-.4.5-.4.8 0 .3.1.5.3.7.2.2.6.4 1.3.6.9.3 1.5.6 2 .9.6.4.9 1 .9 1.7z"/>
    </svg>
  `,
  javascript: `
    <svg viewBox="0 0 24 24" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
      <path fill="#000" d="M7.5 18.5c-.8 0-1.5-.2-2-.6l.5-1.4c.5.3 1 .5 1.5.5.5 0 .9-.2 1.1-.5.2-.3.3-.8.3-1.4V10H10v5.1c0 1.2-.3 2.1-.9 2.6-.5.6-1.2.8-1.6.8zm7.3 0c-1.1 0-2-.3-2.6-.9-.7-.6-1-1.4-1-2.4l1.6-.2c.1.7.3 1.2.6 1.5.4.3.9.5 1.5.5.5 0 .9-.1 1.2-.4.3-.2.4-.5.4-.9 0-.4-.2-.7-.5-.9-.3-.2-.8-.4-1.5-.6-.9-.3-1.6-.6-2-.9-.5-.4-.7-1-.7-1.7 0-.9.3-1.6.9-2.1.6-.5 1.4-.8 2.4-.8.9 0 1.7.2 2.4.6l-.5 1.4c-.6-.3-1.2-.5-1.8-.5-.5 0-.9.1-1.2.3-.3.2-.4.5-.4.8 0 .3.1.5.3.7.2.2.7.4 1.4.6 1 .3 1.7.6 2.1 1 .5.4.7 1 .7 1.8 0 1-.3 1.7-1 2.2-.6.6-1.5.8-2.4.8z"/>
    </svg>
  `,
  react: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#61DAFB" stroke-width="1.5">
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
      <circle cx="12" cy="12" r="1.5" fill="#61DAFB"/>
    </svg>
  `,
  github: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
    </svg>
  `,
  vercel: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 1L24 22H0L12 1Z"/>
    </svg>
  `,
  vite: `
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="url(#vite-grad-a)" d="m21.4 3.7-9.1 17.6c-.3.5-.9.5-1.1 0L2.1 3.7c-.3-.6.2-1.3.8-1.2l9 1.5 8.7-1.5c.6-.1 1.1.6.8 1.2z"/>
      <path fill="url(#vite-grad-b)" d="M15.8 1.5 8.9 9.8l3.1.5-4.5 8.3 8.3-9.5-3.3-.5 3.3-7.1z"/>
      <defs>
        <linearGradient id="vite-grad-a" x1="2.1" y1="2.5" x2="21.4" y2="21.3" gradientUnits="userSpaceOnUse">
          <stop stop-color="#41D1FF"/>
          <stop offset="1" stop-color="#BD34FE"/>
        </linearGradient>
        <linearGradient id="vite-grad-b" x1="7.5" y1="1.5" x2="15.8" y2="18.6" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFEA83"/>
          <stop offset="0.5" stop-color="#FFDD35"/>
          <stop offset="1" stop-color="#FFA800"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  lovable: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#f43f5e" stroke-width="2">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="rgba(244,63,94,0.15)"/>
    </svg>
  `,

  // 5. Anthropic Brand Logo (for Credential Vault)
  anthropic: `
    <svg viewBox="0 0 24 24" width="28" height="28" fill="#D97706">
      <path d="M17.4 3h-3.6L7.2 21h3.6l1.3-3.7h5.8l1.3 3.7h3.6L17.4 3zm-4.3 11.4 2.1-5.8 2.1 5.8h-4.2z"/>
    </svg>
  `,

  // 6. Category Icons
  designCategory: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>
    </svg>
  `,
  motionCategory: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  `,
  frontendCategory: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  `,
  aiCategory: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  `,
  geospatialCategory: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="12 8 16 16 12 14 8 16 12 8"/>
    </svg>
  `,
  leadershipCategory: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  `,

  // 7. Timeline Milestone Icons
  ispatialMilestone: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#38bdf8" stroke-width="2">
      <circle cx="12" cy="12" r="9"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z"/>
    </svg>
  `,
  enterpriseMilestone: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#818cf8" stroke-width="2">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  `,
  motionMilestone: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#c084fc" stroke-width="2">
      <path d="m22 8-6 4 6 4V8Z"/>
      <rect x="2" y="6" width="14" height="12" rx="2"/>
    </svg>
  `,
  foundationsMilestone: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fbbf24" stroke-width="2">
      <path d="M4 20h16M12 4v16M8 8h8"/>
    </svg>
  `
};

export function getToolIcon(toolName: string): string {
  const t = toolName.toLowerCase();
  if (t.includes('figma')) return BRAND_ICONS.figma;
  if (t.includes('photoshop')) return BRAND_ICONS.photoshop;
  if (t.includes('illustrator')) return BRAND_ICONS.illustrator;
  if (t.includes('after effects')) return BRAND_ICONS.aftereffects;
  if (t.includes('premiere')) return BRAND_ICONS.premiere;
  if (t.includes('claude')) return BRAND_ICONS.claude;
  if (t.includes('chatgpt') || t.includes('openai')) return BRAND_ICONS.chatgpt;
  if (t.includes('gemini')) return BRAND_ICONS.gemini;
  if (t.includes('three.js')) return BRAND_ICONS.threejs;
  if (t.includes('webgl')) return BRAND_ICONS.webgl;
  if (t.includes('html5')) return BRAND_ICONS.html5;
  if (t.includes('css3') || t.includes('css')) return BRAND_ICONS.css3;
  if (t.includes('typescript')) return BRAND_ICONS.typescript;
  if (t.includes('javascript')) return BRAND_ICONS.javascript;
  if (t.includes('react')) return BRAND_ICONS.react;
  if (t.includes('github')) return BRAND_ICONS.github;
  if (t.includes('vercel')) return BRAND_ICONS.vercel;
  if (t.includes('vite')) return BRAND_ICONS.vite;
  if (t.includes('lovable')) return BRAND_ICONS.lovable;
  return BRAND_ICONS.aiGeneric;
}

export function getCategoryIcon(cat: string): string {
  const c = cat.toUpperCase();
  if (c.includes('DESIGN')) return BRAND_ICONS.designCategory;
  if (c.includes('MOTION')) return BRAND_ICONS.motionCategory;
  if (c.includes('FRONT')) return BRAND_ICONS.frontendCategory;
  if (c.includes('AI')) return BRAND_ICONS.aiCategory;
  if (c.includes('GEO') || c.includes('PRODUCT')) return BRAND_ICONS.geospatialCategory;
  if (c.includes('LEADER')) return BRAND_ICONS.leadershipCategory;
  return BRAND_ICONS.designCategory;
}

export function getMilestoneIcon(id: string): string {
  if (id.includes('ispatial')) return BRAND_ICONS.ispatialMilestone;
  if (id.includes('people') || id.includes('quest') || id.includes('nextrow') || id.includes('aparaa') || id.includes('enterprise') || id.includes('lead-ux')) return BRAND_ICONS.enterpriseMilestone;
  if (id.includes('cipra') || id.includes('lakshmi') || id.includes('scorelogix') || id.includes('motion') || id.includes('senior-ui')) return BRAND_ICONS.motionMilestone;
  return BRAND_ICONS.foundationsMilestone;
}
