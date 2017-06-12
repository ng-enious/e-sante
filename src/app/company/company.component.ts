

import {Component, OnInit, ViewChild,ChangeDetectionStrategy} from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {Observable} from 'rxjs';
import "rxjs/add/operator/filter";
import {
  AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';
import * as firebase from 'firebase';
import {isUndefined} from "util";
import {Route, Router} from "@angular/router";
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css','./css/bootstrap.css','./css/font-awesome.css','./css/main.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CompanyComponent implements OnInit {
  position = 0;
  items = [];
  items2=[];
  clicked=true;
  myldoc=false;
  keyword='';
  loadd=['0'];
  dd: String = "";
  selectedfile;
  @ViewChild('nom', undefined)
  nom: any;
  @ViewChild('desc', undefined)
  desc: any;
  @ViewChild('spec', undefined)
  spec: any;
  @ViewChild('adr', undefined)
  adr: any;
  @ViewChild('tel', undefined)
  tel: any;
  @ViewChild('site', undefined)
  site: any;
  @ViewChild('load', undefined)
  load: any;
  @ViewChild('load2', undefined)
  load2: any;
  persent=20;
  bufferValuee=['0'];
  buffer="buffer";
  loader=true;
  docs:FirebaseListObservable<any>;
  mydocs:Observable<any>;
  currentuser;
  x=[];
  constructor(public afService: AngularFire,private router:Router) {
    this.docs= afService.database.list('/entreprise/',{
      query: {
        orderByChild: "date"
      }
    });
    this.docs.subscribe(res => {
      this.loader=false

    });
    this.afService.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Not Logged in. article");


          this.router.navigate(['login']);
        }
        else
        {
        this.currentuser=auth.auth.uid;
        this.mydocs = afService.database.list('/entreprise/', {
          query: {
            orderByChild: "date"
            //  equalTo:auth.auth.uid
          }
        }).map(items=>{
          const filtered=items.filter(item=>item.uid===auth.auth.uid);
          return filtered;
        })
      }})
    this.mydocs.subscribe(res => {
      this.loader=false
      this.count2(this.x);

    });

  }


ngOnInit()
{
}




create_company(nom,spec,desc,adr,tel,site)
{
  if(nom=='')
    alert('Merci de saisir le Nom de la page');
  else
    if(spec=='')
      alert('Merci de saisir la spécialiter');
  else
    if (desc=='')
      alert('Merci de saisir une déscription');
  else if(adr=='')
      alert('Merci de saisir l\'address de votre entreprise ');
  else if(tel=='')
    alert('Merci de saisir votre numéro de téléphone ');
  else {


      this.afService.auth.subscribe(
        (auth) => {

          var userRef = firebase.database().ref('/entreprise');

           var update = {

              name: nom,
              spec: spec,
              desc: desc,
              adr: adr,
              uid: auth.auth.uid,
              date: 0 - Date.now(),
              tel:tel,
              site: site,
              avatar: "https://firebasestorage.googleapis.com/v0/b/sofiane-5a3d8.appspot.com/o/parentcompany.png?alt=media&token=3f04c644-3b6a-423e-ad03-74975debb69c",
              cover: "https://firebasestorage.googleapis.com/v0/b/sofiane-5a3d8.appspot.com/o/main_cover.jpg?alt=media&token=51b981b3-0cb4-4c4d-8851-206f8d1fad57"

            };


          var result = userRef.push(update);
          document.getElementById('my').click();
        }
      );
      this.nom.nativeElement.value = "";
      this.desc.nativeElement.value = "";
      this.spec.nativeElement.value = "";
      this.site.nativeElement.value = "";
      this.adr.nativeElement.value = "";
      this.tel.nativeElement.value = "";
    }
}




  get_name(key)
  {
    return this.afService.database.object('/registeredUsers/'+key+'/');

  }
  get_name2(key)
  {
    return this.afService.database.object('/registeredUsers/'+key+'/');

  }



  delete_doc(key) {
    var a = confirm("Êtes-vous sûr de vouloir supprimer cette page");
    if (a == true) {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/entreprise').child(key);
          var result = userRef.remove();
        });
      var ref=firebase.database().ref('/jobs')
      ref.orderByChild("cid").equalTo(key).on("value", function(snapshot) {

        snapshot.forEach(function(data) {

          var record = data.val();
            ref.child(data.key).remove();
            return true;

        });
      });

    }
  }
  count2(tab)
  {
    var refr=firebase.database().ref('/entreprise/');
    refr.orderByChild('uid').equalTo(this.currentuser).on('value', function(dataSnapshot) {
      var x=dataSnapshot.numChildren();
      console.log(x);
      tab[0]=x;
    });
  }
}

