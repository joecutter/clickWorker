import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//provider
import { ClickService } from '../../provider/service';

/**
 * Generated class for the EmployerProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-employer-profile',
  templateUrl: 'employer-profile.html',
  providers:[ClickService]
})
export class EmployerProfilePage {
  email :any;
  pwd :any;
  fname :any;
  lname :any;
  company :any;
  country :any;
  location :any;
  street :any;
  cell_no :any;
  respond :any;

  obj1 :any;
  obj2 :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public click:ClickService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployerProfilePage');
    this. getDetails();
  }

  getDetails(){
    var email = {
      email:"kate@gmail.com"
    };

//Get EmployerDetails
    this.click.getEmployerDetails(email).subscribe(data =>{
      this.respond = data;
      console.log(this.respond);
      this.obj1 = this.respond.category[0];
      this.obj2 = this.respond.success[0];
      console.log("profile :" +this.obj1);

      //binding EmployerDetails
      this.email = this.obj1.email;
      this.pwd  = this.obj1.password;
      this.fname = this.obj1.fname;
      this.lname  = this.obj1.lname;

      //binding CompanyDetails 
      this.company  = this.obj2.company;
      this.country  = this.obj2.country;
      this.location  = this.obj2.location;
      this.street  = this.obj2.street;
      this.cell_no  = this.obj2.cell_no;
     
    });

    

//Get CompanyDetails
    this.click.getCompanyDetails().subscribe(data =>{
      this.respond = data;
      console.log(this.respond);
      this.obj2 = this.respond.success
      console.log(this.obj2);

      

      
    });

  }
  
  register(event){

  }

}
