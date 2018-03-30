import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Health } from '@ionic-native/health';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private health: Health) {
  	console.log("if the health is available222");
			this.health.isAvailable().then((available: boolean) => console.log("yes it is?222 " + available)).catch(e => {console.log("steps err " + e)});
			console.log("emmmm....");
  }

}
