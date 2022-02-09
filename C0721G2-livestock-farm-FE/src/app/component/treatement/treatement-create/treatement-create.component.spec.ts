import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatementCreateComponent } from './treatement-create.component';

describe('TreatementCreateComponent', () => {
  let component: TreatementCreateComponent;
  let fixture: ComponentFixture<TreatementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
