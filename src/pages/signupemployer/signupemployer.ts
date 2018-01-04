import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { CompanyPage } from '../../pages/company/company';

//model
import { EmployerProfile } from '../../Model/employer_profile';
//provider
import { ClickService } from '../../provider/service';

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
              public loadingCtrl: LoadingController,
              public click:ClickService,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupemployerPage');
  }

  register(event){

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000,
      dismissOnPageChange: true
    });

    loader.present();

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

      if(data.msg[0]._id !== ""){
        var employerid = data.msg[0]._id;;
        localStorage.setItem("employerID",employerid);
   }

      if(data.code == "200"){
          loader.dismiss(); 
          this.navCtrl.push(CompanyPage);

          this.email = " ";
          this.pwd = " ";
          this.fname = " ";
          this.lname = " ";
      }
 });
    
  }

}
