import { Component } from '@angular/core';
import { NavController, NavParams,Platform,LoadingController } from 'ionic-angular';

//google map plugins
import {GoogleMaps,GoogleMap,GoogleMapsEvent,LatLng,CameraPosition,MarkerOptions,Marker} from '@ionic-native/google-maps';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
//import MapboxGeocoder from 'mapbox-gl-geocoder';
import { Geolocation, Geoposition} from '@ionic-native/geolocation';
import Leaflet from 'leaflet';

declare let Mapbox;
declare var google;


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers:[GoogleMaps]
})
export class SearchPage {
  mapElement: HTMLElement;
  Coordinates: any;
  watch:any;
  longitude:any;
  latitude:any;
  public map;

// web = "AIzaSyDmP5I59RMaRueQDShKR1l1P7h9tSe7cqA";
// ios = "AIzaSyD6RT0H3AlapT0HwiYsXEcHtbAHJsRqXWs";
// android = "AIzaSyBE8UfanFf0ww3ebVI5nkPJKi_3KhmtAR4";
// mapbox = "pk.eyJ1Ijoiam9lY2F0dGVyIiwiYSI6ImNqNTI5NThlYzBidmsyd2syeHRnNzZyamUifQ.RKxxlaIf6whZBauy_dJDag";

  constructor(public navCtrl: NavController,
              private googleMaps: GoogleMaps,
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
                        content: 'Loading Please Wait...'
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
