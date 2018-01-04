import { Component } from '@angular/core';
import { NavController, NavParams,ToastController} from 'ionic-angular';

import { Worker } from '../../Model/Worker';
//provider
import { ClickService } from '../../provider/service';
import { LoginPage } from '../../pages/login/login';
/**
 * Generated class for the WorkerInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-worker-info',
  templateUrl: 'worker-info.html',
  providers:[ClickService]
})
export class WorkerInfoPage {
  worker:Worker[] = [];
  job = ['Skilled','Unskilled'];
  papers = ['High School','Diploma','Degree','Masters','phd'];
  workYears = ['less than 1yr','1yr','2yrs','3yrs','more than 4yrs'];
  work = ["Full Time",'Short Term','Internship','Volunteer','Other Work type'];
  free = ['IMMEDIATELY','1 WEEK','2 WEEKS','3 WEEKS','1 MONTH','2 MONTHS','MORE THAN 3 MONTHS'];
  education:any;
  experience:any;
  jobType:any;
  avail:any;
  desc:any;
  certificate:any;
  status:any;

  id:any;

  constructor(public navCtrl: NavController,
             public navParams: NavParams,
             public toastCtrl: ToastController,
             public click:ClickService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkerInfoPage');
    this.id = localStorage.getItem('userID');
    console.log("stored id: " +this.id);
  }

  register(event){
    console.log("New WorkerInfoPage");
    
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      dismissOnPageChange: true
    });
    toast.present();

    var work = {
      education:this.education,
      certificate:this.certificate,
      experience:this.experience,
      jobType:this.jobType ,
      desc:this.desc ,
      status:this.status,
      avail:this.avail
    }

    this.click.postworkerInfo(work).subscribe(user =>{
      this.worker.push(work);
      var res = user.success;

      if(res === "user added sucessfully"){

        this.education = '';
        this.experience = '';
        this.jobType = '';
        this.avail = '';
        this.desc = '';
        this.certificate = '';
        this.status = '';

        toast.dismiss();
      }
      
    });
    
    this.navCtrl.push(LoginPage);
  }
}
