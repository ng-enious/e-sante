

/**
 * Created by Sofiane on 01/03/2017.
 */
import {Component, ViewEncapsulation, ViewChild,Pipe,PipeTransform,OnInit,AfterViewInit} from '@angular/core'
import {
  AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';
import {Router,ActivatedRoute} from '@angular/router'
import {PackageDoc} from './docpackage';
import * as firebase from 'firebase';
import {Subject} from 'rxjs/Subject'
import {AlertCenterService} from 'ng2-alert-center';
import {AlertType} from 'ng2-alert-center';
import {Alert} from 'ng2-alert-center';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import * as _ from 'lodash';
import {PackageServiceDoc} from "./PackageDoc.service";
@Component({
  selector: 'app-searchdoc',
  templateUrl:'./searchdoc.component.html',
  styleUrls:  ['./searchdoc.component.css',
    './css/bootstrap.css','./css/font-awesome.css','./css/main.css'],

  encapsulation: ViewEncapsulation.Emulated,
  providers: [PackageServiceDoc]

})
export class SearchdocComponent implements AfterViewInit {
  destinations: Array<PackageDoc> = [];
  dest: any[];
  dest2;
  currentuser;
  @ViewChild('title')
  title: any;
  @ViewChild('desc')
  desc: any;
  @ViewChild('search')
  search: any;
  post:FirebaseListObservable<any>;
  loader=true;
  constructor(private route:ActivatedRoute,public afService: AngularFire,private packageService: PackageServiceDoc,private router:Router) {
    this.afService.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in. serach doc");

          this.router.navigate(['login']);

        }
      })

  }
  ngAfterViewInit()
  {
    this.search.nativeElement.value = this.route.snapshot.params['id'];
  }
  public ngOnInit () {
    //subscribe to the packageData stream
    this
      .packageService
      .packageData
      .subscribe((packages: Array<PackageDoc>) => {

        //mimic a slow connection
        setTimeout(() => {
          //set packages
          this.destinations = packages;
          this.loader=false;
          //sort the data
          this.sortByPrice();
        }, 1500);
      });

    //make the http request
    this.packageService.loadAllPackages();

  }


  get_name(key)
  {
    return this.afService.database.object('/registeredUsers/'+key+'/');

  }


  sortByPrice () {
    this.destinations = _.sortBy(
      this.destinations, function(d: any) {
        return parseInt(d['titre'].replace(',', ''), 10);
      }
    );
  }



}

