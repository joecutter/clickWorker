import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';

//provider
import { ClickService } from '../../provider/service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers:[ClickService]
})
export class AboutPage {
  fetch:any;
  stored:any;
  title:any;
  post:any;
  date:any;
  respond:any;
  final:any;

  constructor(public navCtrl: NavController,
              public loadingCtrl:LoadingController,
              public click:ClickService) {
            this.presentLoading(); //516813
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.getDetails();
  }

  presentLoading(){
    let loading=this.loadingCtrl.create({
      content:"Loading....",
      duration:3000,
      dismissOnPageChange:	true
    }).present();
  }

  getDetails(){
    this.click.getSendCover().subscribe(data =>{
      this.respond = data;
      console.log(this.respond);
      this.final = this.respond.data
      console.log(this.final);

    });
    
  }
}