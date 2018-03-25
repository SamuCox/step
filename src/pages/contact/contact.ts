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
			time: {date: 15, month: 2, year: 2018},
			sections: [{
				type : "graph",
				startTime : "2018-02-08",
				endTime : "2018-02-15",
				steps: [8201, 7500, 9020, 7502, 6702, 9520, 8640],
				dates: [8, 9, 10, 11, 12, 13, 14, 15],
				content : "You walk a lot"
			}, {
				type : "streak-comparison",
				target : "all",
				streakID : 12,
				recommendID : 15,
				percentile : 75,
				startTime : "2018-02-11",
				endTime : "2018-02-15",
				steps : [7502, 6702, 9520, 8640, 10020],
				dates: [11, 12, 13, 14, 15],
				streakDescription : "You are walking slowly",
				recommendDescription : "Try walking faster",
				survey : [{
					index : "0",
					type : "field",
					question : "How do you feel when looking at the comparison?",
					isAnswered : false,
					answer : ""
				}, {
					index : "0",
					type : "likert",
					question : "To what extent do you feel inferior after seeing comparisons to other users?",
					isAnswered : false,
					answer : ""
				}, {
					index : "1",
					type : "likert",
					question : "To what extent do you feel encouraged after seeing comparisons to other users?",
					isAnswered : false,
					answer : ""
				}, {
					index : "0",
					type : "mcq",
					question : "Why didn’t you complete the challenge?",
					options : ["I don't like it", "I am too tired"],
					isAnswered : false,
					answer : ""
				}]
			}, {
				type : "stats-comparison",
				steps : 7420,
				percentile : 60,
				recommendPercentile : 80,
				recommendSteps : 8920,
				statsDescription : "You are walking too few",
				survey : [{
					index : 0,
					type : "field",
					question : "How do you feel when looking at the comparison?"
				}, {
					index : 0,
					type : "likert",
					question : "To what extent do you feel inferior after seeing comparisons to other users?"
				}, {
					index : 1,
					type : "likert",
					question : "To what extent do you feel encouraged after seeing comparisons to other users?"
				}, {
					index : 0,
					type : "mcq",
					question : "Why didn’t you complete the challenge?",
					options : ["I don't like it", "I am too tired"],
					isAnswered : false,
					answer : ""
				}]
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
