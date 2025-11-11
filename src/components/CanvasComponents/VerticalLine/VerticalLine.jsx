export class VerticalLine {
    constructor({ xPercent, yTopPercent, widthMax, heightPercent, skewPx, colorStart, colorEnd, phaseOffset }) {
        Object.assign(this, { xPercent, yTopPercent, widthMax, heightPercent, skewPx, colorStart, colorEnd });
        this.widthMin = 1;
        this.angle = phaseOffset || 0;
        this.speed = 0.008;
    }

    update() {
        this.angle += this.speed;
    }

    draw(ctx, canvasWidth, canvasHeight) {
        const xCenter = canvasWidth * this.xPercent;
        const yTop = canvasHeight * this.yTopPercent;
        const yBottom = yTop + canvasHeight * this.heightPercent;

        const t = Math.sin(this.angle);
        const currentWidth = this.widthMin + (this.widthMax - this.widthMin) * Math.abs(t);
        const skewCurrent = this.skewPx * t;

        const grad = ctx.createLinearGradient(xCenter, yTop, xCenter, yBottom);
        grad.addColorStop(0, this.colorStart);
        grad.addColorStop(1, this.colorEnd);
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(xCenter - currentWidth, yTop - skewCurrent);
        ctx.lineTo(xCenter + currentWidth, yTop + skewCurrent);
        ctx.lineTo(xCenter + currentWidth, yBottom + skewCurrent);
        ctx.lineTo(xCenter - currentWidth, yBottom - skewCurrent);
        ctx.closePath();
        ctx.fill();
    }
}
