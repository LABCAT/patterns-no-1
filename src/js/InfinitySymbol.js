export default class InfinitySymbol {

    constructor(p5, leftSize, rightSize, fillColour, strokeColour) {
        this.p = p5;
        this.leftSize = leftSize;
        this.rightSize = rightSize;
        this.fill = this.p.color(fillColour);
        this.fill.setAlpha(this.p.random(50, 400));
        this.stroke = this.p.color(strokeColour);
        this.stroke.setAlpha(this.p.random(50, 400));
    }

    draw() {
        this.p.strokeWeight(8);
        this.p.stroke(this.stroke);
        this.p.fill(this.fill);
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
    }

    update() {
        this.leftSize = this.leftSize - (this.leftSize / 16);
        this.rightSize = this.rightSize - (this.rightSize / 16);
    }

}