/**
 * Created by Sofiane on 15/04/2017.
 */
//our root app component
import {Component, Directive, Output, EventEmitter, Input, SimpleChange} from '@angular/core'
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/Rx';
@Directive({
  selector: 'img[default]',
  host: {
    '(error)':'updateUrl()',
    '[src]':'src'
  }
})
export class Defaultmedia {
  @Input() src:string;
  @Input() default:string;

  updateUrl() {
    this.src = this.default;
  }
}
