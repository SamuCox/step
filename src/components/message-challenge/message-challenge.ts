import { Component, Input, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { DatabaseHelperProvider } from '../../providers/database-helper/database-helper';

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

 	// retrieve info
 	@Input() public sectionId: number;
 	@Input() public messageId: string;

 	private _section: any;
	@Input() set section(value: any) {
 		this._section = value;
 		console.log("msg came in blablabla!");
 		this.initializeAnswerArrays(value.pre_survey.length, value.options.length);
 		console.log("msg wth???!!!!");
 		console.log("init array first value : " + this.answers[0][0])

 		// initialize answer based on question type
 	}
 	get section(): any {
 		return this._section;
 	}

 	@ViewChild(Slides) slides: Slides;

 	public answers: (string|number)[][] = null;

 	constructor(public dbHelperProvider: DatabaseHelperProvider) {
 		
 	}

 	initializeAnswerArrays(qlength: number, olength: number) {
 		console.log("qlength: " + qlength);
 		console.log("olength: " + olength);
 		var answers = new Array(olength);
 		for (var i=0; i<olength; i++) {
 			answers[i] = new Array(qlength);
 			answers[i].fill(0);
 		}
 		this.answers = answers;
 		//this.answers = new Array[qlength][olength]();

 		/*
 		this.answers.forEach(function(subarray) {
 			subarray.fill(0);
 		}) */
 	}

 	nextChallenge() {
     this.slides.slideNext(500, true);
   }

  prevChallenge() {
    this.slides.slidePrev(500, true);
   }

  acceptChallenge(cidx: number) {
  	console.log("accept! SID: " + this.sectionId);
  	console.log("accept! MID: " + this.messageId);

  	//this.section.hasPicked = true;
  	//this.section.pickedIdx = cidx;
  	var path = `${this.messageId}/sections/${this.sectionId}`;
  	this.dbHelperProvider.updateMessage(path, {hasPicked: true});
  	console.log("accept challenge");
  }

  completeChallenge() {
 		this.section.hasCompleted = true;
 		var path = `${this.messageId}/sections/${this.sectionId}`;
  	this.dbHelperProvider.updateMessage(path, {hasCompleted: true});
 		console.log("complete challenge");
 	}

 	giveupChallenge() {
 		this.section.hasGivenup = true;
 		var path = `${this.messageId}/sections/${this.sectionId}`;
  	this.dbHelperProvider.updateMessage(path, {hasGivenup: true});
 		console.log("give up challenge");
 	}


 }
