
import {
  Component, OnInit, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, AfterViewInit,
  ElementRef, ChangeDetectorRef
} from '@angular/core';
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
@Component({
  selector: 'app-msg2',
  templateUrl: './msg2.component.html',
  styleUrls: ['./msg2.component.css']
})
export class Msg2Component implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('hgg') private hgg: any;
  msg:Observable<any>;
  private sub: any;
  private sub2: any;
  msgVal: string = '';
  id$: Observable<string>;
  imgs;
  private parentRouteId: number;
  currentuser;
  selectedfile;
  ref;
  x=[];
  y=[];
  constructor(public afService: AngularFire,private route:ActivatedRoute,private _router:Router,private refs: ChangeDetectorRef) {
    this.afService.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Not Logged in. msg2");


          this._router.navigate(['login']);
        }
        else {
          this.currentuser = auth.auth.uid;
        }
      })
  //  this.msg= this.afService.database.list('/message/'+this.id$+'/discussion');
  }

  ngOnInit() {

    this.id$ = this.route.params.pluck('id');
    this.id$.subscribe(res=>{ this.msg= this.afService.database.list('/message/'+res+'/discussion');
    this.ref=res;
      this.getid(this.ref,this.y,this.x);

      setTimeout(() => {
        this.refs.detectChanges();
      }, 2000);
 console.log("le key est "+this.ref);
      this.scrollToBottom();
    })



  }
  sendMessage(theirMessage,img) {
    if((theirMessage!='')||(img!='')) {
      if (img == '') {
        var userRef = firebase.database().ref('/message/' + this.ref + '/discussion');
        var update = {

          sid: this.currentuser,
          content: theirMessage,
          date: Date.now(),
          type:1
        };
        var result = userRef.push(update);
        var userRef2 = firebase.database().ref('/message/' + this.ref);
        var update2 = {
          date: 0 - Date.now()
        };
        var result2 = userRef2.update(update2);
        this.msgVal = '';
      }
      else
      {
        this.afService.auth.subscribe(
          (auth) => {
        var userRef = firebase.database().ref('/message/' + this.ref + '/discussion');
        var x=Date.now();
        var cloudRef = firebase.storage().ref('/message').child(this.ref+'/'+x+this.selectedfile.name).put(this.selectedfile);
        cloudRef.on('state_changed',function (snapshot) {

          if(snapshot.bytesTransferred==snapshot.totalBytes) {
            var download = cloudRef.snapshot.downloadURL;
            var update3 = {

              sid: auth.auth.uid,
              content: theirMessage,
              date: Date.now(),
              img:download,
              type:2
            };
            var result = userRef.push(update3);
            var userRef2 = firebase.database().ref('/message/' + this.ref);
            var update4 = {
              date: 0 - Date.now()
            };
            var result2 = userRef2.update(update4);

          }
        })
            this.msgVal = '';
            this.hgg.nativeElement.value = "";

      })
      }
    }
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();

  }

  get_name(key)
  {
    return this.afService.database.object('/registeredUsers/'+key+'/');
  }
  get_sid()
  {
    return this.afService.database.object('/message/'+this.ref);
  }
  // getnamess(tab,ids) {
  //   var refr = firebase.database().ref('/registeredUsers/');
  //   refr.orderByChild('name').equalTo(ids[0]).once("value").then(function (snapshot) {
  //
  //     snapshot.forEach(function (childSnapshot) {
  //
  //       var value = childSnapshot.val();
  //       tab[0] = value.name;
  //       console.log(tab[0]);
  //       tab[1] = value.uid;
  //       console.log(tab[1]);
  //     });
  //
  //   })

  //   var refr2=firebase.database().ref('/registeredUsers/');
  //   refr2.orderByChild('name').equalTo(ids[1]).once("value").then( function(snapshot) {
  //     snapshot.forEach(function (childSnapshot) {
  //
  //       var value = childSnapshot.val();
  //       tab[2] = value.name;
  //       console.log(tab[2]);
  //       tab[3] = value.uid;
  //       console.log(tab[3]);
  //     });
  //   })
  // }
  getid(key,y,tab) {
    tab[0]='';
    tab[2]='';
    var refr = firebase.database().ref('/message/');
    console.log(key);
    refr.orderByKey().equalTo(key).once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {

        var value = childSnapshot.val();
       y[0]=value.sid;
        y[1] = value.rid;
      });

      var refr = firebase.database().ref('/registeredUsers/');
      console.log(y[0]);
      refr.orderByKey().equalTo(y[0]).once("value").then(function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

          var value = childSnapshot.val();
          tab[0] = value.name;
          console.log(tab[0]);
          tab[1] = y[0];
          console.log(tab[1]);
        });

      })

      var refr2=firebase.database().ref('/registeredUsers/');
      console.log(y[1]);
      refr2.orderByKey().equalTo(y[1]).once("value").then( function(snapshot) {
        snapshot.forEach(function (childSnapshot) {

          var value = childSnapshot.val();
          tab[2] = value.name;
          console.log(tab[2]);
          tab[3] = y[1];
          console.log(tab[3]);
        });
      })

      this.ref.reattach();
    });
  }

  upload_img()
  {
    this.hgg.nativeElement.click();

  }

  handleFileTarget(event)
  {
    this.selectedfile=event.target.files[0];
  }
  videfile() {
    this.hgg.nativeElement.value = "";
  }
}
