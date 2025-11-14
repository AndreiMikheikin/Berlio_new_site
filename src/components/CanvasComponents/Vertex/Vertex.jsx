export class Vertex {
  constructor(x, y, state) {
    this.state = state; // ссылка на общий state
    this.original = { x, y };
    this.x = x;
    this.y = y;
    this.initialized = false;
    const angle = Math.random() * 2 * Math.PI;
    this.vx = Math.cos(angle);
    this.vy = Math.sin(angle);
    this.speed = state.GLOBAL_SPEED * (0.8 + Math.random() * 0.4);
    this.radius = 0.7;
    this.bounceCount = 0;
    this.returning = false;
    this.target = { x, y };
    this.hasMoved = false;
    this.isMoving = false;
    this.startDelay = Math.random() * 900 + 100;
    this.delayElapsed = 0;
    this.canStart = false;
    this.startProgress = 0;
    this.edgeCount = 0;
    this.color = `hsl(${state.colorHue}, 70%, 60%)`; // базовый цвет
  }

  update(dt) {
    const { canvas, mode } = this.state;

    if (mode === "idle") return;

    // Задержка старта
    if (!this.canStart) {
      this.delayElapsed += dt * 1000;
      if (this.delayElapsed >= this.startDelay) {
        this.canStart = true;
        this.startProgress = 0;
        this.initialized = true;
      } else return;
    }

    // Плавный старт
    if (this.startProgress < 1) {
      this.startProgress += dt * 5;
      this.startProgress = Math.min(this.startProgress, 1);
    }

    const currentSpeed = this.speed * this.startProgress;

    if (!this.hasMoved && currentSpeed > 0.1) {
      this.hasMoved = true;
      this.isMoving = true;
    }

    if (this.returning) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist <= currentSpeed * dt) {
        this.x = this.target.x;
        this.y = this.target.y;
        this.vx = 0;
        this.vy = 0;
        this.returning = false;
        this.bounceCount = 0;
        this.isMoving = false;
        this.startProgress = 0;
        return;
      }
      this.vx = dx / dist;
      this.vy = dy / dist;
      this.x += this.vx * currentSpeed * dt;
      this.y += this.vy * currentSpeed * dt;
      this.isMoving = true;
      return;
    }

    if (this.vx !== 0 || this.vy !== 0) {
      this.x += this.vx * currentSpeed * dt;
      this.y += this.vy * currentSpeed * dt;
      this.isMoving = true;

      const bouncedHoriz = this.x <= 0 || this.x >= canvas.width;
      const bouncedVert = this.y <= 0 || this.y >= canvas.height;

      if (bouncedHoriz || bouncedVert) {
        const horizontalWeight = canvas.width >= canvas.height ? 2 : 1;
        const verticalWeight = canvas.width <= canvas.height ? 2 : 1;

        if (bouncedHoriz) this.bounceCount += horizontalWeight;
        if (bouncedVert) this.bounceCount += verticalWeight;

        if (bouncedHoriz) this.vx *= -1;
        if (bouncedVert) this.vy *= -1;

        if (this.bounceCount >= 2 && !this.returning) this.returning = true;
      }
    } else {
      this.isMoving = false;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  get isAtOrigin() {
    return (
      this.initialized &&
      Math.abs(this.x - this.original.x) < 0.5 &&
      Math.abs(this.y - this.original.y) < 0.5
    );
  }
}
