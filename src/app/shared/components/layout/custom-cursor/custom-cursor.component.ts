import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [],
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.scss'
})
export class CustomCursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('circleRef') private circleRef!: ElementRef<HTMLDivElement>;

  private mouseX = 0;
  private mouseY = 0;
  private posX = 0;
  private posY = 0;
  private rafId = 0;
  private isVisible = false;

  private readonly hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  private readonly prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ngAfterViewInit(): void {
    if (!this.hasFinePointer || this.prefersReducedMotion) return;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseleave', this.onMouseLeave);
    this.animate();
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseleave', this.onMouseLeave);
    cancelAnimationFrame(this.rafId);
  }

  private onMouseMove = (e: MouseEvent): void => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    if (!this.isVisible) {
      this.isVisible = true;
      this.posX = e.clientX;
      this.posY = e.clientY;
      this.circleRef.nativeElement.style.opacity = '1';
    }
  };

  private onMouseLeave = (): void => {
    this.isVisible = false;
    this.circleRef.nativeElement.style.opacity = '0';
  };

  private animate = (): void => {
    this.posX += (this.mouseX - this.posX) * 0.12;
    this.posY += (this.mouseY - this.posY) * 0.12;

    this.circleRef.nativeElement.style.transform =
      `translate(${this.posX}px, ${this.posY}px) translate(-50%, -50%)`;

    this.rafId = requestAnimationFrame(this.animate);
  };
}
