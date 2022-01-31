import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationDialogComponent } from '../shared/dialog/information-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ColorInputDirective } from './directives/string-color-change.directive'
@NgModule({
  declarations: [
    InformationDialogComponent,
    ColorInputDirective
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    InformationDialogComponent,
    MatDialogModule,
    ColorInputDirective
  ]
})

export class SharedModule { }
