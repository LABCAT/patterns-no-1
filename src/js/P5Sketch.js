import React, { useRef, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import ShuffleArray from "./functions/ShuffleArray";

const P5Sketch = () => {
  const sketchRef = useRef();

  const Sketch = (p) => {
    p.canvas = null;

    p.canvasWidth = window.innerWidth;

    p.canvasHeight = window.innerHeight;

    //https://coolors.co/0b3954-087e8b-64abbb-bfd7ea-df99a5-ff5a5f-e43c42-c81d25
    // p.colourPalette = [
    //   "#0b3954",
    //   "#087e8b",
    //   "#64abbb",
    //   "#bfd7ea",
    //   "#df99a5",
    //   "#ff5a5f",
    //   "#e43c42",
    //   "#c81d25",
    // ];

    p.colourPalette = ["#1f2041","#4b3f72","#ffc857","#119da4","#19647e","#007991","#439a86","#a1b5d8"];


    p.setup = () => {
      p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.noLoop();
    };

    p.draw = () => {
      p.background(255);
      for(let i=0; i < 2000; i++){
          let x = p.randomGaussian(0.5, 0.14) * p.width;
          let y = p.randomGaussian(0.5, 0.14) * p.height;
          let w = p.random(10, 100) * p.random(p.random(p.random()));
          p.randomShape(x, y, w);
      }
    };

    p.randomShape = (x, y, w) => {
      const probability = parseInt(p.random(200));
      const angle = (parseInt(p.random(8)) * (p.TAU/8))-p.PI*0.05;
      const shape = p.random(p.shapes);
      let size = 0;
      p.push();
      p.translate(x, y);
      p.rotate(angle);
      switch (probability) {
        case 0:
          size = p.random(1, 5);
          p.infinitySymbol(size, size);    
          break;
        case 1:
          size = p.random(p.width / 16);
          p.leaf(size);    
          break;
        case 2:
          size = p.random(p.width / 16);
          p.trippleHex(size);    
          break;
        default:
          p.randomLine(w);
          break;
      }
      p.pop();
    }

    p.randomLine = (lenght) => {
      const colour = p.color(p.random(p.colourPalette));
      colour.setAlpha(p.random(100)*p.random(p.random()));
      p.fill(colour);
      p.stroke(colour);
      p.line(0, 0, lenght * p.random(1, 20), 0);
    };

    p.infinitySymbol = (leftSize, rightSize, centerX = 0, centerY = 0) => {
      const colours = ShuffleArray(p.colourPalette);
      const strokeC = p.color(colours[0]);
      const fillC = p.color(colours[colours.length - 1]);
      strokeC.setAlpha(p.random(50, 400));
      fillC.setAlpha(p.random(50, 400));
      p.stroke(strokeC);
      p.fill(fillC);
      p.strokeWeight(8);      
      p.beginShape();
      p.curveVertex(centerX, centerY);
      p.curveVertex(centerX, centerY);
      p.curveVertex(6 * rightSize, 4 * rightSize);
      p.curveVertex(9 * rightSize, 3 * rightSize);
      p.curveVertex(10 * rightSize, 0);
      p.curveVertex(9 * rightSize, -3 * rightSize);
      p.curveVertex(6 * rightSize, -4 * rightSize);
      p.curveVertex(centerX, centerY);
      p.curveVertex(-6  * leftSize, 4 * leftSize);
      p.curveVertex(-9  * leftSize, 3  * leftSize);
      p.curveVertex(-10  * leftSize, 0);
      p.curveVertex(-9  * leftSize, -3 * leftSize);
      p.curveVertex(-6  * leftSize, -4 * leftSize);
      p.curveVertex(centerX, centerY);
      p.endShape(p.CLOSE);
    };

    p.leaf = (size) => {
      const colours = ShuffleArray(p.colourPalette);
      let count = 0;
      while (count < size / 2) {
        let colour = p.lerpColor(p.color(colours[0]), p.color(colours[colours.length - 1]), (1 / size) * count * 4)
        p.fill(colour);
        p.stroke(colour);
        p.ellipse(count, count, size - (count * 2), size - (count * 2), 20, 20, 20, 20);
        count++;
      }
    };

    p.trippleHex = (size) => {
      for (let i = 0; i < 4; i++) {
        p.stroke(p.random(p.colourPalette));
        p.fill(p.random(p.colourPalette));
        p.hexagon(0, 0, size);
        size = size / 2;
      }
    };

    /*
     * function to draw a hexagon shape
     * adapted from: https://p5js.org/examples/form-regular-polygon.html
     * @param {Number} x        - x-coordinate of the hexagon
     * @param {Number} y      - y-coordinate of the hexagon
     * @param {Number} radius   - radius of the hexagon
     */
    p.hexagon = (x, y, radius) => {
      radius = radius / 2;
      p.angleMode(p.RADIANS);
      const angle = p.TWO_PI / 6;
      p.beginShape();
      for (var a = p.TWO_PI / 12; a < p.TWO_PI + p.TWO_PI / 12; a += angle) {
        let sx = x + p.cos(a) * radius;
        let sy = y + p.sin(a) * radius;
        p.vertex(sx, sy);
      }
      p.endShape(p.CLOSE);
    };

    p.updateCanvasDimensions = () => {
      p.canvasWidth = window.innerWidth;
      p.canvasHeight = window.innerHeight;
      p.createCanvas(p.canvasWidth, p.canvasHeight);
      p.redraw();
    };

    if (window.attachEvent) {
      window.attachEvent("onresize", function () {
        p.updateCanvasDimensions();
      });
    } else if (window.addEventListener) {
      window.addEventListener(
        "resize",
        function () {
          p.updateCanvasDimensions();
        },
        true
      );
    } else {
      //The browser does not support Javascript event binding
    }
  };

  useEffect(() => {
    new p5(Sketch, sketchRef.current);
  }, []);

  return <div ref={sketchRef}></div>;
};

export default P5Sketch;
