import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Message } from '../../models/message';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { MessageDetailPage } from '../message-detail/message-detail';



@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})
export class ContactPage {
	messages: Observable<any[]>;
	msgsRef: AngularFireList<any>;

	constructor(public navCtrl: NavController, public authProvider: AuthProvider, afDatabase: AngularFireDatabase) {
		this.messages = afDatabase.list(`/profile/${authProvider.currentUID()}/messages`).valueChanges();
		this.msgsRef = afDatabase.list(`/profile/${authProvider.currentUID()}/messages`);
	}

	addMsg() {
		/*
		var message = {uid: this.authProvider.currentUID(), content: "hehahah"} as Message;
		this.messages.push(message);
		*/

		const newMsgRef = this.msgsRef.push({});
		newMsgRef.set({
			uid: this.authProvider.currentUID(),
			content: "hehahah",
			sections: [{
				type : "graph",
				startDate : "2-10",
				endDate : "2-15",
				content : "You walk a lot"
			}, {
				type : "tip",
				special : "Do you know you are fast?",
				content : "By walking 10000 steps every day, you can become stronger"
			}, {
				type : "challenge",
				content : "Walk 10 min",
				fun : 5,
				difficulty : 2
			}
			]
		})
	}


	navigateToDetail(message: any) {
		this.navCtrl.push(MessageDetailPage, {
      message: message
    });
	}

}
