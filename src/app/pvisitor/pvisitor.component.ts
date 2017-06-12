/**
 * Created by Sofiane on 02/03/2017.
 */
import {Component, ElementRef, ViewChild, ViewEncapsulation, AfterViewInit,OnInit} from '@angular/core';
import {AF} from "../../providers/af";
import { AngularFire, AuthProviders, AuthMethods,FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import {ImageCropperComponent} from '../vu/imageCropperComponent';
import {CropperSettings} from '../vu/cropperSettings';
import {Bounds} from '../vu/model/bounds';
import {CropPosition} from '../vu/model/cropPosition';
import {isUndefined} from "util";
import {Router,ActivatedRoute} from '@angular/router'
import {Observable} from "rxjs/Observable";
@Component({
  selector: 'app-pvisitor',
  templateUrl: './pvisitor.component.html',
  styles: ['@import "https://fonts.googleapis.com/css?family=Roboto"; @import "https://fonts.googleapis.com/icon?family=Material+Icons";  '],
  styleUrls:  ['./stylesheets/font-awesome.min.css','./stylesheets/ionicons.min.css',
    './stylesheets/animate.css','./stylesheets/aos.min.css','./stylesheets/bootstrap.css',
    './stylesheets/materialize.css','./stylesheets/style-grey.css'],
 // styleUrls: ['./pvisitor.component.css']
  encapsulation: ViewEncapsulation.Emulated
})
export class PvisitorComponent implements  OnInit,AfterViewInit{

  public isLoggedIn: boolean;
  public user: FirebaseListObservable<any>;
  public formation : FirebaseListObservable<any>;
  public experiences : FirebaseListObservable<any>;
  public organisation : FirebaseListObservable<any>;
  public certification : FirebaseListObservable<any>;
  public langue : FirebaseListObservable<any>;
  public user2: FirebaseListObservable<any>;
  public messages: FirebaseListObservable<any>;
  public name : string;
  public mail : string;
  public custom:string;
  public fformation=[];
  public fcerti=[];
  public exper=[];
  public organis=[];
  public llangue =[];
  id$: Observable<string>;
  public custom1:string;
  public isloading=true;
  @ViewChild('msg', undefined)
  msg: any;
  loader=true;
  data:any;
  data2:any;
  currentuser;
  friends=[];
  request=[];
  requestme=[];

  constructor(public afService: AngularFire,private route:ActivatedRoute,private router:Router) {
    this.user2 = afService.database.list('/user');
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.

    this.afService.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");

          this.isLoggedIn = false;
          this.router.navigate(['login']);

        }
        else {
          console.log("Successfully Logged in.2");

          //this.user2.push({name: "ali", uid: auth.auth.uid});

          this.currentuser=auth.auth.uid;
          /*var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid);
           var update={
           name:'merci',
           atr:'try'
           };

           var result=userRef.update(update);
           */
          this.isLoggedIn = true;

        }
      }
    );
  }
  ngAfterViewInit()
  {

  }
  ngOnInit() {

    this.id$ = this.route.params.pluck('id');
    this.id$.subscribe(res=>{

      /*var playersRef = firebase.database().ref("/registeredUsers/");

       playersRef.orderByChild("email").equalTo(auth.auth.email).on("child_added", function(data) {
       console.log(data.val().email);
       console.l(data.val().name);
       });

       this.user = afService.database.list('/registeredUsers/',{
       query: {
       orderByChild: "email",
       equalTo:auth.auth.email
       }
       });


       */


      this.formation= this.afService.database.list('/registeredUsers/'+res+'/formations');
      var reffor = firebase.database().ref('/registeredUsers/'+res+'/formations');
      reffor.once("value")
        .then((snapshot) =>{
          var a = snapshot.hasChildren(); // true
          this.fformation[0]=a;
        });
      this.experiences= this.afService.database.list('/registeredUsers/'+res+'/experience');
      var refexp = firebase.database().ref('/registeredUsers/'+res+'/experience');
      refexp.once("value")
        .then((snapshot) =>{
          var a = snapshot.hasChildren(); // true
          this.exper[0]=a;
        });
      this.certification=this.afService.database.list('/registeredUsers/'+res+'/certification');
      var refcer = firebase.database().ref('/registeredUsers/'+res+'/certification');
      refcer.once("value")
        .then((snapshot) =>{
          var a = snapshot.hasChildren(); // true
          this.fcerti[0]=a;
        });
      this.organisation=this.afService.database.list('/registeredUsers/'+res+'/organisation');
      var reforg = firebase.database().ref('/registeredUsers/'+res+'/organisation');
      reforg.once("value")
        .then((snapshot) =>{
          var a = snapshot.hasChildren(); // true
          this.organis[0]=a;
        });
      // this.organisation.subscribe(res => {this.organis=false});
      this.langue=this.afService.database.list('/registeredUsers/'+res+'/langue');
      var reflan = firebase.database().ref('/registeredUsers/'+res+'/langue');
      reflan.once("value")
        .then((snapshot) =>{
          var a = snapshot.hasChildren(); // true
          this.llangue[0]=a;
        });

      this.user = this.afService.database.list('/registeredUsers/',{
        query: {
          orderByKey:true,
          equalTo:res
        }
      });

      this.user.subscribe(res => {this.loader=false});


    });
    this.requestt(this.request);
    this.friend(this.friends);
    this.requesttme(this.requestme);



  }

send_request()
{
  var userRef = firebase.database().ref('/registeredUsers').child(this.route.snapshot.params['id']).child('invitation');
  var update = {
    uid:this.currentuser,
    date:0 - Date.now()
  };
  var result = userRef.push(update);
}

delete_request()
{
  var refr=firebase.database().ref('/registeredUsers').child(this.route.snapshot.params['id']).child('invitation');
  refr.orderByChild('uid').equalTo(this.currentuser).once("value").then( function(snapshot) {
    snapshot.forEach(function(data) {
      refr.child(data.key).remove();
    });

  })
}

  delete_request_me()
  {
    var refr=firebase.database().ref('/registeredUsers').child(this.currentuser).child('invitation');
    refr.orderByChild('uid').equalTo(this.route.snapshot.params['id']).once("value").then( function(snapshot) {
      snapshot.forEach(function(data) {
        refr.child(data.key).remove();
      });

    })
  }
  accept_friend()
  {
    var refr=firebase.database().ref('/registeredUsers').child(this.currentuser).child('invitation');
    refr.orderByChild('uid').equalTo(this.route.snapshot.params['id']).once("value").then( function(snapshot) {
      snapshot.forEach(function(data) {
        refr.child(data.key).remove();
      });

    })
    var userRef=firebase.database().ref('/registeredUsers').child(this.route.snapshot.params['id']).child('amis');
    var update = {
      uid:this.currentuser
    };
    var result = userRef.push(update);
    var userRef2=firebase.database().ref('/registeredUsers').child(this.currentuser).child('amis');
    var update2 = {
      uid:this.route.snapshot.params['id']
    };
    var result2 = userRef2.push(update2);
  }

  delete_friend()
  {
    var refr=firebase.database().ref('/registeredUsers').child(this.route.snapshot.params['id']).child('amis');
    refr.orderByChild('uid').equalTo(this.currentuser).once("value").then( function(snapshot) {
      snapshot.forEach(function(data) {
        refr.child(data.key).remove();
      });

    })
    var refr2=firebase.database().ref('/registeredUsers').child(this.currentuser).child('amis');
    refr2.orderByChild('uid').equalTo(this.route.snapshot.params['id']).once("value").then( function(snapshot) {
      snapshot.forEach(function(data) {
        refr2.child(data.key).remove();
      });

    })
  }


  friend(tab)
  {
    var refr=firebase.database().ref('/registeredUsers').child(this.route.snapshot.params['id']).child('amis');
    refr.orderByChild('uid').equalTo(this.currentuser).on('value', function(dataSnapshot) {
      var x=dataSnapshot.numChildren();
      console.log(x);
      tab[0]=x;
    });
  }
  requestt(tab)
  {
    var refr=firebase.database().ref('/registeredUsers').child(this.route.snapshot.params['id']).child('invitation');
    refr.orderByChild('uid').equalTo(this.currentuser).on('value', function(dataSnapshot) {
      var x=dataSnapshot.numChildren();
      console.log(x);
      tab[0]=x;
    });
  }


  requesttme(tab)
  {
    var refr=firebase.database().ref('/registeredUsers').child(this.currentuser).child('invitation');
    refr.orderByChild('uid').equalTo(this.route.snapshot.params['id']).on('value', function(dataSnapshot) {
      var x=dataSnapshot.numChildren();
      console.log(x);
      tab[0]=x;
    });
  }

  get_cover_element(id)
  {
    document.getElementById(id).click();
  }


  send_message2(content,current,route)
  {
    this.afService.auth.subscribe(
      (auth) => {
        var ref = firebase.database().ref("message");
        ref.once("value")
          .then(function(snapshot) {
            var b = snapshot.child(current + route).hasChildren(); // true
            var c = snapshot.child(route + current).hasChildren(); // false

            if (c)
            {
              var userRef = firebase.database().ref('/message/' + route+current+'/discussion');
              var x= current + route;
              var update4 = {

                sid: current,
                content: content,
                date: Date.now(),
                type:1
              };
              var result = userRef.push(update4);
              var userRef = firebase.database().ref('/message/'+route+current)
              var update3 =  {

                rid: route,
                sid: current,
                date:0-Date.now()

              };
              var result2 = userRef.update(update3);
              document.getElementById("fermer").click();
          }
          else if(b)
            {
              var userRef = firebase.database().ref('/message/' +current + route+'/discussion');
              var x= current + route;
              var update4 = {

                sid: current,
                content: content,
                date: Date.now(),
                type:1
              };
              var result = userRef.push(update4);
              var userRef = firebase.database().ref('/message/'+current + route)
              var update3 =  {

                rid: route,
                sid: current,
                date:0-Date.now()

              };
              var result2 = userRef.update(update3);
              document.getElementById("fermer").click();
            }
          else {
              var userRef = firebase.database().ref('/message/'+current + route+'/discussion');
              var x= current + route;
              var update4 = {

                sid: current,
                content: content,
                date: Date.now(),
                type:1
              };
              var result = userRef.push(update4);
              var userRef = firebase.database().ref('/message/'+current + route)
              var update3 =  {

                rid: route,
                sid: current,
                date:0-Date.now()

              };
              var result2 = userRef.update(update3);
              document.getElementById("fermer").click();

            }
      });
        this.msg.nativeElement.value = "";
      });
  }


  send_message(content)
  {
   this.send_message2(content,this.currentuser,this.route.snapshot.params['id']);
  }
}
