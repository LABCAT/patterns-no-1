export default class InfinitySymbol {

    constructor(p5, x, y, leftSize, rightSize, alpha, strokeColour, fillColour = 0) {
        this.p = p5;
        this.x = x;
        this.y = y;
        this.leftSize = leftSize;
        this.rightSize = rightSize;
        this.alpha = alpha;
        this.fill = this.fill > 0 ?? this.p.color(fillColour);
        this.stroke = this.p.color(strokeColour);
        this.stroke.setAlpha(this.alpha);
    }

    draw() {
        const angle = (parseInt(this.p.random(8)) * (this.p.TAU/8))-this.p.PI*0.05;
        this.p.push();
        this.p.translate(this.x, this.y);
        this.p.rotate(angle);
        this.p.strokeWeight(1);
        this.p.stroke(this.stroke);
        if(this.fill){
            this.fill.setAlpha(this.alpha);
            this.p.fill(this.fill);
        }
        this.p.beginShape();
        this.p.curveVertex(0, 0);
        this.p.curveVertex(0, 0);
        this.p.curveVertex(6 * this.rightSize, 4 * this.rightSize);
        this.p.curveVertex(9 * this.rightSize, 3 * this.rightSize);
        this.p.curveVertex(10 * this.rightSize, 0);
        this.p.curveVertex(9 * this.rightSize, -3 * this.rightSize);
        this.p.curveVertex(6 * this.rightSize, -4 * this.rightSize);
        this.p.curveVertex(0, 0);
        this.p.curveVertex(-6  * this.leftSize, 4 * this.leftSize);
        this.p.curveVertex(-9  * this.leftSize, 3  * this.leftSize);
        this.p.curveVertex(-10  * this.leftSize, 0);
        this.p.curveVertex(-9  * this.leftSize, -3 * this.leftSize);
        this.p.curveVertex(-6  * this.leftSize, -4 * this.leftSize);
        this.p.curveVertex(0, 0);
        this.p.endShape(this.p.CLOSE);
        this.p.pop();
    }

    update() {
        this.leftSize = this.leftSize - (this.leftSize / 16);
        this.rightSize = this.rightSize - (this.rightSize / 16);
    }

}