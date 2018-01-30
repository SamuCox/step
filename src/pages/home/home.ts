import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {

	constructor(public navCtrl: NavController, private localNotifications: LocalNotifications) {

	}	

	sendNotification() {
		this.localNotifications.schedule({
			title: "Hey!",
			text: "blllababalalal eYou just got notified hehehe"
		})
	}

	scheduleNotification() {
		this.localNotifications.schedule({
		text: 'Delayed ILocalNotification',
		at: new Date(new Date().getTime() + 3600),
		led: 'FF0000',
		sound: null
	});
	}


}

