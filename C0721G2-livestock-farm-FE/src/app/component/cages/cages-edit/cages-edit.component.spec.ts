import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CagesEditComponent } from './cages-edit.component';

describe('CagesEditComponent', () => {
  let component: CagesEditComponent;
  let fixture: ComponentFixture<CagesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CagesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CagesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
