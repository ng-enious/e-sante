import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticComponent } from './artic.component';

describe('ArticComponent', () => {
  let component: ArticComponent;
  let fixture: ComponentFixture<ArticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
