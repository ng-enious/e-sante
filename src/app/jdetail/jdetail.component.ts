import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
import {
  AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';
@Component({
  selector: 'app-jdetail',
  templateUrl: './jdetail.component.html',
  styleUrls: ['./css/bootstrap.min.css','./style.css','./font-awesome/css/font-awesome.min.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class JdetailComponent implements OnInit {
  public jobs : FirebaseListObservable<any>;
  constructor(public afService: AngularFire,private route:ActivatedRoute)
  {
    this.jobs= afService.database.list('/jobs/', {
      query: {
        orderByKey: true,
        equalTo: this.route.snapshot.params['id']
      }
    });

  }
  get_company(key)
  {
    return this.afService.database.object('/entreprise/'+key+'/');
  }

  ngOnInit() {
    console.log(this.jobs);
  }

}
