
import {Component, OnInit, ViewChild, ChangeDetectionStrategy, ViewEncapsulation,AfterViewInit} from '@angular/core';
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
import {isUndefined} from "util";
@Component({
  selector: 'app-cjob',
  templateUrl: './cjob.component.html',
  styleUrls: ['./cjob.component.css','./css/bootstrap.css','./css/font-awesome.css','./css/main.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated
})
export class CjobComponent implements OnInit ,AfterViewInit{
  position = 0;
  x=[];
  items = [];
  items2=[];
  clicked=true;
  myldoc=false;
  keyword='';
  loadd=['0'];
  dd: String = "";
  selectedfile;
  @ViewChild('pos', undefined)
  pos: any;
  @ViewChild('etud', undefined)
  etud: any;
  @ViewChild('exp', undefined)
  exp: any;
  @ViewChild('desc', undefined)
  desc: any;
  @ViewChild('exig', undefined)
  exig: any;
  @ViewChild('avant', undefined)
  avant: any;
  @ViewChild('sal', undefined)
  sal: any;
  @ViewChild('empla', undefined)
  empla: any;
  @ViewChild('load', undefined)
  load: any;
  @ViewChild('load2', undefined)
  load2: any;
  persent=20;
  bufferValuee=['0'];
  buffer="buffer";
  loader=true;
  numberOfItems;
  jobs:Observable<any>;
  mydocs:Observable<any>;
  constructor(public afService: AngularFire,private route:ActivatedRoute , private router:Router) {
    this.jobs= afService.database.list('/jobs/',{
      query: {
        orderByChild: "date"
      }
    }).map(items=>{
      const filtered=items.filter(item=>item.cid===this.route.snapshot.params['id']);
      return filtered;
    });
    this.numberOfItems = this.jobs.count();
    this.jobs.subscribe(res => {
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

    });

  }


  ngOnInit()
  {
    console.log(this.numberOfItems.count(function() { return length; }));

  }




  create_job(poste,niv,exp,desc,exig,avantage,salaire,loc)
  {
    if(poste=='')
      alert('Merci de saisir la poste du travaille offert');
    else
    if(niv=='')
      alert('Merci de saisir le niveau');
    else if(exp=='')
      alert('Merci de saisir l\'experience');
    else
    if (desc=='')
      alert('Merci de saisir une déscription');
    else if(exig=='')
      alert('Merci de saisir une ou plusieur exigence');
    else if(avantage=='')
      alert('Merci de saisir les avantages');
    else if(loc=='')
      alert('Merci de saisir l\'emplacement du travaille');
    else {


      this.afService.auth.subscribe(
        (auth) => {

          var userRef = firebase.database().ref('/jobs');

          var update = {

            poste: poste,
            niveau: niv,
            experience: exp,
            description:desc,
            exigence: exig,
            cid:this.route.snapshot.params['id'],
            date: 0 - Date.now(),
            avantage:avantage,
            salaire:salaire,
            loc:loc
          };


          var result = userRef.push(update);
          document.getElementById('my').click();
        }
      );
      this.pos.nativeElement.value = "";
      this.desc.nativeElement.value = "";
      this.etud.nativeElement.value = "";
      this.exig.nativeElement.value = "";
      this.avant.nativeElement.value = "";
      this.sal.nativeElement.value = "";
      this.exp.nativeElement.value = "";
      this.empla.nativeElement.value = "";
    }
  }

  ngAfterViewInit()
  {
    this.count2(this.x);

  }

  count(tab)
  {
    var refr=firebase.database().ref('/jobs/');
    refr.orderByChild('cid').equalTo(this.route.snapshot.params['id']).once("value").then( function(snapshot) {
      var x=0;
      snapshot.forEach(function(data) {
        x++;
        console.log(x);
      });
      tab[0]=x;
      console.log(tab[0]);
    })

  }
  count2(tab)
  {
    var refr=firebase.database().ref('/jobs/');
    refr.orderByChild('cid').equalTo(this.route.snapshot.params['id']).on('value', function(dataSnapshot) {
      var x=dataSnapshot.numChildren();
   console.log(x);
    tab[0]=x;
    });
  }
  get_company(key)
  {
    return this.afService.database.object('/entreprise/'+this.route.snapshot.params['id']+'/');
  }


  update_job(poste,niv,exp,desc,exig,avantage,salaire,loc,key)
  {

    if(poste=='')
      alert('Merci de saisir la poste du travaille offert');
    else
    if(niv=='')
      alert('Merci de saisir le niveau');
    else if(exp=='')
      alert('Merci de saisir l\'experience');
    else
    if (desc=='')
      alert('Merci de saisir une déscription');
    else if(exig=='')
      alert('Merci de saisir une ou plusieur exigence');
    else if(avantage=='')
      alert('Merci de saisir les avantages');
    else if(loc=='')
      alert('Merci de saisir l\'emplacement du travaille');
    else {

      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/jobs').child(key);
          var update = {
            poste: poste,
            niveau: niv,
            experience: exp,
            description:desc,
            exigence: exig,
            cid:this.route.snapshot.params['id'],
            date: 0 - Date.now(),
            avantage:avantage,
            salaire:salaire,
            loc:loc
          };
          var result = userRef.update(update);
          document.getElementById("fe"+key).click();
        });
    }
  }

  delete_job(key) {
    var a = confirm("Êtes-vous sûr de vouloir supprimer cette offre d'emploi ? ");
    if (a == true) {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/jobs').child(key);

          var result = userRef.remove();
          document.getElementById("fe" + key).click();
        });
    }
  }
}

