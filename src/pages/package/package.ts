import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { EmployerTabsPage } from '../../pages/employer-tabs/employer-tabs';
/**
 * Generated class for the PackagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-package',
  templateUrl: 'package.html',
})
export class PackagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackagePage');
  }

  buy(event){
    this.navCtrl.push(EmployerTabsPage);
  }
}
