import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordmailComponent } from './passwordmail.component';

describe('PasswordmailComponent', () => {
  let component: PasswordmailComponent;
  let fixture: ComponentFixture<PasswordmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
