import { Component, OnInit } from '@angular/core';
import {
  AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';
import * as firebase from 'firebase';
import {Router} from "@angular/router";
@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.component.html',
  styleUrls: ['./resetpw.component.css']
})
export class ResetpwComponent implements OnInit {
user;
  public error: any;
  constructor(private afService:AngularFire, private router:Router) {
    this.afService.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in. resetpass");

          this.router.navigate(['login']);

        }
  })
  }

  ngOnInit() {
    this.user = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }
change_password(current,newpass) {
  var x: any;
  firebase.auth().currentUser.reauthenticate(firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, current))
    .then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newpass).then(function() {
      });
    }, (error) => {
      this.error = "Votre mot de passe est incorrect.";
    });





}

}
