/**
 * Created by Sofiane on 03/03/2017.
 */
import {Component,ViewEncapsulation, OnInit} from '@angular/core'
import {PackageJob} from './jobpackage';
import * as _ from 'lodash';
import {AngularFire} from 'angularfire2';
import * as firebase from 'firebase';
import {PackageServiceJob} from "./PackageJob.service";
@Component({
    selector: 'job',
    styleUrls:  ['./css/bootstrap.min.css','./css/styleme.css',
        './font-awesome/css/font-awesome.min.css',
        './owlslider/owl-carousel/owl.carousel.css','./owlslider/owl-carousel/owl.template.css'],
    templateUrl:'./job.html',
    encapsulation: ViewEncapsulation.Emulated,
  providers: [PackageServiceJob]

})
export class Job  implements  OnInit{
  destinations: Array<PackageJob> = [];
  loader=true;
  constructor(public afService: AngularFire,private packageService: PackageServiceJob)
  {

  }

  ngOnInit()
  {
    this
      .packageService
      .packageData
      .subscribe((packages: Array<PackageJob>) => {

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

  sortByPrice () {
    this.destinations = _.sortBy(
      this.destinations, function(d: any) {
        return parseInt(d['poste'].replace(',', ''), 10);
      }
    );
  }

  get_company(key)
  {
    return this.afService.database.object('/entreprise/'+key+'/');
  }
}
