import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommissionComponent } from './new-commission.component';

describe('NewCommissionComponent', () => {
  let component: NewCommissionComponent;
  let fixture: ComponentFixture<NewCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
