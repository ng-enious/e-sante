/**
 * Created by Sofiane on 06/05/2017.
 */
/**
 * Created by Sofiane on 30/04/2017.
 */
import {PackageJob} from './jobpackage';
import {Injectable} from '@angular/core';
import {Http, Headers, BaseRequestOptions, } from '@angular/http';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class PackageServiceJob{
  packageData: Subject<Array<PackageJob>> = new BehaviorSubject<Array<PackageJob>>([]);
  arr=2;

  constructor(private http: Http) {

  }

  loadAllPackages () {
    this.http
      .get('https://sofiane-5a3d8.firebaseio.com/jobs.json')
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
