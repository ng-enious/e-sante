import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleForumComponent } from './single-forum.component';

describe('SingleForumComponent', () => {
  let component: SingleForumComponent;
  let fixture: ComponentFixture<SingleForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
