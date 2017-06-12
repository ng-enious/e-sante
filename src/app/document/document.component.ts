import {Component, OnInit, ViewChild,ChangeDetectionStrategy,AfterViewInit} from '@angular/core';
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
import {Router} from "@angular/router";
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css','./css/bootstrap.css','./css/font-awesome.css','./css/main.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentComponent implements OnInit {
  position = 0;
  items = [];
  x=[];
  items2=[];
  clicked=true;
  myldoc=false;
  keyword='';
  loadd=['0'];
  dd: String = "";
  selectedfile;
  @ViewChild('fich', undefined)
  fich: any;
  @ViewChild('desc', undefined)
  desc: any;
  @ViewChild('titre', undefined)
  titre: any;
  @ViewChild('load', undefined)
  load: any;
  @ViewChild('load2', undefined)
  load2: any;
  persent=20;
  bufferValuee=['0'];
  buffer="buffer";
  loader=true;
  currentuser;
  docs:FirebaseListObservable<any>;
  mydocs:Observable<any>;
  constructor(public afService: AngularFire,private router:Router) {
    this.docs= afService.database.list('/documents/',{
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
          console.log("Not Logged in. document");


          this.router.navigate(['login']);
        }
        else {
          this.currentuser = auth.auth.uid;
          this.mydocs = afService.database.list('/documents/', {
            query: {
              orderByChild: "date"
              //  equalTo:auth.auth.uid
            }
          }).map(items => {
            const filtered = items.filter(item => item.uid === auth.auth.uid);
            return filtered;
          })
        }})
    this.mydocs.subscribe(res => {
      this.loader=false
this.count(this.x);
    });

  }


  ngOnInit() {
  }


  showType(fileInput) {
    var files = fileInput.files;

    for (var i = 0; i < files.length; i++) {
      var name = files[i].name;
      var type = files[i].type;
      alert("Filename: " + name + " , Type: " + type);
    }
  }

  handleFileTarget(event) {
    this.selectedfile = event.target.files[0];
    console.log(this.selectedfile.type);
  }

  getfile() {
    document.getElementById('fich').click();
  }

  getfilename(fileInput) {
    var files = fileInput.files;
    var x = '';
    for (var i = 0; i < files.length; i++) {
      x = x + files[i].name;
    }
    return x;
  }

  videfile() {
    this.fich.nativeElement.value = "";
  }

  upload_tag(title, desc, tag,loader,buffer)
  {
    this.afService.auth.subscribe(
      (auth) => {
        var x = Date.now();
        var userRef = firebase.database().ref('/documents');
        var cloudRef = firebase.storage().ref('/document').child(auth.uid + '/' + x + this.selectedfile.name).put(this.selectedfile);
//var uplod=<HTMLInputElement>document.getElementById('loadd');
        cloudRef.on('state_changed', function (snapshot) {
          this.download = true;
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          loader[0] = progress;
          if (snapshot.bytesTransferred == snapshot.totalBytes) {

            var download = cloudRef.snapshot.downloadURL;
            var update = {

              titre: title,
              desc: desc,
              tags: tag,
              uid: auth.auth.uid,
              date: 0 - Date.now(),
              doc: download,
              refdata: cloudRef.snapshot.ref.fullPath,
            };
            var result = userRef.push(update);
            buffer[0]='0';
            loader[0]=0;
            document.getElementById('my').click();
          }
        })
        this.items = [];
        this.fich.nativeElement.value = "";
        this.desc.nativeElement.value = "";
        this.titre.nativeElement.value = "";
      });
  }
  upload(title, desc, tag) {
    this.bufferValuee[0]='100';
    this.upload_tag(title, desc, tag,this.loadd,this.bufferValuee);
  }

  upload_file(title, desc, file) {
    var x:string;
    x='';
    for (var i = 0; i < this.items.length; i++) {
      if(i==0)
        x=x+this.items[i].display;

      else
        x =x +' '+ this.items[i].display;
    }

    if (title == '')
      alert('Merci de saisir le titre');
    else if (desc == '')
      alert('Merci de saisir la déscription');
    else if (x == "")
      alert('Merci de saisir un ou plusieur taxonomie');
    else if (file == '')
      alert('Merci de saisir la fichier a publier');
    else if (this.selectedfile.type != 'application/pdf')
      alert('Merci de saisir un fichier de type PDF');
    else {
        this.upload(title, desc, x);
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


  try(tag,key)
  {
      setTimeout(()=> {
        this.items2=tag.split(" ");
      },500);

  }

  update(title,desc,key)
  {

      var x: string;
      x = '';
      for (var i = 0; i < this.items2.length; i++) {
        if (i == 0) {
          if(this.items2[i].display==undefined)
          {
            x = x + this.items2[i];
          }
          else
          x = x + this.items2[i].display;
          console.log(x);
        }

        else {
          if(this.items2[i].display==undefined)
          {
            x = x +' '+ this.items2[i];
          }
          else
            x = x + ' ' + this.items2[i].display;

          console.log(x);
        }
      }
      // this.clicked=false;

    this.updatedata(title,desc,key,x);
  }
  updatedata(title,desc,key,tag) {


    if (title == '')
      alert('Merci de saisir le titre');
    else if (desc == '')
      alert('Merci de saisir la déscription');
    else if (tag == "")
      alert('Merci de saisir un ou plusieur taxonomie');
    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/documents').child(key);
          var update = {
            titre: title,
            desc: desc,
            tags:tag
          };
          var result = userRef.update(update);
          document.getElementById("fe"+key).click();
        });

    }
  }
  delete_doc(key,refstor) {
    var a = confirm("Êtes-vous sûr de vouloir supprimer cette publication ");
    if (a == true) {
      var tabs = refstor.split('/');
      firebase.storage().ref(tabs[0]).child(tabs[1] + '/' + tabs[2]).delete();

      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/documents').child(key);

          var result = userRef.remove();
          document.getElementById("fe" + key).click();
        });
    }
  }

  count(tab)
  {
    var refr=firebase.database().ref('/documents');
    refr.orderByChild('uid').equalTo(this.currentuser).on('value', function(dataSnapshot) {
      var x=dataSnapshot.numChildren();
      console.log(x);
      tab[0]=x;
    });
  }
}
