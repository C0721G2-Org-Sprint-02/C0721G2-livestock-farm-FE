import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CagesListComponent } from './cages-list.component';

describe('CagesListComponent', () => {
  let component: CagesListComponent;
  let fixture: ComponentFixture<CagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CagesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
