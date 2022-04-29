import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormControlDirective, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SimpleInputComponent,
      multi: true,
    },
  ],
})
export class SimpleInputComponent implements ControlValueAccessor {
  @Input()
  public placeholder = '';

  @Input()
  public errorMessage = '';

  @Input()
  public label = '';

  public disabled: boolean;
  public value = '';
  public touched = false;

  public onChange: any = () => {}
  public onTouche: any = () => {}

  public writeValue(obj: any): void {
    console.log(obj)
    this.value = obj;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouche = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public setValue(event: string) {
    this.onChange(event);
  }

  public setTouched() {
    this.touched = true;
    this.onTouche(this.touched);
  }
}
