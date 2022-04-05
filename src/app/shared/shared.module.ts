import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationDialogComponent } from '../shared/dialog/information-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ColorInputDirective } from './directives/string-color-change.directive';
import { SimpleInputComponent } from './inputs/simple-input/simple-input.component'
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    InformationDialogComponent,
    ColorInputDirective,
    SimpleInputComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  exports: [
    InformationDialogComponent,
    MatDialogModule,
    ColorInputDirective,
    SimpleInputComponent,
  ]
})

export class SharedModule { }
