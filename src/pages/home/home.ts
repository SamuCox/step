import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { LoginPage } from '../login/login'
import { Health } from '@ionic-native/health';



@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {

	profile = {username: "haa", sex: "female"} as Profile;
	step = "";

	constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private health: Health, private afDatabase: AngularFireDatabase) {

	}	

	signOut() {
			this.afAuth.auth.signOut();
			this.navCtrl.setRoot(LoginPage);
		}

	sendNotification() {
		//this.afDatabase.object(`profile/123`).set({username: "49@baba.com", sex: "female"});
/*
		this.localNotifications.schedule({
			title: "Hey!",
			text: "blllababalalal eYou just got notified hehehe"
		})
		*/

		var errorCallback = (err):string => {
			return "error";
		}

		var successCallback = (data):string => {
			console.log(data);
			this.step = data;
			return "success";
		}

		/*
		(<any>window).plugins.health.query({
	  startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
	  endDate: new Date(), // now
	  dataType: 'height'
	}, successCallback, errorCallback)
	*/

	this.health.isAvailable()
	.then((available:boolean) => {
		console.log(available);
		this.step = available + ";";
		this.health.requestAuthorization([
    'distance', 'nutrition',  //read and write permissions
    {
      read: ['steps'],       //read only permission
      write: ['height', 'weight']  //write only permission
    }
    ])
		.then(res => console.log(res))
		.catch(e => console.log(e));
	})
	.catch(e => console.log(e));

	/*
	navigator.health.query({
	  startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
	  endDate: new Date(), // now
	  dataType: 'height'
	}, successCallback, errorCallback);
};
*/

/*
scheduleNotification() {
	this.localNotifications.schedule({
		text: 'Delayed ILocalNotification',
		at: new Date(new Date().getTime() + 3600),
		led: 'FF0000',
		sound: null
	});
}
*/


}
}

