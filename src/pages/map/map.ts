import { Component, OnInit } from '@angular/core';
import { NavController,Platform, LoadingController } from 'ionic-angular';
import { Geolocation, Geoposition} from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapDirective implements OnInit {

  mapElement: HTMLElement;
  Coordinates: any;
  watch:any;
  longitude:any;
  latitude:any;
  public map;

  constructor(public navCtrl: NavController,
              private geolocation: Geolocation,
              public loadingCtrl: LoadingController,
              private platform: Platform) {


              }

        ngOnInit() {
            this.map = this.loadMap();
           }

           ionViewDidLoad() {
             this.getCurrentPosition()
             this.map = this.loadMap();
             this.geolocation.watchPosition().subscribe((location) => {
               this.map.panTo(location);
             })
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


                           },(err)=>{
                             console.log("Error "+ err);
                           });


                   loading.dismiss();
                   console.log("lat: " +this.latitude+ "long: "+this.longitude);


                 }

                loadMap() {
                  var position = {lat: this.latitude, lng: this.longitude};
                  let mapOptions = {
                    mapTypeId:google.maps.MapTypeId.ROADMAP,
                    disableDefaultUI:true,
                    zoom: 10,
                    center: position
                  }

                  let mapEl = document.getElementById('map');
                  let map = new google.maps.Map(mapEl, mapOptions);

                  return map;

                 }

               }
