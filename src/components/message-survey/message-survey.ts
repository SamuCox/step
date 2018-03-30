import { Component, Input, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the MessageSurveyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-survey',
  templateUrl: 'message-survey.html'
})
export class MessageSurveyComponent {

  private _survey: any;
  @ViewChild(Slides) slides: Slides;
  @ViewChild('barCanvas') barCanvas;
 	@Input() set survey(value: any) {
 		this._survey = value;
 		console.log("msg came in!");
 		console.log("msg wut" + value.length);
 		this.initializeAnswerArrays(value.length);

 		// initialize answer based on question type
 	}
 	get survey(): any {
 		return this._survey;
 	}

 	public answers: (string|number)[] = [0];
 	public hasAnswered: boolean[] = [false];
  public likertScales = [1,2,3,4,5,6,7];

 	valid = true;

  constructor() {
  }

  initializeAnswerArrays(length: number) {
  	var answers = new Array(length).fill(4);
  	this.hasAnswered = new Array(length).fill(false);
  	this._survey.forEach(function (question, index) {
 			if (question.type == "field") {
 				answers[index] = ""
 			}
 		});
 		this.answers = answers;
  }

  public isValid() {
  	return this.hasAnswered.every(answered => answered);
  }

  public mcqAnswer() {
  	console.log("emm");
  }

  nextQuestion() {
     this.slides.slideNext(500, true);
   }

  prevQuestion() {
    this.slides.slidePrev(500, true);
   }
}
