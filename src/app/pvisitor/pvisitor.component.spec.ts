import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvisitorComponent } from './pvisitor.component';

describe('PvisitorComponent', () => {
  let component: PvisitorComponent;
  let fixture: ComponentFixture<PvisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
