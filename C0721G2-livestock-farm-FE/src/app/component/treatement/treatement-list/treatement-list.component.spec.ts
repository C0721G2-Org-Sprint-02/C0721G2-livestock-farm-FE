import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatementListComponent } from './treatement-list.component';

describe('TreatementListComponent', () => {
  let component: TreatementListComponent;
  let fixture: ComponentFixture<TreatementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
