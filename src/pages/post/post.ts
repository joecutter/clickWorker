import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

//provider
import { ClickService } from '../../provider/service';
//model
import { Job } from '../../Model/post';
import { Posts } from '../../Model/employerPosts';

/**
 * Generated class for the PostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
  providers:[ClickService]
})
export class PostPage {
job:Job[] = [];
posts:Posts[];
errorMessage:any = ''
title:any;
date:any;
hours:any;
disp_min:any;
disp_sec:any;
disp:any
poster:any;
display_post: Array<any>;


  constructor(public navCtrl: NavController,
              public click:ClickService,
              public loadingCtrl:LoadingController,
              public navParams: NavParams) {
       this.presentLoading();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
    this.date = new Date().toDateString();
    this.hours = new Date().getHours();
    this.disp_min = new Date().getMinutes();
    console.log(this.hours);

    if(this.hours < 0){
      this.disp = (this.disp_min +" mins");
      console.log(this.disp_min);
    }else
      if(this.hours > 0){
      this.disp = (this.hours +" hrs");
    }else
      if(this.disp_min < 0){
       this.disp = (this.disp_sec +" secs");
      }
     //call method getPost
    this.getPostJob();
  }

  presentLoading(){
    let loading=this.loadingCtrl.create({
      content:"Loading....",
      duration:3000,
      dismissOnPageChange:	true
    }).present();
  }

  postJob(event){
    console.log("Post Job");

    var post_job = {
      //username:any;
      //pic:any;
      when:this.hours,
      date:this.date,
      title:this.title,
      post:this.poster
    }

    this.click.setJob(post_job).subscribe(user =>{
      this.job.push(post_job);
      this.poster = ' ';
      this.title = ' ';

    });
    //call method getPost
    this.getPostJob();
    this.poster = ' ';
  }

  getPostJob(){
    this.click.getJob().subscribe(posts =>{
      this.posts = posts.data,
      error => this.errorMessage = <any>error;

      //console.log(this.posts);
    });

  }
}
