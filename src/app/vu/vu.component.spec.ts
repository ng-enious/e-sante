import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ImageCropperComponent} from 'ng2-img-cropper';
import { VuComponent } from './vu.component';

describe('VuComponent', () => {
  let component: VuComponent;
  let fixture: ComponentFixture<VuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VuComponent,ImageCropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
