import { Component, Input, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Slides } from 'ionic-angular';
import { DatabaseHelperProvider } from '../../providers/database-helper/database-helper';
import { StackConfig, Stack, Card, ThrowEvent, DragEvent, SwingStackComponent, SwingCardComponent} from 'angular2-swing';

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

   @ViewChild('myswing1') swingStack: SwingStackComponent;
   @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

   private _section: any;
   @Input() set section(value: any) {
     this._section = value;
     this.initializeAnswerArrays(value.pre_survey.length, value.options.length);
     this.challenges = this.section.options;

		// initialize answer based on question type
  }
  get section(): any {
    return this._section;
  }

  @ViewChild(Slides) slides: Slides;

  public answers: (string|number)[][] = null;
  public challenges: any[];

  stackConfig: StackConfig;



  constructor(public dbHelperProvider: DatabaseHelperProvider) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

   // Called whenever we drag an element
   onItemMove(element, x, y, r) {
     var abs = Math.abs(x);
     let min = Math.trunc(Math.min(16*16 - abs, 16*16));
     element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
   }

// Connected through HTML
voteUp(like: boolean) {
  let removedCard = this.challenges.pop();
  //this.addNewCards(1);

  /*
  if (like) {
    this.recentCard = 'You liked: ' + removedCard.email;
  } else {
    this.recentCard = 'You disliked: ' + removedCard.email;
  }  */
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
    //this.voteUp(true);
    console.log("accept challenge");
  }

  dislikeChallenge(cidex: number) {
    this.voteUp(false);
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
