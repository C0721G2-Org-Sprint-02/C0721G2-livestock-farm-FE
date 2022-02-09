import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualDeleteComponent } from './individual-delete.component';

describe('IndividualDeleteComponent', () => {
  let component: IndividualDeleteComponent;
  let fixture: ComponentFixture<IndividualDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
