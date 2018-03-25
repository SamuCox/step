import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { Firebase } from '@ionic-native/firebase';
import { FcmProvider } from '../providers/fcm/fcm';

import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';


@Component({
  templateUrl: 'app.html',
  providers: [AngularFireAuth]
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(public platform: Platform, afAuth: AngularFireAuth, public statusBar: StatusBar, public splashScreen: SplashScreen, private firebase: Firebase, public fcm: FcmProvider, public toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const authObserver = afAuth.authState.subscribe( user => {
        if (user) {
          this.rootPage = TabsPage;
          authObserver.unsubscribe();
        } else {
          this.rootPage = LoginPage;
          authObserver.unsubscribe();
        }
      });


      this.initializeApp();

    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      console.log("init??");

      this.fcm.getToken();

      console.log("token??");

      this.fcm.listenToNotifications().pipe(
        tap(msg => {
          const toast = this.toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
        )
      .subscribe();


      /*
      this.firebase.subscribe("all");

      this.firebase.getToken()
      .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
      .catch(error => console.error('Error getting token', error));

      this.firebase.onTokenRefresh()
      .subscribe((token: string) => console.log(`Got a new token ${token}`));

      this.firebase.onNotificationOpen()
      .subscribe((token: string) => console.log(`User has read the message`));

      this.firebase.onTokenRefresh()
      .subscribe((token: string) => console.log(`Got a new token ${token}`));

      console.log("whats wrong with the msg");
      */


      /*
      this.fcm.subscribeToTopic('all');

      this.fcm.getToken()
      .then((token:string)=>{
        console.log("The token to use is: ",token);
      })
      .catch(error=>{
        console.error(error);
      });

      this.fcm.onTokenRefresh().subscribe(
        (token:string)=>console.log("Nuevo token",token),
        error=>console.error(error)
        );

      this.fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      }) */

    })
  }
}