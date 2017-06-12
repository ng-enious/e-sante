import {Component, ViewChild} from '@angular/core';
import { AF } from "../providers/af";
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import { AngularFire, AuthProviders, AuthMethods,FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import {FacebookService, FacebookLoginResponse} from 'ng2-facebook-sdk'
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import {Http} from "@angular/http";
import {debounceTime} from "rxjs/operator/debounceTime";
import {Observable} from "rxjs/Observable";
import {PackageService} from "./hero.service";

import {PackUser} from "./packuser";
import {Package} from "./forum - Copie/package";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./bootstrap.css','./app.component.css'],
  providers: [PackageService]
})
export class AppComponent {
  @ViewChild('tx', undefined)
  tx: any;
  public isLoggedIn: boolean;
  loading: boolean = true;
  focused=false;
  destinations: Array<Package> = [];
  heroes: Observable<PackUser[]>;
  private searchTerms = new Subject<string>();

currentuser;
  public user: FirebaseListObservable<any>;
  public messages: FirebaseListObservable<any>;
  post:Subject<Array<PackUser>> = new BehaviorSubject<Array<PackUser>>([]);
  //public user2 = firebase.auth().currentUser;
  //public xxx=  firebase.auth.GoogleAuthProvider.credential(); AccessToken.getCurrentAccessToken().toString()
 //public  credential=firebase.auth.FacebookAuthProvider.credential(getAuthResponse());

  constructor(public afService: AngularFire, private router: Router, private  http : Http,private packageService: PackageService) {
  //  this.user = afService.database.list('/user');
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.

    this.afService.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in. 2");

          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
        else {
          console.log("Successfully Logged in.2");
this.currentuser=auth.auth.uid;
          this.isLoggedIn = true;
      //  this.router.navigate(['']);
        }
      }
    );

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  logout() {
    this.afService.auth.logout();
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }

  // loadAllPackages (xx) {
  //
  //   this.http
  //     .get('https://sofiane-5a3d8.firebaseio.com/registeredUsers.json?orderBy="name"&startAt="'+xx+'"&endAt="'+xx+'\uf8ff"&print=pretty"')
  //     .map((res: any) => {
  //       return res.json();
  //     })
  //     .debounceTime(3000)
  //     .distinctUntilChanged()
  //     .subscribe ((data: any) => {
  //
  //         /*let a = Object.keys(data).map((el) => {
  //          return {
  //          obj : data[el],
  //          key : el
  //          }
  //          } )*/
  //         Object.keys(data).map((el) => {
  //           let obj = {
  //             key : ""
  //           }
  //           obj = data[el];
  //           obj.key = el;
  //           return obj;
  //         })
  //         console.info(data);
  //         this.post.next(data);
  //
  //       },
  //       (err: any) => console.error("loadAllPackages: ERROR"),
  //       () => console.log("loadAllPackages: always")
  //     );
  // }
  search(term: string): void {
    this.searchTerms.next(term);
  }
  //
  // ngOnInit(): void {
  //   this.heroes = this.searchTerms
  //     .debounceTime(300)        // wait 300ms after each keystroke before considering the term
  //     .distinctUntilChanged()   // ignore if next search term is same as previous
  //     .switchMap(term => term   // switch to new observable each time the term changes
  //       // return the http search observable
  //       ? this.heroSearchService.search(term)
  //       // or the observable of empty heroes if there was no search term
  //       : Observable.of<PackUser[]>([]))
  //     .catch(error => {
  //       // TODO: add real error handling
  //       console.log(error);
  //       return Observable.of<PackUser[]>([]);
  //     });
  //
  // }

  ngOnInit()
  {

  }

  sortByPrice () {
    this.destinations = _.sortBy(
      this.destinations, function(d: any) {
        return parseInt(d['name'].replace(',', ''), 10);
      }
    );
  }

  refreshData(x) {

    //re-set the ui
    //
    //subscribe to the packageData stream
    if(x.length==0)
    {
      this.focused=false;
      this.destinations.length = 0;
    }
    else
    {
      this.focused=true;
    this
      .packageService
      .packageData
      .subscribe((packages: Array<Package>) => {

        //mimic a slow connection
        setTimeout(() => {
          //set packages
          this.destinations = packages;
          //sort the data
          this.sortByPrice();
        }, 300);
      });

    //make the http request
    //make the http request
    this.packageService.loadAllPackages(x);
    }
  }

unfocus()
{
  console.log('hna');

  setTimeout(()=>{ this.focused=false; }, 300);
}
isfocus()
{
    this.focused=true;

}
cliks()
{
  this.tx.nativeElement.value='';
}

}
