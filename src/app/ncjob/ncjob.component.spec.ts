import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcjobComponent } from './ncjob.component';

describe('NcjobComponent', () => {
  let component: NcjobComponent;
  let fixture: ComponentFixture<NcjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
