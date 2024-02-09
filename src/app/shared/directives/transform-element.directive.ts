import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTransformElement]',
})
export class TransformElementDirective {
  @Input()
  transformValue!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onClick() {
    this.moveElement();
  }

  private moveElement() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', this.transformValue);
  }
}
