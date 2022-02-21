import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCreateALotComponent } from './individual-create-a-lot.component';

describe('IndividualCreateALotComponent', () => {
  let component: IndividualCreateALotComponent;
  let fixture: ComponentFixture<IndividualCreateALotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualCreateALotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualCreateALotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
