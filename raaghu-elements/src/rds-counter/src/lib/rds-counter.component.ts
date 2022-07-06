import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rds-counter',
  templateUrl: './rds-counter.component.html',
  styleUrls: ['./rds-counter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RdsCounterComponent),
    multi: true
  }]
})
export class RdsCounterComponent implements OnInit {

  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };

  @Input() counterValue: number = 0;

  @Input() Title = '';

  @Input() label?: string;

  @Input() min = 0;

  @Input() max = 40;

  @Input() width= 124;

  @Input() colorVariant?: string;

  @Output() counterChange = new EventEmitter<number>();

  invalidCount: boolean = false;

  id: string = '';



  constructor() { }

  writeValue(obj: any): void {
    this.counterValue = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  onKeyup(event: any) {
    this.onChange(event.target.value);
  }

  focus() {
    this.onTouched();
  }

  onMouseup(event: any) {
    this.onChange(event.target.value)
  }


  ngOnInit(): void {
  }

  public get classList(): string[] {
    var clsList: string[] = [];
    const bgColor = 'btn btn-icon counter-' + `${this.colorVariant}`;
    clsList.push(bgColor);
    if (`${this.colorVariant}` !== 'light' && `${this.colorVariant}` !== 'warning' && `${this.colorVariant}` !== 'info' && `${this.colorVariant}` !== 'primary') {
      clsList.push('primary');
    }
    return clsList;
  }

  decrement() {
    if (this.counterValue > this.min) {
      this.counterValue--;
      this.invalidCount = false;
    } else {
      this.invalidCount = true;
      return;
    }
    this.onChange(this.counterValue);
    this.counterChange.emit(this.counterValue);
  }

  increment() {
    if (this.counterValue < this.max) {
      this.counterValue++;
      this.invalidCount = false;
    } else {
      this.invalidCount = true;
      return;
    }

    this.onChange(this.counterValue);
    this.counterChange.emit(this.counterValue);
  }

}
