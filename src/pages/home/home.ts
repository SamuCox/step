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
	step = "jljljl";

	constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private health: Health, private afDatabase: AngularFireDatabase) {

	}	

	signOut() {
		this.afAuth.auth.signOut();
		this.navCtrl.setRoot(LoginPage);
	}

	try2() {
		this.step="123";
		console.log("baba");
		this.health.isAuthorized(["steps"])
		.then(res => console.log("steps available: " + res));

		this.health.isAvailable()
		.then((available:boolean) => {
			this.health.query({
	  startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // three days ago
	  endDate: new Date(), // now
	  dataType: 'steps'})
			.then(res => {this.step = res.value; console.log(res == null);})
			.catch(e => console.log(e));
		})
		.catch(e => console.log(e));

/*
		console.log("ba2ba");
		this.health.promptInstallFit()
		.then(res => console.log("efe: "+ res.value))
		.catch(e => console.log(e));
		*/
	}

	sendNotification() {
		//this.afDatabase.object(`profile/123`).set({username: "49@baba.com", sex: "female"});
/*
		this.localNotifications.schedule({
			title: "Hey!",
			text: "blllababalalal eYou just got notified hehehe"
		})
		*/


		/*
		(<any>window).plugins.health.query({
	  startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
	  endDate: new Date(), // now
	  dataType: 'height'
	}, successCallback, errorCallback)
	*/

	this.health.isAvailable()
	.then((available:boolean) => {
		console.log("available" + available);
		this.step = available + ";";
		this.health.requestAuthorization([
    'distance', 'steps'
    ])
		.then(res => console.log("res" + res))
		.catch(e => console.log("e1"+e));
	})
	.catch(e => console.log("e2"+e));



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

