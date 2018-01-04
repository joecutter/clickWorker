import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//pages
import { SearchPage } from '../../pages/search/search';
import { PostPage } from '../../pages/post/post';
import { NotificationPage } from '../../pages/notification/notification';
import { EmployerMsgPage } from '../../pages/employer-msg/employer-msg';
import { AppliedJobsPage } from '../../pages/applied-jobs/applied-jobs';
import { EmployerProfilePage } from '../../pages/employer-profile/employer-profile';

/**
 * Generated class for the EmployerTabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-employer-tabs',
  templateUrl: 'employer-tabs.html',
})
export class EmployerTabsPage {

  tab1Root = SearchPage;
  tab2Root = PostPage;
  tab3Root = NotificationPage;
  tab4Root = EmployerMsgPage;
  tab5Root = AppliedJobsPage;
  tab6Root = EmployerProfilePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
