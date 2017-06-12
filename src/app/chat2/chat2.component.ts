import {
  Component, OnInit, ViewEncapsulation, AfterViewInit, AfterViewChecked,
  AfterContentChecked, ChangeDetectionStrategy,ChangeDetectorRef
} from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';
import {AF} from "../../providers/af";
import { AngularFire, AuthProviders, AuthMethods,FirebaseListObservable } from 'angularfire2';
import {Observable} from "rxjs";
import {MdInputModule} from '@angular/material';
import "rxjs/add/operator/filter";
import 'rxjs/add/operator/merge';
import 'rxjs/observable/combineLatest';
import 'rxjs/observable/concat';
import * as firebase from 'firebase';
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-chat2',
  templateUrl: './chat2.component.html',
  styleUrls: ['./chat2.component.css'],
  encapsulation: ViewEncapsulation.Native,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Chat2Component implements OnInit,AfterViewInit,AfterViewChecked ,AfterContentChecked{
  @ViewChild('ffgg') private ffgg: any;
  @ViewChild('ali') private ali: any;
  public newMessage: string;
  public messages: FirebaseListObservable<any>;
  public mess: Observable<any>;
  public mess2: Observable<any>;
  robser:Observable<any>;
 lm=[];
  y = firebase.database.ServerValue.TIMESTAMP;
  name: any;
  adr:any;
  tim:any;
  img:any;
  msgVal: string = '';
  currentuser;
  constructor(public afService: AngularFire,private route:ActivatedRoute,private _router:Router) {

    this.afService.auth.subscribe(

      (auth) => {
        if (auth == null) {
          console.log("Not Logged in. chat");


          this._router.navigate(['login']);
        }
        else {
          this.currentuser = auth.auth.uid;
        }
      }  );

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


  }
  ngAfterContentChecked() {

  }
ngAfterViewChecked()
{

}

  ngOnInit() {

  }

  ngAfterViewInit()
  {
    setTimeout(() => {
      this.ffgg.nativeElement.click();
    }, 1000);

  }
  trackByFn(index, item) {
    return index;
  }
  sendMessage(theirMessage: string) {
    this.messages.push({ message: theirMessage, name: this.adr.displayName, startedAt: this.y,uid:this.adr.uid , pic: this.img });
    this.msgVal = '';
  }

hello()
{
  alert('hello');
  console.log('helllo');
}
  isMe(uid) {
    if(uid == this.adr.uid)
      return false;
    else
      return true;
  }
  get_name(key)
  {
    return this.afService.database.object('/registeredUsers/'+key+'/');

  }
  get_company(key)
  {
    return this.afService.database.object('/message/'+key+'/discussion').last;
  }

  last_message2(key,lm,index)
  {
    var refr=firebase.database().ref('/message').child(key).child('discussion');
    refr.limitToLast(1).once("value").then( function(snapshot) {
      snapshot.forEach(function(data) {
        var value = data.val();
       console.log(value.content);
    lm[index]=value.content;
      });

    })
  }
  last_message(key,index)
  {
this.last_message2(key,this.lm,index);
  }

  delete_conversation(key)
  {
    var a= confirm("Êtes-vous sûr de vouloir supprimer cette discussion ");
    if (a == true) {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/message').child(key);

          var result = userRef.remove();
        });
    }
  }


}
