import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
import {
  AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';
import * as firebase from 'firebase';
@Component({
  selector: 'app-single-forum',
  templateUrl: './single-forum.component.html',
  styleUrls:  ['./assets/css/bootstrap.css','./assets/css/bootstrap-material-design.css',
    './assets/css/style.css','./assets/css/colors.css'],

  encapsulation: ViewEncapsulation.Emulated
  //styleUrls: ['./single-forum.component.css']
})
export class SingleForumComponent implements OnInit {
id:any;
  @ViewChild('txt')
  txt: any;
post:FirebaseListObservable<any>;
reply:FirebaseListObservable<any>;
load=true;
  currentuser;
  constructor(private route:ActivatedRoute,public afService: AngularFire,private router: Router) {
    this.afService.auth.subscribe(
      (auth) => {

            if(auth == null) {
              console.log("Not Logged in. single forum");

              this.router.navigate(['login']);

            }
            else
        this.currentuser = auth.auth.uid;
      });

    this.post= afService.database.list('/forum/',{
      query: {
        orderByKey:true,
        equalTo:this.route.snapshot.params['id']
      }
      // this.post= afService.database.list('/forum/',{
      // query: {
      //   orderByChild:'date',
      //   equalTo:this.route.snapshot.params['id']
      // }

    });

    this.reply=afService.database.list('/forum/'+this.route.snapshot.params['id']+'/reply');

this.reply.subscribe(x=>(this.load=false));
  }

  get_name(key)
  {
    return this.afService.database.object('/registeredUsers/'+key+'/');
  }
  get_forum_post(key)
  {
    return this.afService.database.object('/forum/'+key+'/');
  }
  comment_post(content)
  {
    var userRef= firebase.database().ref('/forum').child(this.route.snapshot.params['id']).child('reply');
    var update = {

      content :content,
      uid:this.currentuser,
      date:0-Date.now()
    };
    var result = userRef.push(update);
    this.txt.nativeElement.value = "";

  }
  updatedata(titre,content,key,etat) {
    if (titre == "")
      alert("Merci de saisir le titre");
    else if (content == "")
      alert("Merci de saisir la déscription");
    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/forum').child(key);
          var update = {
            title: titre,
            desc:content,
            etat:etat
          };
          var result = userRef.update(update);
        });
 document.getElementById('cl').click();
    }
  }
  updatedata2(content,key) {
    if (content == "")
      alert("Merci de saisir la déscription");
    else {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef= firebase.database().ref('/forum').child(this.route.snapshot.params['id']).child('reply').child(key);
          var update = {
            content:content
          };
          var result = userRef.update(update);
        });
      document.getElementById('cl'+key).click();
    }
  }
  delete_post(key)
  {

    {
      var a= confirm("Êtes-vous sûr de vouloir supprimer cette réponse ? ");
      if (a == true) {
        this.afService.auth.subscribe(
          (auth) => {
            var userRef = firebase.database().ref('/forum').child(this.route.snapshot.params['id']).child('reply').child(key);

            var result = userRef.remove();
            document.getElementById('cl'+key).click();
          });
      }
    }
  }
  delete_all_post(key) {

    var a = confirm("Êtes-vous sûr de vouloir supprimer cette publication ? ");
    if (a == true) {
      this.afService.auth.subscribe(
        (auth) => {
          var userRef = firebase.database().ref('/forum').child(key);

          var result = userRef.remove();
          document.getElementById('cl').click();
          this.router.navigate(['forum']);
        });
    }

  }

  ngOnInit() {
  this.id=this.route.snapshot.params['id'];
  console.log(this.id);
  }

}
