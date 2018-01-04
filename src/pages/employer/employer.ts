import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NewsPage } from '../../pages/news/news';
import { SingupPage } from '../../pages/singup/singup';
/**
 * Generated class for the EmployerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-employer',
  templateUrl: 'employer.html',
})
export class EmployerPage {
  Duration = ['Contract','Full'];
  job = ['Skilled','Unskilled'];
  news = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployerPage');
  }

  showdata(){
    if(this.news == true){
      this.navCtrl.setRoot(NewsPage);
    }else
      this.navCtrl.setRoot(SingupPage);
  }

}
