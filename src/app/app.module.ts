import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { LoginPageComponent } from './login-page/login-page.component';
import {RouterModule, Routes} from "@angular/router";
import {AF} from "../providers/af";
import { HomePageComponent } from './home-page/home-page.component';
import {FormsModule} from "@angular/forms";
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ChatComponent } from './chat/chat.component';
import  {Profile} from './profile/profile.component';
import { VuComponent } from './vu/vu.component';
import {ImageCropperComponent} from './vu/ImageCropperComponent';
import {HomeComponent} from './home/home.component'
import {Autosize} from './home/angular2-autosize';
import {NavComponent} from './nav/nav.component';
import {Forum} from './forum/forum.component'
import {ArticComponent} from './tinymce/artic.component'
import {ArticleComponent} from './article/article.component'
import {Job} from './job/job.component'
import {Defaultmedia} from './home/defaultmedia'
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import {AlertCenterModule} from 'ng2-alert-center';
import { SingleForumComponent } from './single-forum/single-forum.component';
import {SearchFilter} from './forum/search'
import {KeysPipe} from './forum/keys'
import {Http, HttpModule, BaseRequestOptions} from '@angular/http';
import {LocationStrategy, HashLocationStrategy,PathLocationStrategy} from '@angular/common';
import { DocumentComponent } from './document/document.component';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import { ReactiveFormsModule} from '@angular/forms';
import {ForumSearch} from "./forum - Copie/forum.component";
import {SummaryPipe} from "./forum/summary.pipe";
import { TagInputModule } from 'ng2-tag-input';
import { SearchdocComponent } from './searchdoc/searchdoc.component';
import { PvisitorComponent } from './pvisitor/pvisitor.component';
import { MypostComponent } from './mypost/mypost.component';
import { CompanyComponent } from './company/company.component';
import { ComprofileComponent } from './comprofile/comprofile.component';
import { CjobComponent } from './cjob/cjob.component';
import { JdetailComponent } from './jdetail/jdetail.component';
import { NcprofileComponent } from './ncprofile/ncprofile.component';
import { NcjobComponent } from './ncjob/ncjob.component';
import {TruncatePipe} from './company/trancate';
import { FriendComponent } from './friend/friend.component';
import { ResetpwComponent } from './resetpw/resetpw.component'
import { EqualValidator } from './resetpw/validator';
import { DisableComponent } from './disable/disable.component';
import { AuthGuard } from './vu/auth.service';
import { SearchcomComponent } from './searchcom/searchcom.component';
import { MsgComponent } from './msg/msg.component';
import { Chat2Component } from './chat2/chat2.component';
import { Msg2Component } from './msg2/msg2.component';
import { PasswordmailComponent } from './passwordmail/passwordmail.component';
import { SearchComponent } from './search/search.component';
import { ErrorComponent } from './error/error.component';
export const firebaseConfig = {
  apiKey: "AIzaSyAOUrERoMyu6Q99XoUFYAJw3UCQGjuRI80",
  authDomain: "sofiane-5a3d8.firebaseapp.com",
  databaseURL: "https://sofiane-5a3d8.firebaseio.com",
  storageBucket: "sofiane-5a3d8.appspot.com",
  messagingSenderId: "907902515822"
};


const routes: Routes = [
  { path: '',component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile',component: Profile },
  { path: 'cprofile/:id',component: ComprofileComponent },
  { path: 'ncprofile/:id',component: NcprofileComponent },
  { path: 'pvisitor/:id',component: PvisitorComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent},
  { path: 'forum', component: Forum},
  { path: 'entreprise', component: CompanyComponent},
  { path: 'forumsearch/:id', component: ForumSearch},
  { path: 'docsearch/:id', component: SearchdocComponent},
  { path: 'forum/:id', component: SingleForumComponent},
  { path: 'article', component: ArticleComponent},
  { path: 'job', component: Job},
  { path: 'cjob/:id', component: CjobComponent},
  { path: 'ncjob/:id', component: NcjobComponent},
  {path:'doc',component:DocumentComponent},
  {path:'mypost',component:MypostComponent},
  {path:'jdetail/:id',component:JdetailComponent},
  {path:'amie',component:FriendComponent},
  {path:'pwreset',component:ResetpwComponent},
  {path:'disable',component:DisableComponent},
  {path:'entsearch/:id',component:SearchcomComponent},
  {path:'message2',component:ChatComponent,
    children: [
      {path:'msg2/:id',component:MsgComponent}
    ]},
  {path:'message',component:Chat2Component,
    children: [
      {path:'msg/:id',component:Msg2Component}
    ]},
  {path:'mail',component:PasswordmailComponent},
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    FormsModule,
    InfiniteScrollModule,
    AlertCenterModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MdButtonModule,
    MdCheckboxModule,
    TagInputModule

  ],
  declarations: [ AppComponent, LoginPageComponent, HomePageComponent, RegistrationPageComponent,
    ChatComponent ,Profile, VuComponent,ImageCropperComponent,HomeComponent,Autosize,NavComponent,Forum,
    ArticComponent,ArticleComponent,Job,Defaultmedia, SingleForumComponent,SearchFilter,KeysPipe, DocumentComponent,ForumSearch,SummaryPipe, SearchdocComponent, PvisitorComponent,
    MypostComponent, CompanyComponent, ComprofileComponent, CjobComponent, JdetailComponent, NcprofileComponent, NcjobComponent,TruncatePipe, FriendComponent, ResetpwComponent,
    EqualValidator,
    DisableComponent,
    SearchcomComponent,
    MsgComponent,
    Chat2Component,
    Msg2Component,
    PasswordmailComponent,
    SearchComponent,
    ErrorComponent

  ],
  bootstrap: [ AppComponent ],
  providers: [AF, BaseRequestOptions,
    HttpModule,
    {provide: LocationStrategy, useClass: PathLocationStrategy},AuthGuard]
})
export class AppModule {}
