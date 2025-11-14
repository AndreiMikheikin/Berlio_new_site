export class Edge {
  constructor(v1, v2) {
    this.v1 = v1;
    this.v2 = v2;
  }

  draw(ctx, alpha = 1) {
    ctx.beginPath();
    ctx.moveTo(this.v1.x, this.v1.y);
    ctx.lineTo(this.v2.x, this.v2.y);

    ctx.globalAlpha = alpha;

    const gradient = ctx.createLinearGradient(
      this.v1.x,
      this.v1.y,
      this.v2.x,
      this.v2.y
    );

    gradient.addColorStop(0, this.v1.color);
    gradient.addColorStop(1, this.v2.color);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.globalAlpha = 1;
  }
}
