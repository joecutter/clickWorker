import { Component} from '@angular/core';
import { NavController,Platform, LoadingController } from 'ionic-angular';
import { Geolocation, Geoposition} from '@ionic-native/geolocation';

import {Observable} from 'rxjs/Observable';

import {MapDirective} from '../map/map';
declare var google;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[MapDirective]
})
export class HomePage {
  mapElement: HTMLElement;
  Coordinates: any;
  watch:any;
  longitude:any;
  latitude:any;
  public map;

// ios = "AIzaSyBKqEjbo6-zVAG3oMgEpcuVuBSjd5zB_sk";
// android = "AIzaSyBgQR0ISndWeU08hunigyskVW2rkAQeC_0";
//web = "AIzaSyDOjtOi3KA4dFtERMg__gQc_Ldc3c5sn2Y"
// mapbox = "pk.eyJ1Ijoiam9lY2F0dGVyIiwiYSI6ImNqNTI5NThlYzBidmsyd2syeHRnNzZyamUifQ.RKxxlaIf6whZBauy_dJDag";

  constructor(public navCtrl: NavController,
              private geolocation: Geolocation,
              public loadingCtrl: LoadingController,
              private platform: Platform) {


              }

              ionViewDidLoad() {
                console.log('ionViewDidLoad HomePage');

                    this.platform.ready().then(() => {
                      this.getCurrentPosition();
                  });
              }


                    getCurrentPosition(){

                      let loading = this.loadingCtrl.create({
                        content: 'Loading Please Wait...',
                        dismissOnPageChange:true
                      });

                      loading.present();

                      /*Initializing geolocation*/
                      let options = {
                        frequency: 3000,
                        enableHighAccuracy: true,
                        timeout:10000
                      };

                        this.geolocation.getCurrentPosition(options)
                          .then(resp => {
                                console.log("Coordinates "+ resp);
                                this.Coordinates = resp.coords;
                                this.longitude = resp.coords.longitude;
                                this.latitude = resp.coords.latitude;

                                let location = new google.maps.LatLng(this.latitude, this.longitude);
                                console.log("lat: " +this.latitude+ " long: "+this.longitude);

                                this.map = this.loadMap();
                                  console.log("Map Fired ");
                              },(err)=>{
                                console.log("Error "+ err);
                              });


                      loading.dismiss();
                    }

                   loadMap() {
                     var position = {lat: this.latitude, lng: this.longitude};
                     let mapOptions = {
                       mapTypeId:google.maps.MapTypeId.ROADMAP,
                       disableDefaultUI:true,
                       zoom: 15,
                       center: {
                         lat: this.latitude,
                         lng: this.longitude
                        }
                     }

                     let mapEl = document.getElementById('map');
                     let map = new google.maps.Map(mapEl, mapOptions);

                     var marker = new google.maps.Marker({
                        position: position,
                        map: map
                      });

                     return map;

                    }

                  }
