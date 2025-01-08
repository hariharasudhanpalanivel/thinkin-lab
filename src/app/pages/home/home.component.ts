import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    (() => {
      let width: number;
      let height: number;
      let largeHeader: HTMLElement;
      let canvas: HTMLCanvasElement;
      let ctx: CanvasRenderingContext2D;
      let points: Point[];
      let target: Point;
      let animateHeader = true;
  
      interface Point {
          x: number;
          y: number;
          originX: number;
          originY: number;
          closest?: Point[];
          active?: number;
          circle?: Circle;
      }
  
      class Circle {
          pos: Point;
          radius: number;
          color: string;
          active: number | undefined;
  
          constructor(pos: Point, rad: number, color: string) {
              this.pos = pos;
              this.radius = rad;
              this.color = color;
          }
  
          draw() {
              if (!this.active) return;
              ctx.beginPath();
              ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
              ctx.fillStyle = `rgba(156,217,249,${this.active})`;
              ctx.fill();
          }
      }
  
      function initHeader() {
          width = window.innerWidth;
          height = window.innerHeight;
          target = { x: width / 2, y: height / 2, originX: width / 2, originY: height / 2 };
  
          largeHeader = document.getElementById('large-header')!;
          largeHeader.style.height = height + 'px';
  
          canvas = document.getElementById('demo-canvas') as HTMLCanvasElement;
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext('2d')!;
  
          points = [];
          for (let x = 0; x < width; x = x + width / 20) {
              for (let y = 0; y < height; y = y + height / 20) {
                  const px = x + Math.random() * width / 20;
                  const py = y + Math.random() * height / 20;
                  const p: Point = { x: px, originX: px, y: py, originY: py };
                  points.push(p);
              }
          }
  
          for (const p1 of points) {
              const closest: Point[] = [];
              for (const p2 of points) {
                  if (p1 !== p2) {
                      let placed = false;
                      for (let k = 0; k < 5; k++) {
                          if (!placed) {
                              if (!closest[k]) {
                                  closest[k] = p2;
                                  placed = true;
                              }
                          }
                      }
  
                      for (let k = 0; k < 5; k++) {
                          if (!placed) {
                              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                  closest[k] = p2;
                                  placed = true;
                              }
                          }
                      }
                  }
              }
              p1.closest = closest;
          }
  
          for (const point of points) {
              const c = new Circle(point, 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
              point.circle = c;
          }
      }
  
      function addListeners() {
          if (!('ontouchstart' in window)) {
              window.addEventListener('mousemove', mouseMove);
          }
          window.addEventListener('scroll', scrollCheck);
          window.addEventListener('resize', resize);
      }
  
      function mouseMove(e: MouseEvent) {
          let posx = 0;
          let posy = 0;
          if (e.pageX || e.pageY) {
              posx = e.pageX;
              posy = e.pageY;
          } else if (e.clientX || e.clientY) {
              posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
              posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
          }
          target.x = posx;
          target.y = posy;
      }
  
      function scrollCheck() {
          animateHeader = !(document.body.scrollTop > height);
      }
  
      function resize() {
          width = window.innerWidth;
          height = window.innerHeight;
          largeHeader.style.height = height + 'px';
          canvas.width = width;
          canvas.height = height;
      }
  
      function initAnimation() {
          animate();
          for (const point of points) {
              shiftPoint(point);
          }
      }
  
      function animate() {
          if (animateHeader) {
              ctx.clearRect(0, 0, width, height);
              for (const point of points) {
                  if (Math.abs(getDistance(target, point)) < 4000) {
                      point.active = 0.3;
                      point.circle!.active = 0.6;
                  } else if (Math.abs(getDistance(target, point)) < 20000) {
                      point.active = 0.1;
                      point.circle!.active = 0.3;
                  } else if (Math.abs(getDistance(target, point)) < 40000) {
                      point.active = 0.02;
                      point.circle!.active = 0.1;
                  } else {
                      point.active = 0;
                      point.circle!.active = 0;
                  }
  
                  drawLines(point);
                  point.circle!.draw();
              }
          }
          requestAnimationFrame(animate);
      }
  
      function shiftPoint(p: Point) {
        gsap.to(p, {
            duration: 1 + Math.random(),
            x: p.originX - 50 + Math.random() * 100,
            y: p.originY - 50 + Math.random() * 100,
            ease: "circ.inOut",
            onComplete: function () {
                shiftPoint(p);
            }
        });
    }
    
  
      function drawLines(p: Point) {
          if (!p.active) return;
          for (const close of p.closest!) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(close.x, close.y);
              ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
              ctx.stroke();
          }
      }
  
      function getDistance(p1: Point, p2: Point) {
          return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
      }
  
      initHeader();
      initAnimation();
      addListeners();
  })();
  
  
  }
}
