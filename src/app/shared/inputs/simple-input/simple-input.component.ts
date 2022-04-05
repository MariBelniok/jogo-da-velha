import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.scss']
})
export class SimpleInputComponent {
  @Input()
  public placeholder = '';

  @Input()
  public name = '';

  @Input()
  public errorMessage = '';

  @Input()
  public label = '';

  @Input()
  public form = new FormGroup({});
}
