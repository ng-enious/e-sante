import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {PackageCom} from './compackage';
import * as _ from 'lodash';
import {AngularFire} from 'angularfire2';

import {PackageServiceCom} from "./PackageCom.service";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-searchcom',
  templateUrl: './searchcom.component.html',
  styleUrls: ['./searchcom.component.css','./css/bootstrap.css','./css/font-awesome.css','./css/main.css'],
  providers: [PackageServiceCom]
})
export class SearchcomComponent implements OnInit,AfterViewInit {

  destinations: Array<PackageCom> = [];
  loader=true;
  @ViewChild('search')
  search: any;
  constructor(private route:ActivatedRoute,public afService: AngularFire,private packageService: PackageServiceCom,private  router:Router)
  {
    this.afService.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in. search comm");

          this.router.navigate(['login']);

        }
  })
  }

  ngOnInit()
  {
    this
      .packageService
      .packageData
      .subscribe((packages: Array<PackageCom>) => {

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

  ngAfterViewInit()
  {
    this.search.nativeElement.value = this.route.snapshot.params['id'];
  }

  sortByPrice () {
    this.destinations = _.sortBy(
      this.destinations, function(d: any) {
        return parseInt(d['uid'].replace(',', ''), 10);
      }
    );
  }

}
