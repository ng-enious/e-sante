import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {
  AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';
import {Router} from "@angular/router";
@Component({
  selector: 'app-disable',
  templateUrl: './disable.component.html',
  styleUrls: ['./disable.component.css']
})
export class DisableComponent implements OnInit {

  user;
  currentuser;
  public error: any;
  constructor(public afService: AngularFire,private router:Router) {

    this.afService.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in. disable");


          this.router.navigate(['login']);
        }
        else {
          this.currentuser=auth.auth.uid;
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

  delete_account(current) {
    var x: any;
    firebase.auth().currentUser.reauthenticate(firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, current))
      .then(() => {



        var ref2=firebase.database().ref('/documents')
        ref2.orderByChild("uid").equalTo(this.currentuser).on("value", function(snapshot) {

          snapshot.forEach(function(data) {
            ref2.child(data.key).remove();
            return true;
          });

        });
        firebase.storage().ref('documents').child(this.currentuser).delete();

        var user = firebase.auth().currentUser;
        user.delete().then(function() {
          // User deleted.
        }, function(error) {
          // An error happened.
        });
      }, (error) => {
        this.error = "Votre mot de passe est incorrect.";
      });
  }

}
