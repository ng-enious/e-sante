import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CjobComponent } from './cjob.component';

describe('CjobComponent', () => {
  let component: CjobComponent;
  let fixture: ComponentFixture<CjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
