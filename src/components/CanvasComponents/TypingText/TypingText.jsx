export class TypingText {
    constructor({ text, x, y, font = '12px monospace', color = '#00ff00', cursorColor = '#00ff00', speed = 60, maxLines = 15 }) {
        Object.assign(this, { x, y, font, color, cursorColor, speed, maxLines });

        this.tokens = (typeof text === 'string') ? [{ text, color }] : text;

        this.lines = [[]];
        this.tokenIndex = 0;
        this.charIndex = 0;
        this.lastTime = 0;

        this.cursorVisible = true;
        this.cursorTimer = 0;
        this.cursorBlinkRate = 500;
    }

    update(deltaTime) {
        this.cursorTimer += deltaTime;
        if (this.cursorTimer > this.cursorBlinkRate) {
            this.cursorVisible = !this.cursorVisible;
            this.cursorTimer = 0;
        }

        this.lastTime += deltaTime;
        if (this.lastTime < this.speed) return;
        this.lastTime = 0;

        const currentToken = this.tokens[this.tokenIndex];
        const nextChar = currentToken.text[this.charIndex];

        if (nextChar === '\n') {
            this.lines.push([]);
            if (this.lines.length > this.maxLines) this.lines.shift();
        } else {
            const currentLine = this.lines[this.lines.length - 1];

            if (!currentLine.length || currentLine[currentLine.length - 1].color !== currentToken.color) {
                currentLine.push({ text: nextChar, color: currentToken.color });
            } else {
                currentLine[currentLine.length - 1].text += nextChar;
            }
        }

        this.charIndex++;
        if (this.charIndex >= currentToken.text.length) {
            this.charIndex = 0;
            this.tokenIndex++;
            if (this.tokenIndex >= this.tokens.length) {
                this.tokenIndex = 0;
                this.charIndex = 0;
            }
        }
    }

    draw(ctx, canvas) {
        ctx.font = this.font;
        ctx.textBaseline = 'top';

        const lineHeight = parseInt(this.font) * 1.3;
        const px = typeof this.x === 'string' ? canvas.width * parseFloat(this.x) / 100 : this.x;
        const py = typeof this.y === 'string' ? canvas.height * parseFloat(this.y) / 100 : this.y;

        this.lines.forEach((line, i) => {
            let cursorX = px;
            const y = py + i * lineHeight;

            line.forEach(token => {
                ctx.fillStyle = token.color || this.color;
                ctx.fillText(token.text, cursorX, y);
                cursorX += ctx.measureText(token.text).width;
            });

            if (i === this.lines.length - 1 && this.cursorVisible) {
                ctx.fillStyle = this.cursorColor;
                ctx.fillRect(cursorX, y + 2, 4, parseInt(this.font) - 6);
            }
        });
    }
}
