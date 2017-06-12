/**
 * Created by Sofiane on 30/04/2017.
 */
import {PackageDoc} from './docpackage';
import {Injectable} from '@angular/core';
import {Http, Headers, BaseRequestOptions, } from '@angular/http';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class PackageServiceDoc {
  packageData: Subject<Array<PackageDoc>> = new BehaviorSubject<Array<PackageDoc>>([]);
  arr=2;

  constructor(private http: Http) {

  }

  loadAllPackages () {
    this.http
      .get('https://sofiane-5a3d8.firebaseio.com/documents.json')
      .map((res: any) => {
        return res.json();
      })
      .subscribe ((data: any) => {

          /*let a = Object.keys(data).map((el) => {
           return {
           obj : data[el],
           key : el
           }
           } )*/
          Object.keys(data).map((el) => {
            let obj = {
              key : ""
            }
            obj = data[el];
            obj.key = el;
            return obj;
          })
          console.info(data);
          this.packageData.next(data);

        },
        (err: any) => console.error("loadAllPackages: ERROR"),
        () => console.log("loadAllPackages: always")
      );
  }


}
