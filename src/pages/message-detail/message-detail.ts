import { Component, Input, NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MessageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-message-detail',
 	templateUrl: 'message-detail.html',
 })


 export class MessageDetailPage {

 	@Input() msg: object;

 	message : any;
 	title : string;
 	content : string;

 	constructor(public navCtrl: NavController, public navParams: NavParams) {
 		this.message = navParams.get('message');
 		console.log(this.message.content);
 		this.content = this.message.content;
  	//this.content = this.message.get('content');
  }



  ionViewDidLoad() {
  	console.log('ionViewDidLoad MessageDetailPage');
  }

}
