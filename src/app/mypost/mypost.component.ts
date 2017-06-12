

  import {
  Component, ElementRef, ViewChild, ViewEncapsulation, OnInit, AfterViewInit, ChangeDetectionStrategy,
  Pipe
} from '@angular/core';
import {AF} from "../../providers/af";
import {
  AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';
import * as firebase from 'firebase';
import "rxjs/add/operator/map";
import {Subject} from 'rxjs/Subject'
import {$} from "protractor";
import {AlertCenterService} from 'ng2-alert-center';
import {AlertType} from 'ng2-alert-center';
import {Alert} from 'ng2-alert-center';
  import {Observable} from 'rxjs';
  import "rxjs/add/operator/filter";
  import "rxjs/add/operator/take";
  import {Router} from "@angular/router";

@Component({
  selector: 'app-myposte',
  templateUrl: './mypost.component.html',
  styleUrls: ['./css/bootstrap.css','./mypost.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MypostComponent implements AfterViewInit,OnInit{
  date = firebase.database.ServerValue.TIMESTAMP;
  image:any;
  show=true;
  msgVal="";
  loadd=[0];
  aa=this.loadd[0]+'%';
  bufferValuee=['0'];
  limitsubject = new Subject <number>();
  selectedfile;
  base64textString:String="";
  public post : Observable<any>;
  public post4 : Observable<any>;
  public post2 : FirebaseListObservable<any>;
  public usersObservable: FirebaseListObservable<any>;
  public postname :FirebaseListObservable<any>;
  public user : FirebaseListObservable<any>;
  public username:any;
  public userk:any;
  public footer=false;
  loader=true;
  download=false;
  currentuser;
  @ViewChild('phot')
  phot: any;
  @ViewChild('vid')
  vid: any;
  public item: FirebaseObjectObservable<any>;
  public xo=2;

  alert: Alert = new Alert(AlertType.INFO, '', 'Ceci a été partager avec succée');

  animation = 'fancy';
  align = 1;


  constructor(public afService: AngularFire ,private alertCenterService: AlertCenterService,private route:Router) {
    this.afService.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Not Logged in. article");


          this.route.navigate(['login']);
        }
        else
        {
          this.currentuser=auth.auth.uid;
          this.post = afService.database.list('/posts/',{
            query: {
              orderByChild: "uid",
              equalTo:this.currentuser,
             limitToLast:this.limitsubject
            }
          })
            .map( (arr) => { return arr.reverse(); } );//.take(5)
          //   .map(items=>{
          //   const filtered=items.filter(item=>item.uid===this.currentuser);
          //   return filtered;
          // });
          // this.post4=this.post.map(items => items.sort((a, b) => b.date - a.date)) as FirebaseListObservable<any[]>;
          this.post.subscribe(res => {this.loader=false});

      }})





    // this.postname= afService.database.list('/registeredUsers/');
    // this.item=afService.database.object('/registeredUsers/vdulAOHw2HVo652S7DMEZCX9c0i2/');
  }

  sendAnAlert() {
    const alert = new Alert(AlertType.INFO, 'Test alert.');

    this.alertCenterService.alert(alert);
  }

  /* Let the alert disappear by itself in 5 seconds */
  sendAnAutoDismissingAlert() {
    const alert = new Alert(AlertType.INFO, 'Ceci a été partager avec succée', '', 2000);

    this.alertCenterService.alert(alert);
  }

  sendAlert() {
    this.alertCenterService.alert(this.alert);
    this.alert = new Alert(this.alert.alertType, '', this.alert.textStrong, 1200);
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



  private static createRandomNumberBetweenNullAndTentausend() {
    return Math.round(Math.random() * 10000);
  }
  scrollWin() {
    window.scrollTo(0, 0);
  }

  ngOnInit()
  {

    this.scrollWin();
  }
  ngAfterViewInit()
  {
    this.limitsubject.next(parseInt('2',10));
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
  trackByFn(index, item) {
    return index;
  }

  hide(key)
  {

    document.getElementById('inputks'+key).focus();

  }

  onScroll () {
    console.log('scrolled!!')
    this.xo=this.xo+2;
    this.limitsubject.next(this.xo);

  }
  changelim(c)
  {
    this.limitsubject.next(parseInt(c,10));
    console.log(this.limitsubject);
  }

  get_liste(key)
  {
    return this.afService.database.list('/posts/'+key+'/comments');
  }
  get_name(key)
  {
    return this.afService.database.object('/registeredUsers/'+key+'/');

  }
  like_check(keyp)
  {
    return this.afService.database.object('/posts/'+keyp+'/likes/records');

  }
  like_check_comm(keyp,keycom)
  {
    return this.afService.database.object('/posts/'+keyp+'/comments/'+keycom+'/likes/records');

  }
  like_check_counter(keyp,keycom)
  {
    return this.afService.database.object('/posts/'+keyp+'/comments/'+keycom+'/likes');

  }
  like_liste(keyp)
  {
    return this.afService.database.list('/posts/'+keyp+'/likes/records');

  }
  like_liste_comment(keyp,keyc)
  {
    return this.afService.database.list('/posts/'+keyp+'/comments/'+keyc+'/likes/records');

  }
  get_count_post(key)
  {
    return this.afService.database.object('/posts/'+key+'/likes/');
  }
  get_count_comment(key,keyc)
  {
    return this.afService.database.object('/posts/'+key+'/comments/'+keyc+'/likes/');
  }


  file_click(id)
  {
    document.getElementById(id).click();
  }
  post_upload(content , video , image)
  {
    if((content=="")&&(video=="")&&(image==""))
      alert("merci de saisir quelleque chose a publier");
    else if ((video!="")&&(image!=""))
      alert("vous ne pouvez pas publier une image et un video au meme temps ");
    else if ((video=="")&&(image!=""))
      this.photo_post(content,this.loadd,this.bufferValuee);
    else if((image=="")&&(video!=""))
      this.video_post(content,this.loadd,this.bufferValuee);
    else
      this.post_post(content);

    this.msgVal="";
  }

  comment_post(content,key,uid,id)
  {
    var userRef= firebase.database().ref('/posts').child(key).child('comments');
    var update = {

      content :content,
      comment_uid:uid


    };
    var result = userRef.push(update);
    document.getElementById(id).innerHTML="";

  }

  likes(key,user)
  {

    var refref=firebase.database().ref('/posts').child(key).child('likes').child('records');
    refref.once("value")
      .then(function(snapshot) {

        if(snapshot.hasChild(user))
        {

          var userRef= firebase.database().ref('/posts').child(key).child('likes').child('counter').transaction(function(currentValue) {
            var x=(currentValue||0) - 1
            return (currentValue||0) - 1
          }, function(err, committed, ss) {
            if( err ) {
              console.log('erreur');
            }
            else if( committed ) {
              // if counter update succeeds, then create record
              // probably want a recourse for failures too
              var userRef= firebase.database().ref('/posts').child(key).child('likes').child('records').child(user).remove();
              // this.addRecord(2,key);
              if(ss.val()==0)
                var userRef2= firebase.database().ref('/posts').child(key).child('likes').child('counter').remove();

            }
          });

        }


        else
        {

          var userRef= firebase.database().ref('/posts').child(key).child('likes').child('counter').transaction(function(currentValue) {
            var x=(currentValue||0) + 1
            return (currentValue||0) + 1
          }, function(err, committed, ss) {
            if( err ) {
              console.log('erreur');
            }
            else if( committed ) {
              // if counter update succeeds, then create record
              // probably want a recourse for failures too
              var userRef= firebase.database().ref('/posts').child(key).child('likes').child('records').child(user).set('true');
              // this.addRecord(2,key);
            }
          });


        }

      });

  }

  likes_comment(keyp,user,keyc)
  {

    var refref=firebase.database().ref('/posts').child(keyp).child('comments').child(keyc).child('likes').child('records');
    refref.once("value")
      .then(function(snapshot) {

        if(snapshot.hasChild(user))
        {

          var userRef= firebase.database().ref('/posts').child(keyp).child('comments').child(keyc).child('likes').child('counter').transaction(function(currentValue) {
            var x=(currentValue||0) - 1
            return (currentValue||0) - 1
          }, function(err, committed, ss) {
            if( err ) {
              console.log('erreur');
            }
            else if( committed ) {
              // if counter update succeeds, then create record
              // probably want a recourse for failures too
              var userRef= firebase.database().ref('/posts').child(keyp).child('comments').child(keyc).child('likes').child('records').child(user).remove();
              // this.addRecord(2,key);
              if(ss.val()==0)
                var userRef2= firebase.database().ref('/posts').child(keyp).child('comments').child(keyc).child('likes').child('counter').remove();

            }
          });

        }


        else
        {

          var userRef= firebase.database().ref('/posts').child(keyp).child('comments').child(keyc).child('likes').child('counter').transaction(function(currentValue) {
            var x=(currentValue||0) + 1
            return (currentValue||0) + 1
          }, function(err, committed, ss) {
            if( err ) {
              console.log('erreur');
            }
            else if( committed ) {
              // if counter update succeeds, then create record
              // probably want a recourse for failures too
              var userRef= firebase.database().ref('/posts').child(keyp).child('comments').child(keyc).child('likes').child('records').child(user).set('true');
              // this.addRecord(2,key);
            }
          });


        }

      });

  }

  photo_post(content,loader,buffer)
  {
    this.bufferValuee[0]='100';
    this.afService.auth.subscribe(
      (auth) => {
        var x=Date.now();
        var userRef = firebase.database().ref('/posts');
        var cloudRef = firebase.storage().ref('/users').child(auth.uid+'/'+x+this.selectedfile.name).put(this.selectedfile);
        var xxx=firebase.storage().ref('/users').child(auth.uid+'/'+x+this.selectedfile.name);

        cloudRef.on('state_changed',function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          loader[0] = Math.trunc(progress);
          if(loader[0]!=100)
            loader[0]=loader[0]+5;
          document.getElementById("kkk").style.width =loader[0]+"%";
          if(snapshot.bytesTransferred==snapshot.totalBytes) {
            var download = cloudRef.snapshot.downloadURL;
            var update = {

              content: content,
              uid: auth.auth.uid,
              date: 0 - Date.now(),
              media: download,
              refdata: cloudRef.snapshot.ref.fullPath,
              type: 2

            };
            var result = userRef.push(update);
            setTimeout(()=> {
              buffer[0]='0';
            },1000);
            setTimeout(()=> {
              loader[0]=0;
              document.getElementById("kkk").style.width ="0%";
            },3000);
          }
        })
        this.phot.nativeElement.value = "";


      });
  }
  photo_partage(content,media,refdata,key)
  {
    this.afService.auth.subscribe(
      (auth) => {
        var userRef = firebase.database().ref('/posts');

        var update = {

          content: content,
          uid: auth.auth.uid,
          date: 0 - Date.now(),
          media: media,
          refdata:  refdata,
          type: 2,
          partage:1

        };
        var result = userRef.push(update);

        document.getElementById('F'+key).click();
        this.sendAnAutoDismissingAlert();
      });
  }
  article_partage(content,media,refdata,key,title,tarticle)
  {if(tarticle==1)
  {
    this.afService.auth.subscribe(
      (auth) => {
        var userRef = firebase.database().ref('/posts');

        var update = {
          title:title,
          content: content,
          uid: auth.auth.uid,
          date: 0 - Date.now(),
          media: media,
          refdata:  refdata,
          type: 4,
          tarticle:1,
          partage:1

        };
        var result = userRef.push(update);

        this.sendAnAutoDismissingAlert();
      });
  }
  else
  {
    this.afService.auth.subscribe(
      (auth) => {
        var userRef = firebase.database().ref('/posts');

        var update = {
          title:title,
          content: content,
          uid: auth.auth.uid,
          date: 0 - Date.now(),
          type: 4,
          tarticle:2,
          partage:1

        };
        var result = userRef.push(update);

        this.sendAnAutoDismissingAlert();
      });
  }
  }
  video_post(content,loader,buffer)
  {
    this.afService.auth.subscribe(
      (auth) => {
        var x=Date.now();
        var userRef = firebase.database().ref('/posts');
        var cloudRef = firebase.storage().ref('/users').child(auth.uid+'/'+x+this.selectedfile.name).put(this.selectedfile);

        cloudRef.on('state_changed',function (snapshot) {
          this.download=true;
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          loader[0] = progress;
          if(snapshot.bytesTransferred==snapshot.totalBytes)
          {

            var download=cloudRef.snapshot.downloadURL;
            var update = {

              content: content,
              uid: auth.auth.uid,
              date: 0-Date.now(),
              media:download,
              refdata:cloudRef.snapshot.ref.fullPath,
              type:3

            };
            var result = userRef.push(update);
            buffer[0]='0';
            loader[0]=0;
          }
        })
        this.vid.nativeElement.value = "";
      });
  }
  video_partage(content,media,refdata,key)
  {
    this.afService.auth.subscribe(
      (auth) => {
        var userRef = firebase.database().ref('/posts');

        var update = {

          content: content,
          uid: auth.auth.uid,
          date: 0 - Date.now(),
          media: media,
          refdata:  refdata,
          type: 3,
          partage:1

        };
        var result = userRef.push(update);

        document.getElementById('F'+key).click();
        this.sendAnAutoDismissingAlert();
      });
  }
  post_post(content)
  {
    this.afService.auth.subscribe(
      (auth) => {
        var userRef = firebase.database().ref('/posts');
        var update = {

          content: content,
          uid: auth.auth.uid,
          date:  0-Date.now(),
          type:1


        };
        var result = userRef.push(update);
      });
  }
  post_partage(content,key)
  {
    this.afService.auth.subscribe(
      (auth) => {
        var userRef = firebase.database().ref('/posts');
        var update = {

          content: content,
          uid: auth.auth.uid,
          date:  0-Date.now(),
          type:1


        };
        var result = userRef.push(update);
        document.getElementById('F'+key).click();
        this.sendAnAutoDismissingAlert();
      });
  }

  delete_post(key,refstor,type,partage,tarticle='')
  {
    if ((type==2)||(type==3))
      this.delete_post_media(key,refstor,partage)
    else
    if((type==4)&&(partage!=1))
      this.delete_post_media_article(key,refstor,tarticle)

    else
      this.delete_post_nomedia(key);

  }
  delete_post_media(key,refstor,partage)
  {
    console.log(refstor);
    var a= confirm("Êtes-vous sûr de vouloir supprimer cette publication ");
    if (a == true) {
      if(partage!=1)
      {
        console.log(refstor)
        var tabs= refstor.split('/');
        firebase.storage().ref(tabs[0]).child(tabs[1]+'/'+tabs[2]).delete();
      }
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/posts').child(key);

          var result = userRef.remove();
        });
    }

  }
  delete_post_media_article(key,refstor,tarticle)
  {
    console.log(refstor);
    var a= confirm("Êtes-vous sûr de vouloir supprimer cette publication ");
    if (a == true) {
      if(tarticle==1)
      {
        console.log(refstor)
        var tabs= refstor.split('/');
        firebase.storage().ref(tabs[0]).child(tabs[1]+'/'+tabs[2]).delete();
      }
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/posts').child(key);

          var result = userRef.remove();
        });
    }

  }
  delete_post_nomedia(key)
  {

    var a= confirm("Êtes-vous sûr de vouloir supprimer cette publication ");
    if (a == true) {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/posts').child(key);

          var result = userRef.remove();
        });
    }

  }
  delete_comment(pkey,ckey) {
    var a = confirm("Êtes-vous sûr de vouloir supprimer cette commentaire ");
    if (a == true) {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/posts').child(pkey).child('comments').child(ckey);

          var result = userRef.remove();
        });
    }
  }
  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }



  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
    //console.log(btoa(binaryString));
  }
  handleFileTarget(event)
  {
    this.selectedfile=event.target.files[0];
  }


}


