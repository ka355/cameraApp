import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import {AlertController} from 'ionic-angular';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, geolocation: Geolocation, alertController: AlertController, deviceOrientation: DeviceOrientation, camera: Camera) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // get current position
      //geolocation.getCurrentPosition().then(pos => {
      //  console.log('pos: ' + pos);
      //});

      //const watch = geolocation.watchPosition().subscribe(pos => {
      //  console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      //});

      // to stop watching
      // watch.unsubscribe();

      // Get the device current compass heading
      deviceOrientation.getCurrentHeading().then(
        (data: DeviceOrientationCompassHeading) => console.log(data),
        (error: any) => console.log(error)
      );

      // Watch the device compass heading change
      var subscription = deviceOrientation.watchHeading().subscribe(
        (data: DeviceOrientationCompassHeading) => {//console.log(data)
        if ((data.trueHeading > 0) && (data.trueHeading < 180)) {
          console.log('land');

          const options: CameraOptions = {
            quality: 100,
            destinationType: camera.DestinationType.DATA_URL,
            encodingType: camera.EncodingType.JPEG,
            mediaType: camera.MediaType.PICTURE
          }

          camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            console.log('hi');
          }, (err) => {
            // Handle error
          });
        }
        }
      );

      // Stop watching heading change
      //subscription.unsubscribe();
    });
  }
}

