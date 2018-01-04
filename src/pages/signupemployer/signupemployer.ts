import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CompanyPage } from '../../pages/company/company';

//model
import { EmployerProfile } from '../../Model/employer_profile';
//provider
import { ClickService } from '../../provider/service';

/**
 * Generated class for the SignupemployerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signupemployer',
  templateUrl: 'signupemployer.html',
})
export class SignupemployerPage {

  profile:EmployerProfile[] =[];
  email:any;
  pwd:any;
  fname:any;
  lname:any;

  constructor(public navCtrl: NavController, 
              public click:ClickService,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupemployerPage');
  }

  register(event){
    var info = {
      email:this.email,
      pwd:this.pwd,
      fname:this.fname,
      lname:this.lname,
      status:"Hire",

    };
    
    this.click.setEmployerDetails(info).subscribe(user =>{
      this.profile.push(info);
      var data = user;
      console.log(data);

      if(data.code == "200"){
        this.navCtrl.push(CompanyPage);
      }
      this.email = " ";
      this.pwd = " ";
      this.fname = " ";
      this.lname = " ";
    
    });
    
  }

}
