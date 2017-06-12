import {Component, OnInit, ViewChild, ChangeDetectionStrategy, ViewEncapsulation,AfterViewInit} from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {Observable} from 'rxjs';
import "rxjs/add/operator/filter";
import "rxjs/add/operator/count";
import {Router,ActivatedRoute} from '@angular/router'
import {
  AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';
import * as firebase from 'firebase';
import {isUndefined} from "util";
@Component({
  selector: 'app-ncjob',
  templateUrl: './ncjob.component.html',
  styleUrls: ['./ncjob.component.css','./css/bootstrap.css','./css/font-awesome.css','./css/main.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated
})
export class NcjobComponent implements OnInit ,AfterViewInit{
  position = 0;
  items = [];
  x=[];
  items2=[];
  clicked=true;
  myldoc=false;
  keyword='';
  loadd=['0'];
  dd: String = "";
  selectedfile;
  @ViewChild('pos', undefined)
  pos: any;
  @ViewChild('etud', undefined)
  etud: any;
  @ViewChild('exp', undefined)
  exp: any;
  @ViewChild('desc', undefined)
  desc: any;
  @ViewChild('exig', undefined)
  exig: any;
  @ViewChild('avant', undefined)
  avant: any;
  @ViewChild('sal', undefined)
  sal: any;
  @ViewChild('empla', undefined)
  empla: any;
  @ViewChild('load', undefined)
  load: any;
  @ViewChild('load2', undefined)
  load2: any;
  persent=20;
  bufferValuee=['0'];
  buffer="buffer";
  loader=true;
  numberOfItems;
  jobs:Observable<any>;
  mydocs:Observable<any>;
  constructor(public afService: AngularFire,private route:ActivatedRoute,private  router:Router) {
    this.jobs= afService.database.list('/jobs/',{
      query: {
        orderByChild: "date"
      }
    }).map(items=>{
      const filtered=items.filter(item=>item.cid===this.route.snapshot.params['id']);
      return filtered;
    });
    this.numberOfItems = this.jobs.count();
    this.jobs.subscribe(res => {
      this.loader=false

    });
    this.afService.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Not Logged in. ncjob");


          this.router.navigate(['login']);
        }
        else
        {
        this.mydocs = afService.database.list('/entreprise/', {
          query: {
            orderByChild: "date"
            //  equalTo:auth.auth.uid
          }
        }).map(items=>{
          const filtered=items.filter(item=>item.uid===auth.auth.uid);
          return filtered;
        })
      }})
    this.mydocs.subscribe(res => {
      this.loader=false

    });

  }


  ngOnInit()
  {
  }
  ngAfterViewInit()
  {
    this.count2(this.x);
  }


  count2(tab)
  {
    var refr=firebase.database().ref('/jobs/');
    refr.orderByChild('cid').equalTo(this.route.snapshot.params['id']).on('value', function(dataSnapshot) {
      var x=dataSnapshot.numChildren();
      console.log(x);
      tab[0]=x;
    });
  }


  get_company(key)
  {
    return this.afService.database.object('/entreprise/'+this.route.snapshot.params['id']+'/');
  }



}

