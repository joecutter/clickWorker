import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { EmployerPage } from '../../pages/employer/employer';
import { ProfilePage } from '../../pages/profile/profile';
import { WorkerInfoPage } from '../../pages/worker-info/worker-info';

//plugins
import { DatePicker } from '@ionic-native/date-picker';
//provider
import { ClickService } from '../../provider/service';

//model
import { Register } from '../../Model/User';

@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
  providers:[ClickService,DatePicker]
})
export class SingupPage {

  reg: Register[] = [];
  list = ['Work','Hire'];
  sex = ['Male','Female'];
  holder:Array<any>;
  status:any;
  email:any;
  fname:any;
  lname:any;
  username:any;
  location:any;
  cell_no:any;
  date:any;
  gender:any;
  pwd:any;

    constructor(public navCtrl: NavController,
                public click:ClickService,
                public loadingCtrl: LoadingController,
                private datePicker: DatePicker,
                public navParams: NavParams) {

    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad SingupPage');
    }

    register(event){
      console.log("New User");

      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 3000,
        dismissOnPageChange: true
      });

      loader.present();

      var newUser = {
        username: this.username,
        email:this.email,
        pwd:this.pwd,
        status:"Work",
        fname:this.fname,
        lname:this.lname,
        location:this.location,
        cell_no:this.cell_no,
        date:this.date,
        gender:this.gender
      }

      this.click.postUser(newUser).subscribe(user =>{
        this.reg.push(newUser);
        var data = user;
        
        if(data.msg[0]._id !==""){
          var id = data.msg[0]._id;
          localStorage.setItem("userID",id);
        }

        if(data.code == "200"){
          loader.dismiss(); 
          this.navCtrl.push(WorkerInfoPage);

        this.email = " ";
        this.pwd = " ";
        this.status = " ";
        this.fname = " ";
        this.lname = " ";
        this.location = " ";
        this.cell_no = " ";
        this.date = " ";
        this.gender = " ";    
        }

     });
  }

  }
