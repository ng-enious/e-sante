import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchcomComponent } from './searchcom.component';

describe('SearchcomComponent', () => {
  let component: SearchcomComponent;
  let fixture: ComponentFixture<SearchcomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchcomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
