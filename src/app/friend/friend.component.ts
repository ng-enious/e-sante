import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';
import * as firebase from 'firebase';
@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./css/bootstrap.css','./friend.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendComponent implements OnInit {
  public friends : FirebaseListObservable<any>;
  public requests : FirebaseListObservable<any>;
  currentuser;
  nb_amie=[];
  nb_invit=[];
  loader=true;
  constructor(public afService: AngularFire ) {
    this.afService.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Not Logged in.");
        }
        else {
          console.log("Successfully Logged in friend");
          this.currentuser = auth.auth.uid;
        }
      });


    this.friends = afService.database.list('/registeredUsers/'+this.currentuser+'/amis');
    this.friends.subscribe(res => {
      this.loader=false;

    });
    this.requests = afService.database.list('/registeredUsers/'+this.currentuser+'/invitation',{
      query: {
        orderByChild: "date"
      }
    });
  }

  get_name(key)
  {
    return this.afService.database.object('/registeredUsers/'+key+'/');

  }

  delete_friend(uid)
  {
    var a=confirm('Vous etes sur de retirer cette amie ??');
    if(a)
    {
    var refr=firebase.database().ref('/registeredUsers').child(uid).child('amis');
    refr.orderByChild('uid').equalTo(this.currentuser).once("value").then( function(snapshot) {
      snapshot.forEach(function(data) {
        refr.child(data.key).remove();
      });

    })
    var refr2=firebase.database().ref('/registeredUsers').child(this.currentuser).child('amis');
    refr2.orderByChild('uid').equalTo(uid).once("value").then( function(snapshot) {
      snapshot.forEach(function(data) {
        refr2.child(data.key).remove();
      });

    })
    }
  }

  amie_count(tab)
  {
    var refr=firebase.database().ref('/registeredUsers').child(this.currentuser).child('amis');
    refr.on('value', function(dataSnapshot) {
      var x=dataSnapshot.numChildren();
      tab[0]=x;
    });
  }
  invit_count(tab)
  {
    var refr=firebase.database().ref('/registeredUsers').child(this.currentuser).child('invitation');
    refr.on('value', function(dataSnapshot) {
      var x=dataSnapshot.numChildren();
      tab[0]=x;
    });
  }

  accept_friend(key)
  {
    var refr=firebase.database().ref('/registeredUsers').child(this.currentuser).child('invitation');
    refr.orderByChild('uid').equalTo(key).once("value").then( function(snapshot) {
      snapshot.forEach(function(data) {
        refr.child(data.key).remove();
      });

    })
    var userRef=firebase.database().ref('/registeredUsers').child(key).child('amis');
    var update = {
      uid:this.currentuser
    };
    var result = userRef.push(update);
    var userRef2=firebase.database().ref('/registeredUsers').child(this.currentuser).child('amis');
    var update2 = {
      uid:key
    };
    var result2 = userRef2.push(update2);
  }
  delete_request(key)
  {
    var refr=firebase.database().ref('/registeredUsers').child(this.currentuser).child('invitation');
    refr.orderByChild('uid').equalTo(key).once("value").then( function(snapshot) {
      snapshot.forEach(function(data) {
        refr.child(data.key).remove();
      });

    })
  }

  ngOnInit() {
    this.scrollWin();
    this.amie_count(this.nb_amie);
    this.invit_count(this.nb_invit);
  }
  scrollWin() {
    window.scrollTo(0, 0);
  }
}
