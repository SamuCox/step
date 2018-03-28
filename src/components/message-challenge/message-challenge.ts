import { Component, Input, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

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

 	constructor() {
 		
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

 	completeChallenge() {
 		this.section.complete = true;
 		console.log("complete challenge");
 	}

 	nextChallenge() {
     this.slides.slideNext(500, true);
   }

  prevChallenge() {
    this.slides.slidePrev(500, true);
   }

 }
