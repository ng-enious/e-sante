/**
 * Created by Sofiane on 01/03/2017.
 */
import {Component, ViewEncapsulation, ViewChild,Pipe,PipeTransform,OnInit,AfterViewInit} from '@angular/core'
import {
  AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';
import {Router,ActivatedRoute} from '@angular/router'
import {PackageService} from './package.service';
import {Package} from './package';
import * as firebase from 'firebase';
import {Subject} from 'rxjs/Subject'
import {AlertCenterService} from 'ng2-alert-center';
import {AlertType} from 'ng2-alert-center';
import {Alert} from 'ng2-alert-center';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import * as _ from 'lodash';
@Component({
    selector: 'forum',
    templateUrl:'./forum.html',
    styleUrls:  ['./assets/css/bootstrap.css','./assets/css/bootstrap-material-design.css',
        './assets/css/style.css','./assets/css/colors.css'],

    encapsulation: ViewEncapsulation.Emulated,
  providers: [PackageService]

})
export class ForumSearch implements AfterViewInit {
  destinations: Array<Package> = [];
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
  constructor(private route:ActivatedRoute,public afService: AngularFire,private packageService: PackageService,private router:Router) {
    this.afService.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Not Logged in. forum2");


          this.router.navigate(['login']);
        }
        else {

          this.currentuser = auth.auth.uid;
        }
      });

    this.post= afService.database.list('/forum/',{
      query: {
        orderByChild: "date"
      }
    });
    this.post.subscribe(res => {
      console.log('hi'+res);
     // this.loader=false

    });

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
      .subscribe((packages: Array<Package>) => {

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
getkey(pos)
{

  for(var key in pos) {
    var value = pos[key];
    console.log(value);
  }
}
  post_a_post(title,desc)
  {
    this.afService.auth.subscribe(
      (auth) => {
        var userRef = firebase.database().ref('/forum');
        var update = {

          title: title,
          desc:desc,
          uid: auth.auth.uid,
          date:  0-Date.now(),
          etat:1
        };
        var result = userRef.push(update);
      });
    this.title.nativeElement.value = "";
    this.desc.nativeElement.value = "";
  }

  get_name(key)
  {
    return this.afService.database.object('/registeredUsers/'+key+'/');

  }


  refreshData() {
    //re-set the ui
    this.destinations.length = 0;

    //make the http request
    this.packageService.loadAllPackages();
  }

  sortByPrice () {
    this.destinations = _.sortBy(
      this.destinations, function(d: any) {
        return parseInt(d['title'].replace(',', ''), 10);
      }
    );
  }



}

