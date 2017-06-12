import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chat2Component } from './chat2.component';

describe('Chat2Component', () => {
  let component: Chat2Component;
  let fixture: ComponentFixture<Chat2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chat2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chat2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
