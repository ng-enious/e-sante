import { Component, OnInit,ViewChild,Input } from '@angular/core';
import {
  AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';
import {Router} from "@angular/router";
import * as firebase from 'firebase';
import {isUndefined} from "util";
import {ArticComponent} from "../tinymce/artic.component";
import {AlertCenterService} from 'ng2-alert-center';
import {AlertType} from 'ng2-alert-center';
import {Alert} from 'ng2-alert-center';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css','./bootstrap.css']
})
export class ArticleComponent implements OnInit {
  @ViewChild(ArticComponent) articleme:ArticComponent;
  @ViewChild('phot', undefined)
  phot: any;
  @ViewChild('textt', undefined)
  textt: any;
  selectedfile;
  currentuser;
  constructor(public afService: AngularFire, private router: Router,private alertCenterService: AlertCenterService) {

    this.afService.auth.subscribe(

      (auth) => {
        if (auth == null) {
          console.log("Not Logged in. article");


          this.router.navigate(['login']);
        }
        else {
          this.currentuser = auth.auth.uid;
        }
      }  );
  }
 alldata='';
  ngOnInit() {
  }
  alert: Alert = new Alert(AlertType.INFO, '', 'Ceci a été partager avec succée');

  animation = 'fancy';
  align = 1;

  sendAnAutoDismissingAlert() {
    const alert = new Alert(AlertType.INFO, 'cette article a été partager avec succée', '', 2000);

    this.alertCenterService.alert(alert);
  }

  getLeft() {
    switch (this.align) {
      case 0:
        return '0';
      case 1:
        return '20%';
      case 2:
        return '60%';
    }
  }

  getRight() {
    switch (this.align) {
      case 0:
        return '60%';
      case 1:
        return '20%';
      case 2:
        return '0';
    }
  }


  keyupHandlerFunction(event)
  {
    this.alldata=event;
  }
getelement()
{
  document.getElementById('upload-file-selector').click();
}

senddata(title)
{
  this.article_post(this.alldata,title)
}
  getfilename(fileInput)
  {
    var files = fileInput.files;
    var x='';
    for (var i = 0; i < files.length; i++) {
      x=x+ files[i].name;
    }
    return x;
  }

  videfile()
  {
    this.phot.nativeElement.value = "";
  }

  article_post(content,title)
  {
    if(title=='')
      alert("Merci de Saisir le titre de L'article ");

    else
    if (content=='')
      alert("Merci de Saisir le contenu de L'article ");

    else
      {
    this.afService.auth.subscribe(
      (auth) => {
        var x=Date.now();
        if(isUndefined(this.selectedfile)==false) {
          console.log('true');
          var userRef = firebase.database().ref('/posts');
          var cloudRef = firebase.storage().ref('/users').child(auth.uid + '/' + x + this.selectedfile.name).put(this.selectedfile);
          var xxx = firebase.storage().ref('/users').child(auth.uid + '/' + x + this.selectedfile.name);
          cloudRef.on('state_changed', function (snapshot) {
            if (snapshot.bytesTransferred == snapshot.totalBytes) {
              var download = cloudRef.snapshot.downloadURL;
              var update = {
                title:title,
                content: content,
                uid: auth.auth.uid,
                date: 0 - Date.now(),
                media: download,
                refdata: cloudRef.snapshot.ref.fullPath,
                type: 4,
                tarticle:1

              };

              var result = userRef.push(update);
            }
          })
        }
        else
        {
          var userRef = firebase.database().ref('/posts');


              var update = {
                title:title,
                content: content,
                uid: auth.auth.uid,
                date: 0 - Date.now(),
                type: 4,
                tarticle:1

              };

              var result = userRef.push(update);

          }

    this.phot.nativeElement.value = "";
        this.textt.nativeElement.value = "";
this.articleme.setval();
this.sendAnAutoDismissingAlert();

  });
      }

  }

  handleFileTarget(event)
  {
    this.selectedfile=event.target.files[0];
  }
}
