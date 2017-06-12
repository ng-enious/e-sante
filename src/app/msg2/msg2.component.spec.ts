import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Msg2Component } from './msg2.component';

describe('Msg2Component', () => {
  let component: Msg2Component;
  let fixture: ComponentFixture<Msg2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Msg2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Msg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
