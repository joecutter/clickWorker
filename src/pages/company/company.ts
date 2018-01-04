import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { PackagePage } from '../../pages/package/package';

//model
import { Company_Info } from '../../Model/company_Info';

//provider
import { ClickService } from '../../provider/service';

/**
 * Generated class for the CompanyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {
  info: Company_Info[] = [];
  company:any;
  country:any;
  location:any;
  street:any;
  cell_no:any;

  public id:any;

  constructor(public navCtrl: NavController,
              public click:ClickService,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyPage');
    this.id = localStorage.getItem('employerID');
    console.log("stored employerID: " +this.id);
  }

  register(event){
    var info ={
      'company':this.company,
      'country':this.country,
      'location':this.location,
      'street':this.street,
      'cell_no':this.cell_no
    };

    this.click.setCompanyDetails(info).subscribe(user =>{
      this.info.push(info);
      var data = user;
      console.log(data);

      if(data.code == "200"){
        this.navCtrl.push(PackagePage);
      }
      this.company = " ";
      this.country = " ";
      this.location = " ";
      this.street = " ";
      this.cell_no = " ";
    
    });
    
  }

}
