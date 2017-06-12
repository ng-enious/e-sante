import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprofileComponent } from './comprofile.component';

describe('ComprofileComponent', () => {
  let component: ComprofileComponent;
  let fixture: ComponentFixture<ComprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
