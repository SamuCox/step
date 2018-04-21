import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { DatabaseHelperProvider } from '../../providers/database-helper/database-helper';
import { Scroll, Slides } from 'ionic-angular';

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

   private _survey: any[];
   @ViewChild('barCanvas') barCanvas;
   @ViewChild('surveySlider') slides: Slides;
   //@ViewChild('surveyScroll') scroll: ElementRef;
   @Input() public sectionId: number;
   @Input() public messageId: string;
   @Input() set survey(value: any[]) {
     this._survey = value;
     console.log("msg came in! " + value);
     console.log("msg wut" + value.length);
     var output = '';
     for (var property in value) {
       output += property + ': ' + value[property]+'; ';
     }
     console.log(output);
     this.initializeAnswerArrays(value, value.length);

 		// initialize answer based on question type
 	}
 	get survey(): any[] {
 		return this._survey;
 	}

 	public answers: (string|number)[] = [0];
 	public hasAnswered: boolean[] = [false];
   public likertScales = [1,2,3,4,5,6,7];
   public currentQID = 0;

   valid = true;

   constructor(public dbHelperProvider: DatabaseHelperProvider) {
   }

   initializeAnswerArrays(survey: any[], length: number) {
     var answers = new Array(length).fill("");
     var hasAnswered = new Array(length).fill(false);
     Array.from(survey).forEach(function (question, index) {
       answers[index] = survey[index].answer;
       hasAnswered[index] = survey[index].hasAnswered;
     });
     this.answers = answers;
     this.hasAnswered = hasAnswered;
   }

   public isValid() {
     //return this.hasAnswered.every(answered => answered);
     if (this.answers) {
       var valid = true;
       this.answers.every(answer => valid = valid && (answer !== ""));
       return valid;
     } else {
       return false;
     }
   }

   public saveAnswersToDB() {
     var sectionPath = `${this.messageId}/sections/${this.sectionId}/`;
     var path = `${this.messageId}/sections/${this.sectionId}/survey/`;
     var dbHelper = this.dbHelperProvider;
     var answers = this.answers;
     dbHelper.updateMessage(sectionPath, {hasFinishedSurvey: true});
     this.answers.forEach(function(answer, index) {
       var answerPath = path + index;
       dbHelper.updateMessage(answerPath, {answer: answers[index], isAnswered: true});
     })
     console.log("complete challenge");
   }

   public mcqAnswer() {
     console.log("emm");
   }

   nextQuestion() {

     if (this.currentQID < this.survey.length - 1) {
       setTimeout(() => this.currentQID++, 500);
       this.slides.slideNext();
       //this.scrollToQuestion(this.currentQID);
     }
     console.log("current qid: " + this.currentQID);
   }

   prevQuestion() {
     if (this.currentQID > 0) {
       this.slides.slidePrev();
       //this.currentQID--;
       //this.scrollToQuestion(this.currentQID);
     }
     console.log("current qid: " + this.currentQID);
   }
 }
