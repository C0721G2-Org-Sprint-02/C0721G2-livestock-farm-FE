import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CagesCreateComponent } from './cages-create.component';

describe('CagesCreateComponent', () => {
  let component: CagesCreateComponent;
  let fixture: ComponentFixture<CagesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CagesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CagesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
