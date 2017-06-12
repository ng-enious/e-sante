import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdetailComponent } from './jdetail.component';

describe('JdetailComponent', () => {
  let component: JdetailComponent;
  let fixture: ComponentFixture<JdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
