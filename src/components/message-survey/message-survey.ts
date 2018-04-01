import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { Scroll } from 'ionic-angular';

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
   @ViewChild('barCanvas') barCanvas;
   @ViewChild('surveyScroll') scroll: ElementRef;
   @Input() public sectionId: number;
   @Input() public messageId: string;
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
   public currentQID = 0;

   valid = true;

   constructor() {
   }

   initializeAnswerArrays(length: number) {
     var answers = new Array(length).fill("");
     this.hasAnswered = new Array(length).fill(false);
     this._survey.forEach(function (question, index) {
       if (question.type == "field") {
         answers[index] = ""
       }
     });
     this.answers = answers;
   }

   public isValid() {
     //return this.hasAnswered.every(answered => answered);
     var valid = true;
     this.answers.every(answer => valid = valid && (answer !== ""));
     return valid;
   }

   public mcqAnswer() {
     console.log("emm");
   }

   scrollSurvey() {
     console.log("我特么scroll了啊！");
     this.currentQID = Math.floor(this.scroll.nativeElement.scrollTop / 210);
     console.log("current qid: " + this.currentQID);
     //this.scroll.nativeElement.scrollTop = 200 * this.currentQID;
   }

   nextQuestion() {
     if (this.currentQID < this.survey.length - 1) {
       this.currentQID++;
       //this.scrollToQuestion(this.currentQID);
     }
     console.log("current qid: " + this.currentQID);
   }

   prevQuestion() {
     if (this.currentQID > 0) {
       this.currentQID--;
       //this.scrollToQuestion(this.currentQID);
     }
     console.log("current qid: " + this.currentQID);
   }

   scrollToQuestion(index: number) {
     console.log("scrolling!!!!");
     try {
       this.scroll.nativeElement.scrollTop = 210 * index;
     } catch(err) { console.log("scroll err " + err)} 
   }
 }
