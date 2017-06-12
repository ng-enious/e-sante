import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchdocComponent } from './searchdoc.component';

describe('SearchdocComponent', () => {
  let component: SearchdocComponent;
  let fixture: ComponentFixture<SearchdocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchdocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
