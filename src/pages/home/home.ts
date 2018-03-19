import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { LoginPage } from '../login/login'
import { Health } from '@ionic-native/health';
import { Chart } from 'chart.js';
import { AuthProvider } from '../../providers/auth/auth';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {

	@ViewChild('doughnutCanvas') doughnutCanvas;
	//doughnutCanvas: any;
	msgsRef: AngularFireList<any>;

	profile = {username: "haa", sex: "female"} as Profile;
	step = "";
	stepArray = [];

	constructor(public navCtrl: NavController, public platform: Platform, public authProvider: AuthProvider, private afAuth: AngularFireAuth, private health: Health, private afDatabase: AngularFireDatabase) {
		this.platform.ready().then((readySource) => {
			this.health.requestAuthorization([
				'steps'
				])
			.then(res => {
				console.log("requested " + res);
				this.health.queryAggregated({
  		startDate: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000), // three days ago
  		endDate: new Date(), // now
  		dataType: 'steps',
  		bucket: 'day'})
				.then(res => {
					this.step = res[1].value;
					var stepArray = [];
					res.forEach(function(value) {
						stepArray.push(value);
						console.log("value!: "+ value.startDate);
					});
					this.generateStepChart(parseInt(this.step));
					this.stepArray = stepArray;
					this.uploadStep();

				/*
				for(var property in res[1]) {
					console.log(property + "=" + res[1][property]);
					this.step = res[1].value;
				}*/

			})
				.catch(e => {console.log("steps err " + e)})
				.catch(e => console.log("e1"+e));
			}
			);
		});
	}

	ionViewDidLoad() {
		this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
			type: 'doughnut',
			data: {
				datasets: [{
					data: [12],
					backgroundColor: [
					'rgba(255, 99, 132, 0.2)'
					]
				}]
			}
		});

	}

	uploadStep() {
		var today = new Date();
		var mm = today.getMonth();
		var dd = today.getDate();
		/*
		this.msgsRef = this.afDatabase.list(`/profile/${this.authProvider.currentUID()}/steps`);
		const newMsgRef = this.msgsRef.push({});
		newMsgRef.set({
			month: mm,
			date: dd,
			step: this.step
		})
		*/

		var msgsRef = this.afDatabase.list(`/profile/${this.authProvider.currentUID()}/steps`);
		msgsRef.remove();

		this.stepArray.forEach(function(value) {
			msgsRef.push({
				month: value.startDate.getMonth(),
				date: value.startDate.getDate(),
				step: value.value
			});
		});

	}
	
/*
	ionViewDidEnter() {
		this.health.requestAuthorization([
			'steps'
			])
		.then(res => {
			console.log("requested " + res);
			this.health.queryAggregated({
  		startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // three days ago
  		endDate: new Date(), // now
  		dataType: 'steps',
  		bucket: 'day'})
			.then(res => {
				//this.generateStepChart();
				for(var property in res[1]) {
					console.log(property + "=" + res[1][property]);
					this.step = res[1].value;
				}})
			.catch(e => {console.log("steps err " + e)})
			.catch(e => console.log("e1"+e));
		}
		);
	}*/

	generateStepChart(step: number) {
		console.log("start generation: " + step);
		if (step < 10000) {
			this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
				type: 'doughnut',
				data: {
					datasets: [{
						data: [step, 10000],
						backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)'
						]
					}]
				}
			})
		} else {
			var n = step / 10000;
			this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
				type: 'doughnut',
				data: {
					datasets: [{
						data: [step, n * 10000],
						backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)'
						]
					}]
				}
			})
		}
	}


	signOut() {
		this.afAuth.auth.signOut();
		this.navCtrl.setRoot(LoginPage);
	}

	printObject(obj: Object) {
		var output = '';
		for (var property in obj[0]) {
			output += property + ': ' + obj[property]+'; ';
		}
		console.log(output);
	}

	try2() {
		this.step="123";
		console.log("baba");

		/*
		this.health.isAvailable()
		.then((available:boolean) => {
			this.health.isAuthorized(["steps"])})
			.then(res => console.log("steps available: " + res))
			.catch(e => console.log("what's wrong " + e));
			*/

			/*
			this.health.isAvailable()
				.then((available:boolean) => {
					this.health.isAuthorized(["steps"])})
					.then(res => console.log("steps available: " + res))
					.catch(e => console.log("what's wrong " + e));
					*/

					this.health.requestAuthorization([
						'steps'
						])
					.then(res => {
						console.log("requested " + res);

						this.health.isAvailable()
						.then((available:boolean) => {
							this.health.isAuthorized(["steps"])})
						.then(res => console.log("steps available: " + res))
						.catch(e => console.log("what's wrong " + e));

						/*this.health.query({
  		startDate: new Date(new Date().getTime() - 10000000), // three days ago
  		endDate: new Date(), // now
  		dataType: 'steps'})
						.then(res => {console.log(res[0].id); 
							for(var property in res[0]) {
								console.log(property + "=" + res[0][property]);
							}
							console.log("steps: " + res.value);})
						.catch(e => {console.log("steps err " + e)});})
						.catch(e => console.log("e1"+e));*/

						this.health.queryAggregated({
  		startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // three days ago
  		endDate: new Date(), // now
  		dataType: 'steps',
  		bucket: 'day'})
						.then(res => {
							for(var property in res[1]) {
								console.log(property + "=" + res[1][property]);
								this.step = res[1].value;
							}})
						.catch(e => {console.log("steps err " + e)});})
					.catch(e => console.log("e1"+e));


				}

			/*
			this.health.queryAggregated({
	  startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
	  endDate: new Date(), // now
	  dataType: 'steps',
	  bucket: 'day'})
			.then(res => {this.step = res[0].value[0]; console.log(res == null); 
				var output = '';
				for (var property in res[0]) {
					output += property + ': ' + res[property]+'; ';
				}
				console.log(output);

			})
			.catch(e => console.log(e));
		})
		.catch(e => console.log(e));

		console.log("ba2ba");
		this.health.promptInstallFit()
		.then(res => console.log("efe: "+ res.value))
		.catch(e => console.log(e));
		*/

		sendNotification() {
		//this.afDatabase.object(`profile/123`).set({username: "49@baba.com", sex: "female"});

		this.health.isAvailable()
		.then((available:boolean) => {
			console.log("available" + available);
			this.step = available + ";";
			this.health.requestAuthorization([
			  //write only permission
			  'steps'
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

