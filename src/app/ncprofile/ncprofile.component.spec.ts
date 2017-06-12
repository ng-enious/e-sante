import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcprofileComponent } from './ncprofile.component';

describe('NcprofileComponent', () => {
  let component: NcprofileComponent;
  let fixture: ComponentFixture<NcprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
