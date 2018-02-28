import { Component, Input, NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';


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

 	@Input() msg: AngularFireAction<DatabaseSnapshot>;

 	message : AngularFireAction<DatabaseSnapshot>;
 	title : string;
 	content : string;
 	sections : [any];

 	constructor(public navCtrl: NavController, public navParams: NavParams, afDatabase: AngularFireDatabase) {
 		this.message = navParams.get('message');
 		console.log(this.message.payload.val().content);
 		this.content = this.message.payload.val().content;
 		this.sections = this.message.payload.val().sections;
 		console.log("key: " + this.message.key);
  	//this.content = this.message.get('content');
  }



  ionViewDidLoad() {
  	console.log('ionViewDidLoad MessageDetailPage');
  }

}
