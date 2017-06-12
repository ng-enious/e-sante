/**
 * Created by Sofiane on 02/03/2017.
 */
import {Component, ElementRef, ViewChild, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {AF} from "../../providers/af";
import { AngularFire, AuthProviders, AuthMethods,FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import {ImageCropperComponent} from '../vu/imageCropperComponent';
import {CropperSettings} from '../vu/cropperSettings';
import {Bounds} from '../vu/model/bounds';
import {CropPosition} from '../vu/model/cropPosition';
import {isUndefined} from "util";
import {Router} from "@angular/router";

@Component({
    selector: 'profile',
    templateUrl:'./profile2.html',
    styles: ['@import "https://fonts.googleapis.com/css?family=Roboto"; @import "https://fonts.googleapis.com/icon?family=Material+Icons";  '],
    styleUrls:  ['./stylesheets/font-awesome.min.css','./stylesheets/ionicons.min.css',
        './stylesheets/animate.css','./stylesheets/aos.min.css','./stylesheets/bootstrap.css',
        './stylesheets/materialize.css','./stylesheets/style-grey.css','./stylesheets/style.css'],

    encapsulation: ViewEncapsulation.Emulated


})
export class Profile  implements   AfterViewInit{
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
  public custom1:string;
  public isloading=true;
  charg=[false];
  loader=true;
  data:any;
  data2:any;
  cropperSettings: CropperSettings;
  cropperSettings2: CropperSettings;
  @ViewChild('cropper', undefined)
  cropper:ImageCropperComponent;

  constructor(public afService: AngularFire,private router:Router) {
    this.user2 = afService.database.list('/user');
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.


    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 1455;
    this.cropperSettings.height = 300;
    this.cropperSettings.croppedWidth =1455;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 700;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.keepAspect = false;
    this.data = {};
   //Cropper settings 2
    this.cropperSettings2 = new CropperSettings();
    this.cropperSettings2.width = 200;
    this.cropperSettings2.height = 200;
    this.cropperSettings2.keepAspect = false;

    this.cropperSettings2.croppedWidth = 200;
    this.cropperSettings2.croppedHeight = 200;

    this.cropperSettings2.canvasWidth = 500;
    this.cropperSettings2.canvasHeight = 300;

    this.cropperSettings2.minWidth = 100;
    this.cropperSettings2.minHeight = 100;

    this.cropperSettings2.rounded = true;
    this.cropperSettings2.minWithRelativeToResolution = false;

    this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;

this.custom="custom-input2";
this.custom1="custom-input1";
    this.data2 = {};
    this.afService.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in. profile");

          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
        else {
          console.log("Successfully Logged in. profile");
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
          this.formation= afService.database.list('/registeredUsers/'+auth.auth.uid+'/formations');
          this.experiences= afService.database.list('/registeredUsers/'+auth.auth.uid+'/experience');
          this.certification=afService.database.list('/registeredUsers/'+auth.auth.uid+'/certification');
          this.organisation=afService.database.list('/registeredUsers/'+auth.auth.uid+'/organisation');
          this.langue=afService.database.list('/registeredUsers/'+auth.auth.uid+'/langue');

          this.user = afService.database.list('/registeredUsers/',{
            query: {
              orderByKey: true,
              equalTo:auth.auth.uid
            }
          });

          this.user.subscribe(res => {this.loader=false});
            //this.user2.push({name: "ali", uid: auth.auth.uid});


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
  fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

  cropped(bounds:Bounds) {
    //console.log(bounds);
  }

  updatedata(name,poste,adress,about) {
    console.log(name);
    if (name == "")
      alert("Merci de saisir votre Nom complete");
    else if (poste == "")
      alert("Merci de saisir votre poste");
    else if (adress == "")
      alert("Merci de saisir votre address ");
    else if (about == "")
      alert("Merci de saisir une description ");
    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid);
          var update = {
            name: name.toLowerCase(),
            poste: poste,
            address: adress,
            about: about
          };
          var result = userRef.update(update);
          document.getElementById("gfermer").click();
        });

    }
  }
  experience_push(poste,org,dated,datef,about) {

    if (poste == "")
      alert("Merci de saisir votre Poste");
    else if (org=="")
      alert("Merci de saisir L'organisation");
    else if (dated=="")
      alert("Merci de saisir date de début ");
    else if (datef=="")
      alert("Merci de saisir date de fin ");
    else if(dated>datef)
      alert("Le date de debut doit etre inferieur au date de fin");
    else if(about=="")
      alert("Merci de saisir une description ");

    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('experience');
          var update = {

            Poste: poste,
            Organisation: org,
            Dated: dated,
            Datef: datef,
            about: about

          };
          var result = userRef.push(update);
          document.getElementById("efermer").click();
        });

    }
  }
  dataURItoBlob(dataURI, callback) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var bb = new Blob([ab]);
  return bb;
}
  cover_update(cover) {
this.cover_sous_update(cover,this.charg);
  }
  cover_sous_update(cover,loader)
  {
    loader[0]=true;
    if (isUndefined(cover))
      alert("Merci d'uploder une photo de couverture");
    else {
      var x=this.dataURItoBlob(this.data.image,()=>{});
      this.afService.auth.subscribe(
        (auth) => {
          console.log(cover);
          console.log(x);
          var cloudRef = firebase.storage().ref('/users').child(auth.uid + '/cover.jpg').put(x);
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid);
          cloudRef.on('state_changed', function (snapshot) {
            if (snapshot.bytesTransferred == snapshot.totalBytes) {
              var download = cloudRef.snapshot.downloadURL;
              var update = {
                cover: download
              };
              var result = userRef.update(update);
              this.data = undefined;
              loader[0]=false;
            }
            document.getElementById("covfermer").click();
          })

        });
    }
  }
  avatar_update(avatar)
  {

    if(isUndefined(avatar))
      alert("Merci d'uploder une photo de profil");
    else {
      var x=this.dataURItoBlob(avatar,()=>{});
      this.afService.auth.subscribe(
        (auth) => {
          console.log(x);
          var cloudRef = firebase.storage().ref('/users').child(auth.uid + '/avatar.jpg').put(x);
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid);
          cloudRef.on('state_changed', function (snapshot) {
            if (snapshot.bytesTransferred == snapshot.totalBytes) {
              var download = cloudRef.snapshot.downloadURL;
              var update = {
                avatar: download
              };
              var result = userRef.update(update);
              this.data = undefined;
              //    loader[0]=false;
            }
            document.getElementById("avfermer").click();
          })
        })
    }
  }

  get_cover_element(id)
  {
    document.getElementById(id).click();
  }

  experience_child_update(key,poste,org,dated,datef,about)
  {
    if (poste == "")
    alert("Merci de saisir votre Poste");
  else if (org=="")
    alert("Merci de saisir L'entreprise");
  else if (dated=="")
    alert("Merci de saisir date de début ");
  else if (datef=="")
    alert("Merci de saisir date de fin ");
  else if(dated>datef)
    alert("Le date de debut doit etre inferieur au date de fin");
  else if(about=="")
    alert("Merci de saisir une déscription ");

  else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('experience').child(key);
          var update = {
            Poste: poste,
            Organisation: org,
            Dated: dated,
            Datef: datef,
            about: about
          };
          var result = userRef.update(update);
          document.getElementById("F"+key).click();
        });
    }
  }
  experience_child_delete(key)
  {
   var a= confirm("Êtes-vous sûr de vouloir supprimer cette experience ");
    if (a == true) {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('experience').child(key);

          var result = userRef.remove();
          document.getElementById("F"+key).click();
        });
    }
  }

  //---------------Formation---------------//

  formation_push(diplom,fac,dated,datef,about) {

    if (diplom == "")
      alert("Merci de saisir votre diplome");
    else if (fac=="")
      alert("Merci de saisir votre Faculté/Ecole");
    else if (dated=="")
      alert("Merci de saisir date début de Formation ");
    else if (datef=="")
      alert("Merci de saisir date fin de Formation ");
    else if(dated>datef)
      alert("Le date de début doit etre inferieur au date de fin");
    else if(about=="")
      alert("Merci de saisir une description ");

    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('formations');
          var update = {

            diplom: diplom,
            fac:fac,
            Dated: dated,
            Datef: datef,
            about: about

          };
          var result = userRef.push(update);
          document.getElementById("edfermer").click();
        });

    }
  }

  formation_child_update(key,diplom,fac,dated,datef,about)
  {
    if (diplom == "")
      alert("Merci de saisir votre diplome");
    else if (fac=="")
      alert("Merci de saisir votre Faculté/Ecole");
    else if (dated=="")
      alert("Merci de saisir date début de Formation ");
    else if (datef=="")
      alert("Merci de saisir date fin de Formation ");
    else if(dated>datef)
      alert("Le date de début doit etre inferieur au date de fin");
    else if(about=="")
      alert("Merci de saisir une description ");
    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('formations').child(key);
          var update = {
            diplom: diplom,
            fac:fac,
            Dated: dated,
            Datef: datef,
            about: about
          };
          var result = userRef.update(update);
          document.getElementById("F"+key).click();
        });
    }
  }
  formation_child_delete(key)
  {
    var a= confirm("Êtes-vous sûr de vouloir supprimer cette Formation ");
    if (a == true) {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('formations').child(key);

          var result = userRef.remove();
          document.getElementById("F"+key).click();
        });
    }
  }


  //---------------Certification---------------//


  certification_push(cer,autority,dated) {

    if (cer == "")
      alert("Merci de saisir le titre votre Certification");
    else if (autority=="")
      alert("Merci de saisir l'autorité de  votre Certification");
    else if (dated=="")
      alert("Merci de saisir date d'obtention de Certificat  ");
    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('certification');
          var update = {

            titre:cer,
            autority:autority,
            Date: dated,


          };
          var result = userRef.push(update);
          document.getElementById("cefermer").click();
        });

    }
  }

  certification_child_update(key,cer,autority,dated)
  {
    if (cer == "")
      alert("Merci de saisir le titre votre Certification");
    else if (autority=="")
      alert("Merci de saisir l'autorité de  votre Certification");
    else if (dated=="")
      alert("Merci de saisir date d'obtention de Certificat  ");
    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('certification').child(key);
          var update = {
            titre:cer,
            autority:autority,
            Date: dated,

          };
          var result = userRef.update(update);
          document.getElementById("C"+key).click();
        });
    }
  }
  certification_child_delete(key)
  {
    var a= confirm("Êtes-vous sûr de vouloir supprimer cette Certification ");
    if (a == true) {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('certification').child(key);

          var result = userRef.remove();
          document.getElementById("C"+key).click();
        });
    }
  }


  //---------------Organisation---------------//
  organisation_push(poste,org,dated,datef,about) {

    if (poste == "")
      alert("Merci de saisir votre Poste");
    else if (org=="")
      alert("Merci de saisir L'organisation");
    else if (dated=="")
      alert("Merci de saisir date de début ");
    else if (datef=="")
      alert("Merci de saisir date de fin ");
    else if(dated>datef)
      alert("Le date de debut doit etre inferieur au date de fin");
    else if(about=="")
      alert("Merci de saisir une description ");

    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('organisation');
          var update = {

            Poste: poste,
            Organisation: org,
            Dated: dated,
            Datef: datef,
            about: about

          };
          var result = userRef.push(update);
          document.getElementById("ofermer").click();
        });

    }
  }

  organisation_child_update(key,poste,org,dated,datef,about)
  {
    if (poste == "")
      alert("Merci de saisir votre Poste");
    else if (org=="")
      alert("Merci de saisir L'organisation");
    else if (dated=="")
      alert("Merci de saisir date de début ");
    else if (datef=="")
      alert("Merci de saisir date de fin ");
    else if(dated>datef)
      alert("Le date de debut doit etre inferieur au date de fin");
    else if(about=="")
      alert("Merci de saisir une description ");

    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('organisation').child(key);
          var update = {
            Poste: poste,
            Organisation: org,
            Dated: dated,
            Datef: datef,
            about: about
          };
          var result = userRef.update(update);
          document.getElementById("O"+key).click();
        });
    }
  }
  organisation_child_delete(key)
  {
    var a= confirm("Êtes-vous sûr de vouloir supprimer cette organisation ");
    if (a == true) {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('organisation').child(key);

          var result = userRef.remove();
          document.getElementById("O"+key).click();
        });
    }
  }


  //---------------Langue---------------//
  langue_push(langue) {

    if (langue == "")
      alert("Merci de choisie une Langue");

    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('langue');
          var update = {

            langue:langue

          };
          var result = userRef.push(update);
          document.getElementById("lfermer").click();
        });

    }
  }

  langue_child_delete(key)
  {
    var a= confirm("Êtes-vous sûr de vouloir supprimer cette langue ");
    if (a == true) {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/registeredUsers').child(auth.auth.uid).child('langue').child(key);

          var result = userRef.remove();
          document.getElementById("L"+key).click();
        });
    }
  }


}
