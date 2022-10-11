import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[headerFont]',
})
export class HeaderDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.fontSize = '20px';
    el.nativeElement.style.fontWeight = '500';
    el.nativeElement.style.position = 'relative';
    el.nativeElement.style.borderBottom = '1px solid #dee2e6';
    el.nativeElement.style.lineHeight = '2.8rem';
    el.nativeElement.style.color = '#3459e6';
    el.nativeElement.style.paddingLeft = '1rem';
  }
}
