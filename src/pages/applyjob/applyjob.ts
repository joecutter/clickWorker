import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';

//model
import { Posts } from '../../Model/employerPosts';
import { Applied } from '../../Model/applied_jobs';
//provider
import { ClickService } from '../../provider/service';

/**
 * Generated class for the ApplyjobPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-applyjob',
  templateUrl: 'applyjob.html',
  providers:[ClickService]
})
export class ApplyjobPage {

apply:Applied[]=[];
fetch:any;
stored:any;
title:any;
post:any;
date:any;
respond:any;
desc:any;

  constructor(public navCtrl: NavController,
              public click:ClickService,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {

    this.stored = localStorage.getItem("fetch");
    console.log("fetch "+this.stored );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyjobPage');
    this.fetch = JSON.parse(this.stored);
    this.title = this.fetch.Title;
    this.post = this.fetch.Post;
    this.date = this.fetch.Date;
  }

  getDetails(){
    var fetch = this.fetch;
    this.click.applyJob(fetch).subscribe(data =>{
      this.respond = data;

      //LoadingController
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        // duration: 3000,
        dismissOnPageChange: true
       });
       loader.present();

       //get response
  if(this.respond.code =="200"){
    if(this.respond.success == "Job added sucessfully"){
      loader.dismiss();
        let toast = this.toastCtrl.create({
          message: "job applied sucessfully",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();

  }else{
      console.log("Error");

      let toast = this.toastCtrl.create({
        message: 'Error, try Again',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

     });
    localStorage.setItem("fetch_title",JSON.stringify(this.fetch));

    console.log(this.fetch);
  }

  sendCoverLetter(){
   console.log("applied...");

   var fetch = this.fetch;

   var cover={
    title:this.title,
    date:this.date,
    post:this.post,
    letter:this.desc
   }
   this.click.SendCover(cover).subscribe(data =>{
    this.apply.push(cover);
    this.respond = data;

    //LoadingController
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      // duration: 3000,
      dismissOnPageChange: true
     });
     loader.present();

    //get response
  if(this.respond.code =="200"){
    if(this.respond.success == "Job added sucessfully"){
      loader.dismiss();
        let toast = this.toastCtrl.create({
          message: "job applied sucessfully",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();

  }else{
      console.log("Error");

      let toast = this.toastCtrl.create({
        message: 'Error, try Again',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

    this.desc = '';

   });

  }


}
