import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { Health } from '@ionic-native/health';

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class FcmProvider {

  	constructor(public firebaseNative: Firebase, private platform: Platform, public health: Health) {
      this.platform.ready()
      .then((readySource) => {
        console.log('Hello FcmProvider Provider');
        console.log("health... "+ health);
        this.health.isAvailable()
        .then((available: boolean) => console.log("yes it is? in FCM?? " + available))
        .catch(e => {console.log("steps err " + e)})
      }).catch(e => {console.log("bigger playform err " + e)});
    }

  // Get permission from the user
  async getToken() {
  	let token;

  	if (this.platform.is('android')) {
  		token = await this.firebaseNative.getToken();
  		console.log("the token is: " + token);
  	} 

  	if (this.platform.is('ios')) {
  		token = await this.firebaseNative.getToken();
  		await this.firebaseNative.grantPermission();
  	} 

  	return this.saveTokenToFirestore(token);
  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {

  	/*
  	if (!token) return;

  	const devicesRef = this.afs.collection('devices');

  	const docData = { 
  		token,
  		userId: 'testUser',
  	};

  	return devicesRef.doc(token).set(docData);
  	*/
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
  	return this.firebaseNative.onNotificationOpen();
  }

}
