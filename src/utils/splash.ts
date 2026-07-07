import { ParticleBackground } from './particleBackground';

const app = document.getElementById('app');
if (app) {
  new ParticleBackground(app, 80);

  const splash = document.createElement('div');
  splash.className = 'splash';
  splash.id = 'splash';
  splash.innerHTML = `
    <div class="splash-inner">
      <div class="splash-logo">TrueLens</div>
      <div class="splash-sub">数据可视化大屏</div>
      <div class="splash-hint">点击任意位置进入</div>
    </div>
    <div class="shatter-grid" id="shatterGrid"></div>
  `;
  app.appendChild(splash);

  const grid = document.getElementById('shatterGrid');
  if (grid) {
    const cols = 8;
    const rows = 6;
    const w = 100 / cols;
    const h = 100 / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const piece = document.createElement('div');
        piece.className = 'shatter-piece';
        piece.style.left = `${c * w}%`;
        piece.style.top = `${r * h}%`;
        piece.style.width = `${w}%`;
        piece.style.height = `${h}%`;
        piece.style.marginLeft = `${(Math.random() - 0.5) * 2}%`;
        const angle = Math.random() * 360;
        const dist = 40 + Math.random() * 60;
        const tx = `${Math.cos((angle * Math.PI) / 180) * dist}vw`;
        const ty = `${Math.sin((angle * Math.PI) / 180) * dist}vh`;
        piece.style.setProperty('--tx', tx);
        piece.style.setProperty('--ty', ty);
        piece.style.setProperty('--rot', `${angle}deg`);
        piece.style.animationDelay = `${Math.random() * 0.15}s`;
        grid.appendChild(piece);
      }
    }
  }

  function enterDashboard() {
    if (splash.dataset.entered === 'true') return;
    splash.dataset.entered = 'true';

    if (grid) {
      grid.classList.add('active');
    }

    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.remove();
      }, 600);
    }, 600);
  }

  splash.addEventListener('click', enterDashboard);
  splash.addEventListener('touchstart', enterDashboard);
}
