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
    p.colourPalette = [
      "#0b3954",
      "#087e8b",
      "#64abbb",
      "#bfd7ea",
      "#df99a5",
      "#ff5a5f",
      "#e43c42",
      "#c81d25",
    ];

    p.setup = () => {
      p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
    };

    p.draw = () => {
      p.background(255);
      p.pill();
      p.donut();
      p.trippleHex();
      p.infinity();
      p.noLoop();
    };



    p.infinity = () => {
      p.translate(p.width / 2, p.height / 2);
      p.stroke(p.random(p.colourPalette));
      p.fill(p.random(p.colourPalette));
      p.scale(2);
      p.strokeWeight(4);      
      p.beginShape();
      p.curveVertex(0, 0);
      p.curveVertex(55, 30);
      p.curveVertex(77.5, 0);
      p.curveVertex(55, -30);
      // p.curveVertex(0 - 40, 0 - 40);
      // p.curveVertex(0 - 40, 0 - 60);
      // p.curveVertex(0 + 40, 0 - 40);
      // p.curveVertex(0 + 40, 0 - 60);
      // p.curveVertex(0 - 40, 0 + 40);
      // p.curveVertex(0 - 40, 0 + 60);
      // p.curveVertex(0 + 40, 0 + 40);
      // p.curveVertex(0 + 40, 0 + 60);
      
      p.curveVertex(0, 0);
      p.curveVertex(-55, 30);
      p.curveVertex(-77.5, 0);
      p.curveVertex(-55, -30);
      p.curveVertex(0, 0);
      p.endShape(p.CLOSE);
      p.translate(-p.width / 2, -p.height / 2);
    };

    p.pill = () => {
      p.translate(p.width / 4 * 3, p.height / 4 * 3);
      const colours = ShuffleArray(p.colourPalette);
      let size = p.width / 10;
      let distanceMultiplier = size/colours.length;
      for (let i = 0; i < colours.length; i++) {
        p.stroke(colours[i]);
        p.fill(colours[i]);
        p.rect(i * distanceMultiplier/4, i * distanceMultiplier/2, size/2, size, 20, 20);
        size = size - distanceMultiplier; 
      }
      p.translate(-p.width / 4 * 3, -p.height / 4 * 3);
    };

    p.donut = () => {
      p.translate(p.width / 4, p.height / 4);
      for (let i = 0; i < 96; i++) {
        p.fill(p.random(p.colourPalette));
        p.ellipse(0, 100, 40, 80);
        p.rotate(p.PI / 24);
      }
      p.translate(-p.width / 4, -p.height / 4);
    };

    p.trippleHex = () => {
      p.translate(p.width / 4 * 3, p.height / 4); 
      let size = p.width / 10;
      for (let i = 0; i < 4; i++) {
        p.stroke(p.random(p.colourPalette));
        p.fill(p.random(p.colourPalette));
        p.hexagon(0, 0, size);
        size = size / 2;
      }
      p.translate(-p.width / 4 * 3, -p.height / 4);
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
