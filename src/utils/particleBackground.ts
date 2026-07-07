interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export class ParticleBackground {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private container: HTMLElement;
  private particleCount = 80;
  private connectionDistance = 140;
  private speedFactor = 0.8;

  constructor(container: HTMLElement | string, count = 80) {
    this.container = typeof container === 'string' ? document.querySelector<HTMLElement>(container)! : container;
    this.particleCount = count;

    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.container.insertBefore(this.canvas, this.container.firstChild);

    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot get 2d context');
    this.ctx = ctx;

    this.initParticles();
    this.start();
    window.addEventListener('resize', () => this.handleResize());
  }

  private initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.speedFactor,
        vy: (Math.random() - 0.5) * this.speedFactor,
        size: Math.random() * 2 + 1
      });
    }
  }

  private handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initParticles();
  }

  start() {
    if (this.animationId) return;
    const loop = () => {
      this.update();
      this.draw();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private update() {
    const w = this.canvas.width;
    const h = this.canvas.height;

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      p.x = Math.max(0, Math.min(w, p.x));
      p.y = Math.max(0, Math.min(h, p.y));
    }
  }

  private draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const connectionDist = this.connectionDistance;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * 0.35;
          ctx.strokeStyle = `rgba(0, 180, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(this.particles[i].x, this.particles[i].y);
          ctx.lineTo(this.particles[j].x, this.particles[j].y);
          ctx.stroke();
        }
      }
    }

    for (const p of this.particles) {
      ctx.fillStyle = 'rgba(180, 220, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
