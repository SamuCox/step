import { Component, Input, ViewChild } from '@angular/core';

/**
 * Generated class for the MessageChallengeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
 @Component({
 	selector: 'message-challenge',
 	templateUrl: 'message-challenge.html'
 })
 export class MessageChallengeComponent {

 	text: string;
 	@Input() public section: any;

 	constructor() {
 		console.log('Hello MessageChallengeComponent Component');
 		this.text = 'Hello World';
 	}

 	completeChallenge() {
 		this.section.complete = true;
 		console.log("complete challenge");
 	}

 }
