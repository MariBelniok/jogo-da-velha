import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { InformationDialogComponent } from './information-dialog.component';

const dialogMock = {
  message: 'message',
  buttonText: 'buttonText'
}

const dialogRefMock = {
  close: () => {}
}
describe('DialogComponent', () => {
  let component: InformationDialogComponent;
  let fixture: ComponentFixture<InformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationDialogComponent ],
      imports: [ MatDialogModule ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock},
        { provide: MAT_DIALOG_DATA, useValue: dialogMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when button is clicked', () => {
    const spy = spyOn(component.dialogRef, 'close');
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    fixture.detectChanges()

    expect(spy).toHaveBeenCalled();
  })
});
