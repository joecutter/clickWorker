import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

msglist = {
  name:'joe',
  msg:'I ve had a pretty messed up day. If we just...',
};
msg:any;
  constructor(public navCtrl: NavController) {

  }

  openMsg(item){
    var fomat;
    var time = new Date();
    var picker=[];
    var seen;
    for ( var i = 0; i <this.msg.length; i++)
         {
          fomat = this.msg[i];
          picker = fomat;
          //item=picker[0];
          picker[i] = item;

        }
     console.log("Pick Transaction");
     console.log(item);
  }

}
