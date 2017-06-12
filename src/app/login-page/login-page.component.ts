import { Component } from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, AuthMethods,FirebaseListObservable } from 'angularfire2';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./bootstrap.css','./app.css','./login-page.component.css']
})
export class LoginPageComponent {
  public error: any;
  items: FirebaseListObservable<any>;
  name: any;
  isLoggedIn;

  constructor(public af: AngularFire,private router: Router,public afService: AF) {

    this.af.auth.subscribe(auth => {
      if(auth) {
        if(auth == null) {
          this.isLoggedIn = false;

        }
        else {
          this.isLoggedIn = true;
          this.router.navigateByUrl('');
        }
      }
    });
  }


  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        this.router.navigate(['']);
      }).catch(
      (err) => {
        this.error = err;
      })
  }
  loginFb() {
this.loginFb2(this.afService,this);

  }
  loginFb2(serv,ca) {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        console.log(success);
        var ref = firebase.database().ref("registeredUsers");
        ref.once("value")
          .then(function(snapshot) {
            var b = snapshot.child(success.uid).hasChildren(); // true
            if(!b)
            {
              console.log('here');
              ca.writeUserData(success.uid,success.auth.displayName,success.auth.email,success.auth.photoURL);
            }
          })
        //  console.log(this.af.auth.u);
        console.log(success);
        console.log('bjr');
        setTimeout(()=>{this.router.navigate(['']);},2000);

      }).catch(
      (err) => {
        this.error = err;
      })

  }

  writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('registeredUsers/' + userId).set({
      name: name.toLowerCase(),
      email: email,
      avatar : imageUrl,
      cover:'https://firebasestorage.googleapis.com/v0/b/sofiane-5a3d8.appspot.com/o/Ecover.jpg?alt=media&token=bd6c6aaf-9071-4d32-be9e-0373500028b7'
    });
    this.router.navigate(['']);
  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
          email: formData.value.email,
          password: formData.value.password
        },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        }).then(
        (success) => {
          console.log(success);
          this.router.navigate(['']);
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        })
    }
  }
  loginWithEmail(event, email, password){
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['']);
    })
      .catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }


  registera2(event, email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['']);
    })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.message;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {

          this.error = 'Mot de passe incorrect'
        } else {
          this.error=errorMessage
        }
        console.log(error);
      });
  }

  registera(event, email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['']);
    })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.message;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }




}
