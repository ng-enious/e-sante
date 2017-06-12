/**
 * Created by Sofiane on 01/03/2017.
 */
import {Component, ViewEncapsulation, ViewChild,Pipe,PipeTransform,OnInit} from '@angular/core'
import {
  AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';

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
import {Router} from "@angular/router";
@Component({
    selector: 'forum',
    templateUrl:'./forum.html',
    styleUrls:  ['./assets/css/bootstrap.css','./assets/css/bootstrap-material-design.css',
        './assets/css/style.css','./assets/css/colors.css'],

    encapsulation: ViewEncapsulation.Emulated

})
export class Forum {
  destinations: Array<Package> = [];
  dest: any[];
  dest2;
  keyword='';
  currentuser;
  @ViewChild('title')
  title: any;
  @ViewChild('desc')
  desc: any;
  @ViewChild('search')
  search: any;
  post:FirebaseListObservable<any>;
  loader=true;

  constructor(public afService: AngularFire,private alertCenterService: AlertCenterService,private router:Router) {
    this.afService.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Not Logged in. forum");


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
      this.loader=false

    });
  }

  alert: Alert = new Alert(AlertType.INFO, '', 'Ceci a été partager avec succée');

  animation = 'fancy';
  align = 1;

  sendAnAutoDismissingAlert() {
    const alert = new Alert(AlertType.INFO, 'ceci a été publier avec succée', '', 2000);

    this.alertCenterService.alert(alert);
  }

  getLeft() {
    switch (this.align) {
      case 0:
        return '0';
      case 1:
        return '20%';
      case 2:
        return '60%';
    }
  }

  getRight() {
    switch (this.align) {
      case 0:
        return '60%';
      case 1:
        return '20%';
      case 2:
        return '0';
    }
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
    this.sendAnAutoDismissingAlert();
  }

  get_name(key)
  {
    return this.afService.database.object('/registeredUsers/'+key+'/');

  }




}

