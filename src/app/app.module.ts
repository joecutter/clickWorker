import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SingupPage } from '../pages/singup/singup';
import { ProfilePage } from '../pages/profile/profile';
import { EmployerPage } from '../pages/employer/employer';
import { NewsPage } from '../pages/news/news';
import { JobsPage } from '../pages/jobs/jobs';
import { SignupemployerPage } from '../pages/signupemployer/signupemployer';
import { CompanyPage } from '../pages/company/company';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { PackagePage } from '../pages/package/package';
import { EmployerTabsPage } from '../pages/employer-tabs/employer-tabs';
import { SearchPage } from '../pages/search/search';
import { PostPage } from '../pages/post/post';
import { NotificationPage } from '../pages/notification/notification';
import { EmployerMsgPage } from '../pages/employer-msg/employer-msg';
import { AppliedJobsPage } from '../pages/applied-jobs/applied-jobs';
import { EmployerProfilePage } from '../pages/employer-profile/employer-profile';
import { WorkerInfoPage } from '../pages/worker-info/worker-info';
import { ApplyjobPage } from '../pages/applyjob/applyjob';
import { MapDirective } from '../pages/map/map';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation, Geoposition} from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

//provider
import { ClickService } from '../provider/service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SingupPage,
    ProfilePage,
    EmployerPage,
    NewsPage,
    JobsPage,
    SignupemployerPage,
    CompanyPage,
    DashboardPage,
    PackagePage,
    EmployerTabsPage,
    SearchPage,
    PostPage,
    NotificationPage,
    EmployerMsgPage,
    AppliedJobsPage,
    EmployerProfilePage,
    WorkerInfoPage,
    ApplyjobPage,
    TabsPage,
    MapDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SingupPage,
    ProfilePage,
    EmployerPage,
    NewsPage,
    JobsPage,
    SignupemployerPage,
    CompanyPage,
    DashboardPage,
    PackagePage,
    EmployerTabsPage,
    SearchPage,
    PostPage,
    NotificationPage,
    EmployerMsgPage,
    AppliedJobsPage,
    EmployerProfilePage,
    WorkerInfoPage,
    ApplyjobPage,
    TabsPage,
    MapDirective
  ],
  providers: [
    ClickService,
    GoogleMaps,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
