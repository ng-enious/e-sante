
import {Component, ElementRef, ViewChild, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {AF} from "../../providers/af";
import { AngularFire, AuthProviders, AuthMethods,FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import {ImageCropperComponent} from '../vu/imageCropperComponent';
import {CropperSettings} from '../vu/cropperSettings';
import {Bounds} from '../vu/model/bounds';
import {CropPosition} from '../vu/model/cropPosition';
import {isUndefined} from "util";
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-ncprofile',
  templateUrl:'./ncprofile.component.html',
  styles: ['@import "https://fonts.googleapis.com/css?family=Roboto"; @import "https://fonts.googleapis.com/icon?family=Material+Icons";  '],
  styleUrls:  ['./stylesheets/font-awesome.min.css','./stylesheets/ionicons.min.css',
    './stylesheets/animate.css','./stylesheets/aos.min.css','./stylesheets/bootstrap.css',
    './stylesheets/materialize.css','./stylesheets/style-grey.css','./stylesheets/style.css'],
  //styleUrls: ['./comprofile.component.css']
  encapsulation: ViewEncapsulation.Emulated


})
export class NcprofileComponent  implements   AfterViewInit{
  public isLoggedIn: boolean;
  public user: FirebaseListObservable<any>;
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
  current=this.route.snapshot.params['id'];
  @ViewChild('cropper', undefined)
  cropper:ImageCropperComponent;

  constructor(public afService: AngularFire ,private route:ActivatedRoute,private router:Router) {
    this.user2 = afService.database.list('/user');
    this.afService.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in. ncprof");

          this.isLoggedIn = false;
          this.router.navigate(['login']);

        }
        else {
          console.log("Successfully Logged in.2 ncprof");


          this.user = afService.database.list('/entreprise/',{
            query: {
              orderByKey:true,
              equalTo:this.route.snapshot.params['id']
            }
          });

          this.user.subscribe(res => {this.loader=false});

          this.isLoggedIn = true;

        }
      }
    );
  }
  onNavigate(link){
    console.log(link);
    window.open(link, "_blank");
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

  updatedata1(name,spec) {
    if (name == "")
      alert("Merci de saisir le Nom");
    else if (spec == "")
      alert("Merci de saisir la  Spécialiter");
    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/entreprise').child(this.current);
          var update = {
            name: name,
            spec:spec
          };
          var result = userRef.update(update);
          document.getElementById("g1fermer").click();
        });

    }
  }
  updatedata2(adr,tel,desc,site) {
    if (desc=='')
      alert('Merci de saisir une déscription');
    else if(adr=='')
      alert('Merci de saisir l\'address de votre entreprise ');
    else if(tel=='')
      alert('Merci de saisir votre numéro de téléphone ');
    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/entreprise').child(this.current);
          var update = {
            adr: adr,
            tel:tel,
            desc:desc,
            site:site
          };
          var result = userRef.update(update);
          document.getElementById("gfermer").click();
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
          var cloudRef = firebase.storage().ref('/entreprise').child(this.current + '/cover.jpg').put(x);
          var userRef = firebase.database().ref('/entreprise').child(this.current);
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
          var cloudRef = firebase.storage().ref('/entreprise').child(this.current + '/avatar.jpg').put(x);
          var userRef = firebase.database().ref('/entreprise').child(this.current);
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





}
