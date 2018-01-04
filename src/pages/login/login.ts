import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController  } from 'ionic-angular';

import { TabsPage } from '../../pages/tabs/tabs';
import { SingupPage } from '../../pages/singup/singup';
import { SignupemployerPage } from '../../pages/signupemployer/signupemployer';
import { EmployerTabsPage } from '../../pages/employer-tabs/employer-tabs';

//provider
import { ClickService } from '../../provider/service';
//model
import { Login } from '../../Model/signin';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[ClickService]
})




export class LoginPage {
  login: Login[] = [];
  userID:any;
  pwd:any;
  auth: string = 'workers';
  workers = false;
  hirers = false;

 logoState: any = "in";
 cloudState: any = "in";
 loginState: any = "in";
 formState: any = "in";

 display :any;
 obj1 :any;
 obj2 :any;
 repsond:any;
  constructor(public navCtrl: NavController,
              public click:ClickService,
              public loadingCtrl:LoadingController,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  onSegmentChanged(){
    if(this.auth == 'workers'){
        this.navCtrl.push(SingupPage);
    }else if(this.auth != 'workers'){
      this.navCtrl.push(SignupemployerPage);
    }

  }

  signin(event){
    console.log("old User");

    //Loader
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
  
    loading.present();

    var oldUser = {
      username:this.userID,
      password:this.pwd
    }

    this.click.enterUser(oldUser).subscribe(user =>{
      this.login.push(oldUser);
      this.repsond = user;

      //save id
      localStorage.setItem("id",this.repsond.msg[0]._id);
      console.log(this.repsond);

      this.userID = '';
      this.pwd = '';

      // get response
  if(this.repsond.code =="200"){
          if(this.repsond.msg[0].purpose == "Work"){
            //Direct to Worker Dashboard
            this.navCtrl.setRoot(TabsPage);
          }else 
           if(this.repsond.msg[0].purpose == "Hire"){
            //Direct to Employer Dashboard
            this.navCtrl.setRoot(EmployerTabsPage);
          }else{
            //User does not Exist
            let alert = this.alertCtrl.create({
              title: 'Login Failed',
              subTitle: 'User does not Exist, Please Register',
              buttons: ['OK']
            });
            alert.present();
          }

    }else{
      console.log("Error");

      //Alert Error Unable to login try Again
      let alert = this.alertCtrl.create({
        title: 'Login Failed',
        subTitle: 'Error Unable to login try Again',
        buttons: ['OK']
      });
      alert.present();
    }

 });
 loading.dismiss();
}

  forgotPwd(){
    this.navCtrl.setRoot(EmployerTabsPage);
  }

  getUserDetails(){

    var email= {
      'email':this.userID
    };

    //Get EmployerDetails
    this.click.getEmployerDetails(email).subscribe(data =>{
      this.display = data;
      console.log(this.display);
      this.obj1 = this.display.category[0];
      this.obj2 = this.display.success[0];
      console.log("profile :" +this.obj1);

      localStorage.setItem("firstname",this.obj1.fname);

    });
  }
}
