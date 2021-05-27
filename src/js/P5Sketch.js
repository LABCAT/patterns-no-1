import React, { useRef, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import ShuffleArray from "./functions/ShuffleArray";
import InfinitySymbol from "./InfinitySymbol";
import audio from "../audio/patterns-no-1.ogg";
import cueSet1 from "./cueSet1.js";
import cueSet2 from "./cueSet2.js";
import cueSet3 from "./cueSet3.js";

const P5Sketch = () => {
  const sketchRef = useRef();

  const Sketch = (p) => {
    
    p.canvas = null;

    p.canvasWidth = window.innerWidth;

    p.canvasHeight = window.innerHeight;

    p.song = null;

    p.tempo = 105;

    p.barAsSeconds = Math.floor(((60 / p.tempo) * 4) * 10000) / 10000;

    p.colourPalette = ["#1f2041","#4b3f72","#ffc857","#119da4","#19647e","#007991","#439a86","#a1b5d8"];

    p.cueSet1Completed = [];

    p.cueSet2Completed = [];

    p.cueSet3Completed = [];

    p.preload = () => {
        p.song = p.loadSound(audio);
    };

    p.setup = () => {
      p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      for (let i = 0; i < cueSet1.length; i++) {
          let vars = {
              'currentCue': (i + 1),
              'duration': cueSet1[i].duration,
              'midi': cueSet1[i].midi,
              'time': cueSet1[i].time,
          }
          p.song.addCue(cueSet1[i].time, p.executeCueSet1, vars);
      }

      for (let i = 0; i < cueSet2.length; i++) {
          let vars = {
              'currentCue': (i + 1),
              'duration': cueSet2[i].duration,
              'midi': cueSet2[i].midi,
              'time': cueSet2[i].time,
          }
          p.song.addCue(cueSet2[i].time, p.executeCueSet2, vars);
      }

      for (let i = 0; i < cueSet3.length; i++) {
          let vars = {
              'currentCue': (i + 1),
              'duration': cueSet3[i].duration,
              'midi': cueSet3[i].midi,
              'time': cueSet3[i].time,
          }
          p.song.addCue(cueSet3[i].time, p.executeCueSet3, vars);
      }
    };

    p.melody = [];

    p.draw = () => {
      if (p.song.isPlaying()) {
            for (var i = 0; i < p.melody.length; i++) {
                p.melody[i].update();
                p.melody[i].draw();
            }
        }
    }

    p.canReset = true;

    p.linesToDrawPerCue = 256;

    p.executeCueSet1 = (vars) => {
      const currentCue = vars.currentCue;
      if (!p.cueSet1Completed.includes(currentCue)) {
          if(vars.time > p.barAsSeconds * 16 && p.canReset){
            p.background(255);
            p.canReset = false;
            p.linesToDrawPerCue = 512;
          }
          p.cueSet1Completed.push(currentCue);
          for(let i=0; i < p.linesToDrawPerCue; i++){
              const w = p.random(10, 100) * p.random(p.random(p.random()));
              p.translateAndRotate();
              p.randomLine(w);
              p.pop();
          }

          const leftQuarter = p.random(1, p.width / 4);
        const rightQuarter = p.random(p.width / 4 * 3, p.width);
        const topQuarter = p.random(1, p.height / 4);
        const bottomQuarter = p.random(p.height / 4 * 3, p.height);
        const x = p.random([leftQuarter, rightQuarter]);
        const y = p.random([topQuarter, bottomQuarter]);
        const maxSize = currentCue > 64 ? p.width : p.width / 32 * currentCue;
        const size = p.random(maxSize / 16);
        p.translateAndRotate(x, y);
        p.trippleHex(size);  
        p.pop();
      }
    };

    p.executeCueSet2 = (vars) => {
        const currentCue = vars.currentCue;
        if (!p.cueSet2Completed.includes(currentCue)) {
            p.cueSet2Completed.push(currentCue);
            const size = 1 + currentCue / 100;
            const x = p.randomGaussian(0.5, 0.14) * p.width;
            const y = p.randomGaussian(0.5, 0.14) * p.height;
            p.melody.push(new InfinitySymbol(p, x, y, size, size, currentCue, p.random(p.colourPalette)));
            
        }
    };

    p.executeCueSet3 = (vars) => {
      const currentCue = vars.currentCue;
      if (!p.cueSet3Completed.includes(currentCue)) {
        p.cueSet3Completed.push(currentCue);
        const leftQuarter = p.random(1, p.width / 4);
        const rightQuarter = p.random(p.width / 4 * 3, p.width);
        const topQuarter = p.random(1, p.height / 4);
        const bottomQuarter = p.random(p.height / 4 * 3, p.height);
        const x = p.random([leftQuarter, rightQuarter]);
        const y = p.random([topQuarter, bottomQuarter]);
        const maxSize = currentCue > 128 ? p.width : p.width / 128 * currentCue;
        const size = p.random(maxSize / 32);
        // p.translateAndRotate(x, y);
        // p.trippleHex(size);  
        // p.pop();
      }
    };

    p.translateAndRotate = (x = 0, y = 0) => {
      x = x > 0 ? x : p.randomGaussian(0.5, 0.14) * p.width;
      y = y > 0 ? y : p.randomGaussian(0.5, 0.14) * p.height;
      const angle = (parseInt(p.random(8)) * (p.TAU/8))-p.PI*0.05;
      p.push();
      p.translate(x, y);
      p.rotate(angle);
    }

    p.drawPattern = () => {
      for(let i=0; i < 200; i++){
          const w = p.random(10, 100) * p.random(p.random(p.random()));
          p.translateAndRotate();
          p.randomShape(w);
      }
    };

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
      p.curveVertex(0, 0);
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

    p.mousePressed = () => {
      if (p.song.isPlaying()) {
            p.song.pause();
      } else {
          if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
              p.reset();
          }
          //document.getElementById("play-icon").classList.add("fade-out");
          p.canvas.addClass("fade-in");
          p.song.play();
      }
    };

  p.creditsLogged = false;

    p.logCredits = () => {
        if (
            !p.creditsLogged &&
            parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
        ) {
            p.creditsLogged = true;
            console.log(
            "Music: http://labcat.nz/",
            "\n",
            "Animation: https://github.com/LABCAT/cubes-no-1"
            );
        }
    };

    p.reset = () => {
            
    }

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
