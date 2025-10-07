import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appScrollCenterDirective]',
})
export class ScrollCenterDirective {
  @Input('appScrollCenterDirective') activeClass: string = 'active_btn';
  private observer!: MutationObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.scrollActiveIntoCenter();

    // Observe class changes in child nodes
    this.observer = new MutationObserver(() => {
      this.scrollActiveIntoCenter();
    });

    this.observer.observe(this.el.nativeElement, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class'],
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private scrollActiveIntoCenter() {
    const container = this.el.nativeElement as HTMLElement;
    const activeElement = container.querySelector(
      `.${this.activeClass}`
    ) as HTMLElement;

    if (activeElement) {
      const parentWidth = container.clientWidth;
      const elementLeft = activeElement.offsetLeft;
      const elementWidth = activeElement.clientWidth;

      container.scrollTo({
        left: elementLeft - parentWidth / 2 + elementWidth / 2,
        behavior: 'smooth',
      });
    }
  }
}
