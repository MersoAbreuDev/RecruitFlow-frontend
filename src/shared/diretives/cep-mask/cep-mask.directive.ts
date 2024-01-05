import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { conformToMask } from 'angular2-text-mask';

@Directive({
  selector: '[cepMask]'
})
export class CepMaskDirective {
  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;

    const unmaskedValue = initialValue.replace(/\D/g, '');

    const maskedValue = this.maskCep(unmaskedValue);

    this.control.control?.setValue(maskedValue, { emitEvent: false });
  }

  maskCep(value: string): string {
    if (value.length <= 5) {
      return value.replace(/^(\d{0,5})/, '$1');
    } else {
      return value.replace(/^(\d{0,5})(\d{0,3})/, '$1-$2');
    }
  }
}
