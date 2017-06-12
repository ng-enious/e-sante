import { Component, OnInit,ViewChild } from '@angular/core';

import {ImageCropperComponent} from './imageCropperComponent';
import {CropperSettings} from './cropperSettings';
import {Bounds} from './model/bounds';
import {CropPosition} from './model/cropPosition';
@Component({
  selector: 'test-app',
  template: `<div class="file-upload">
    <input id="custom-input" type="file" (change)="fileChangeListener($event)">
</div>
<img-cropper #cropper [image]="data" [settings]="cropperSettings"></img-cropper>
<br>`
})
export class VuComponent implements OnInit {

  data:any;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined)
  cropper:ImageCropperComponent;

  constructor() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 1455;
    this.cropperSettings.height = 300;
    this.cropperSettings.croppedWidth =1455;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 700;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.noFileInput = true;
    this.data = {};
  }

  fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

  ngOnInit() {
  }

}
