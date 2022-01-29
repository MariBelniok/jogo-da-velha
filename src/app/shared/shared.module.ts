import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationDialogComponent } from '../shared/dialog/information-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    InformationDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    InformationDialogComponent,
    MatDialogModule
  ]
})

export class SharedModule { }
