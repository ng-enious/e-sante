
import {Injectable} from '@angular/core';
import {Http, Headers, BaseRequestOptions, } from '@angular/http';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {forEach} from "@angular/router/src/utils/collection";
import {Package} from "app/forum - Copie/package";

@Injectable()
export class PackageService {
  packageData: Subject<Array<Package>> = new BehaviorSubject<Array<Package>>([]);
  arr=2;

  constructor(private http: Http) {

  }

  loadAllPackages (x2) {
    var x=x2.toLowerCase();
    this.http
      .get('https://sofiane-5a3d8.firebaseio.com/registeredUsers.json?orderBy="name"&startAt="'+x+'"&endAt="'+x+'\uf8ff"&print=pretty"')
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
