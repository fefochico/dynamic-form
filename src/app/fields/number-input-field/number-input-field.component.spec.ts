import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberInputFieldComponent } from './number-input-field.component';

describe('NumberInputFieldComponent', () => {
  let component: NumberInputFieldComponent;
  let fixture: ComponentFixture<NumberInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberInputFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
