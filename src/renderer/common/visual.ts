import { gsap } from 'gsap';
import { random } from './utils';

export class Visual {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  particleLength: number;
  particleMaxRadius: number;
  particles: any[];
  colorType: 'pink' | 'blue';
  handleMouseMoveBind: (e: MouseEvent) => void;
  handleClickBind: (e: MouseEvent) => void;
  handleResizeBind: (e: UIEvent) => void;

  constructor(canvas: HTMLCanvasElement, colorType: 'pink' | 'blue') {
    this.colorType = colorType;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d')!;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.particleLength = 270;
    this.particles = [];
    this.particleMaxRadius = 8;

    this.handleMouseMoveBind = this.handleMouseMove.bind(this);
    this.handleClickBind = this.handleClick.bind(this);
    this.handleResizeBind = this.handleResize.bind(this);

    this.initialize();
    this.render();
  }

  initialize() {
    this.resizeCanvas();
    for (let i = 0; i < this.particleLength; i++) {
      this.particles.push(this.createParticle(i));
    }
    this.bind();
  }

  bind() {
    document.body.addEventListener('mousemove', this.handleMouseMoveBind, false);
    document.body.addEventListener('click', this.handleClickBind, false);
    window.addEventListener('resize', this.handleResizeBind, false);
  }

  unbind() {
    document.body.removeEventListener('mousemove', this.handleMouseMoveBind, false);
    document.body.removeEventListener('click', this.handleClickBind, false);
    window.removeEventListener('resize', this.handleResizeBind, false);
  }

  handleMouseMove(e: MouseEvent) {
    this.enlargeParticle(e.clientX, e.clientY);
  }

  handleClick(e: MouseEvent) {
    this.burstParticle(e.clientX, e.clientY);
  }

  handleResize() {
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvasWidth = document.body.offsetWidth;
    this.canvasHeight = document.body.offsetHeight;
    this.canvas.width = this.canvasWidth * window.devicePixelRatio;
    this.canvas.height = this.canvasHeight * window.devicePixelRatio;
    this.context = this.canvas.getContext('2d')!;
    this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  createParticle(id: number, isRecreate?: boolean) {
    const radius = random(1, this.particleMaxRadius);
    const x = isRecreate
      ? -radius - random(this.particleMaxRadius * 2, this.canvasWidth)
      : random(0, this.canvasWidth);
    let y = random(this.canvasHeight / 2 - 200, this.canvasHeight / 2 + 200);
    y += random(-100, 100);
    const alpha = random(0.05, 1);

    return {
      id: id,
      x: x,
      y: y,
      startY: y,
      radius: radius,
      defaultRadius: radius,
      startAngle: 0,
      endAngle: Math.PI * 2,
      alpha: alpha,
      color:
        this.colorType === 'pink'
          ? { r: 190, g: random(0, 80), b: random(0, 120) }
          : { r: random(0, 100), g: random(0, 100), b: 255 },
      speed: alpha + 1,
      amplitude: random(50, 200),
      isBurst: false
    };
  }

  drawParticles() {
    this.particles.forEach((particle) => {
      // 位置情?更新
      this.moveParticle(particle);

      // particle描画
      this.context.beginPath();
      this.context.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.alpha})`;
      this.context.arc(
        particle.x,
        particle.y,
        particle.radius,
        particle.startAngle,
        particle.endAngle
      );
      this.context.fill();
    });
  }

  moveParticle(particle: any) {
    particle.x += particle.speed;
    particle.y =
      particle.startY + particle.amplitude * Math.sin(((particle.x / 5) * Math.PI) / 180);
  }

  enlargeParticle(clientX: number, clientY: number) {
    this.particles.forEach((particle) => {
      if (particle.isBurst) return;

      const distance = Math.hypot(particle.x - clientX, particle.y - clientY);

      if (distance <= 100) {
        const scaling = (100 - distance) / 1.5;
        gsap.to(particle, 0.5, {
          radius: particle.defaultRadius + scaling,
          ease: 'power2.out'
        });
      } else {
        gsap.to(particle, 0.5, {
          radius: particle.defaultRadius,
          ease: 'power2.out'
        });
      }
    });
  }

  burstParticle(clientX: number, clientY: number) {
    this.particles.forEach((particle) => {
      const distance = Math.hypot(particle.x - clientX, particle.y - clientY);

      if (distance <= 100) {
        particle.isBurst = true;
        gsap.to(particle, 0.5, {
          radius: particle.defaultRadius + 200,
          alpha: 0,
          ease: 'power2.out',
          onComplete: () => {
            this.particles[particle.id] = this.createParticle(particle.id, true);
          }
        });
      }
    });
  }

  render() {
    // canvas初期化
    this.context.clearRect(0, 0, this.canvasWidth + this.particleMaxRadius * 2, this.canvasHeight);

    // 绘制particle
    this.drawParticles();

    // 从画面消失后换成新的particle
    this.particles.forEach((particle) => {
      if (particle.x - particle.radius >= this.canvasWidth) {
        this.particles[particle.id] = this.createParticle(particle.id, true);
      }
    });

    requestAnimationFrame(this.render.bind(this));
  }
}
