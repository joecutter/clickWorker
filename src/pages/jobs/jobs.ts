import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ApplyjobPage } from '../../pages/applyjob/applyjob';

//provider
import { ClickService } from '../../provider/service';

//model
import { Posts } from '../../Model/employerPosts';

/**
 * Generated class for the JobsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {

  posts:Posts[] = [];
  errorMessage:any = ''
  picker:any;

  date:any;
  post:any;
  title:any;

  constructor(public navCtrl: NavController,
              public click:ClickService,
              public loadingCtrl:LoadingController,
              public navParams: NavParams) {
          this. presentLoading();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobsPage');
    this.getPostJob();
  }

  presentLoading(){
    let loading=this.loadingCtrl.create({
      content:"Loading....",
      duration:3000,
      dismissOnPageChange:	true
    }).present();
  }

  apply(item){
    var fomat;
    var time = new Date();
    var picker=[];
    var seen;
    for ( var i = 0; i <this.posts.length; i++)
         {
          fomat = this.posts[i];
          picker = fomat;
          //item=picker[0];
          picker[i] = item;

        }
     console.log("Pick Transaction");
     console.log(item);
      this.date = item.date;
      this.post = item.post;
      this.title = item.title;

     seen = {
       "Date": item.date,
       "Post": item.post,
       "Title": item.title
      };

     console.log(seen);

     var objStr = JSON.stringify(seen);
     localStorage.setItem("fetch", objStr);
     this.navCtrl.push(ApplyjobPage);
  }

  getPostJob(){
    this.click.getJob().subscribe(posts =>{
      this.posts = posts.data,
      error => this.errorMessage = <any>error;

      //console.log(this.posts);
    });

  }
}
