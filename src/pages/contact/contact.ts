import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Message } from '../../models/message';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList, AngularFireAction, AngularFireObject, DatabaseSnapshot } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { MessageDetailPage } from '../message-detail/message-detail';



@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})
export class ContactPage {
	messages: Observable<AngularFireAction<DatabaseSnapshot>[]>;
	msgsRef: AngularFireList<any>;
	msgsKey: string[];

	constructor(public navCtrl: NavController, public authProvider: AuthProvider, public afDatabase: AngularFireDatabase) {
		this.msgsRef = afDatabase.list(`/profile/${authProvider.currentUID()}/messages`);
		//this.messages = this.msgsRef.valueChanges();
		this.messages = this.msgsRef.snapshotChanges();
		console.log("wantwant " + this.messages[0]);

/*
		this.msgsKey = this.msgsRef.snapshotChanges().map(actions => {
			return 
			})
		}
		*/
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
				startTime : "2018-02-08",
				endTime : "2018-02-15",
				content : "You walk a lot"
			}, {
				type : "tip",
				special : "Do you know you are fast?",
				content : "By walking 10000 steps every day, you can become stronger"
			}, {
				type : "challenge",
				title: "Walk 10 min",
				category: "leisure",
				content : "Go for a 10 min walk today",
				fun : 5,
				difficulty : 2,
				complete: false
			}
			]
		})
	}

	getMsg(key: string) {
		var msg = this.afDatabase.object(`/profile/${this.authProvider.currentUID()}/messages/${key}`).valueChanges().subscribe(item => {console.log});
		//console.log("waht is this " + msg);
		return msg;
	}


	navigateToDetail(message: any) {
		this.navCtrl.push(MessageDetailPage, {
      message: message
    });
	}

}
