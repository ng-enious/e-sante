import { Component } from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import {
  AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';
import * as firebase from 'firebase';
@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./bootstrap.css','./app.css','./registration-page.component.css']
})
export class RegistrationPageComponent {
  public error: any;
  public valid: any;
cover='https://firebasestorage.googleapis.com/v0/b/sofiane-5a3d8.appspot.com/o/Ecover.jpg?alt=media&token=bd6c6aaf-9071-4d32-be9e-0373500028b7';
  constructor(private afService: AF, private router: Router) { }

  register(event, name, email, password) {
    var cover = 'https://firebasestorage.googleapis.com/v0/b/sofiane-5a3d8.appspot.com/o/Ecover.jpg?alt=media&token=bd6c6aaf-9071-4d32-be9e-0373500028b7';
    var avatar = 'https://firebasestorage.googleapis.com/v0/b/sofiane-5a3d8.appspot.com/o/user.png?alt=media&token=a577b7b6-02bb-4515-bc85-7743403854bd';
    if (name == '')
      this.error = 'name required';


    else {
      event.preventDefault();
      this.afService.registerUser(email, password).then((user) => {
        this.afService.saveUserInfoFromForm(user.uid, name, email, avatar, cover).then(() => {
          this.router.navigate(['']);
        })
          .catch((error) => {
            this.error = error;
          });
      })
        .catch((error) => {
          this.error = error;
          console.log(this.error);
        });
    }
  }

  mail(mail) {
    var auth = firebase.auth();
    if (mail == '')
      this.error = 'please enter your adress mail';
    else {
      auth.sendPasswordResetEmail(mail).then(function () {
        this.valid = 'An email is sent Please check your mailbox';
      }, function (error) {
        this.error = error;
        // An error happened.
      });

    }
  }

}
