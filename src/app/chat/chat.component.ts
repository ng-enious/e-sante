import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import {AF} from "../../providers/af";
import { AngularFire, AuthProviders, AuthMethods,FirebaseListObservable } from 'angularfire2';
import {Observable} from "rxjs";
import {MdInputModule} from '@angular/material';
import "rxjs/add/operator/filter";
import 'rxjs/add/operator/merge';
import 'rxjs/observable/combineLatest';
import 'rxjs/observable/concat';
import * as firebase from 'firebase';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./bootstrap.css','./chat.component.css']
})
export class ChatComponent implements OnInit,AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public newMessage: string;
  public messages: FirebaseListObservable<any>;
  public mess: Observable<any>;
  public mess2: Observable<any>;
  robser:Observable<any>;
   y = firebase.database.ServerValue.TIMESTAMP;
  name: any;
  adr:any;
  tim:any;
  img:any;
  msgVal: string = '';
  currentuser;
  constructor(public afService: AngularFire) {

    this.afService.auth.subscribe(
      (auth) => {this.currentuser=auth.auth.uid;}
    );

    this.messages = afService.database.list('/messages/', {
      query: {
        orderByChild: "message",
        equalTo: "ff",
      }
    });
    this.mess = afService.database.list('/message/', {
      query: {
        orderByChild: "date"
      }
    }).map(items=>{
      const filtered=items.filter(item=> item.$key.startsWith(this.currentuser)||item.$key.endsWith(this.currentuser));
      console.log(filtered)
      return filtered;
    });

    this.mess2 = afService.database.list('/message/', {
      query: {
        orderByKey: true,
        endAt:this.currentuser
      }
    });

    this.afService.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
        this.adr=auth.auth;
        this.tim = this.afService.auth;
      }
      if(!auth.auth.photoURL)
        this.img="http://www.freeiconspng.com/uploads/grab-vector-graphic-person-icon--imagebasket-13.png";
       else  this.img=auth.auth.photoURL;
    });
  }


  ngOnInit() {
    // this.robser.subscribe(
    //   function (x) { console.log(x); },
    //   function (err) { console.log('Error: %s', err); },
    //   function () { console.log('Completed' )} );
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
get_message(key)
{

}

  sendMessage(theirMessage: string) {
    this.messages.push({ message: theirMessage, name: this.adr.displayName, startedAt: this.y,uid:this.adr.uid , pic: this.img });
    this.msgVal = '';
  }


  isMe(uid) {
    if(uid == this.adr.uid)
      return false;
    else
      return true;
  }


}
