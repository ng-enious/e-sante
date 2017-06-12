import {Component, OnInit, ViewChild} from '@angular/core';
import * as firebase from 'firebase';
import {isUndefined} from "util";
@Component({
  selector: 'app-passwordmail',
  templateUrl: './passwordmail.component.html',
  styleUrls: ['./bootstrap.css','./app.css','./passwordmail.component.css']
})
export class PasswordmailComponent implements OnInit {
  public error=[];
  public valid=[];
  @ViewChild('mail', undefined)
  mail: any;
  constructor() { }

  ngOnInit() {
  }
  mailer2(mail,err,vall,maill) {
    var auth = firebase.auth();
    if (mail == '')
      this.error[0] = 'please enter your adress mail';
    else {
      auth.sendPasswordResetEmail(mail).then(function () {
        vall[0] = 'An email is sent Please check your mailbox';
        err[0]= undefined
      }, function (error) {
        err[0] = error;
        vall[0]= undefined
        // An error happened.
      });
       this.mail.nativeElement.value='';
    }
  }
  mailer(mail) {
    this.mailer2(mail,this.error,this.valid,this.mail);

  }

}
