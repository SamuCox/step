import { Component, Input, NgModule,ViewChild, ViewChildren, QueryList} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Slides } from 'ionic-angular';
import {MessageSurveyComponent} from '../message-survey/message-survey'
import * as moment from 'moment';

/**
 * Generated class for the MessageDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
 @Component({
 	selector: 'message-detail',
 	templateUrl: 'message-detail.html'
 })
 export class MessageDetailComponent {

 	//@Input() public messageId: string;

 	//@Input() msg: AngularFireAction<DatabaseSnapshot>;
 	@ViewChild(Content) pageContent: Content;
 	@ViewChild(Slides) slides: Slides;
 	@ViewChildren('messageSurvey') surveys: QueryList<MessageSurveyComponent>;

 	private _msg: AngularFireAction<DatabaseSnapshot>;
 	@Input() set msg(value: AngularFireAction<DatabaseSnapshot>) {
 		this._msg = value;
 		console.log("msg came in!");
 		//this.initializeGraph();
 		if (this.content = value.payload.val().content) {

 		}
 		//this.content = value.payload.val().content;
 		//console.log("content: " + this.content);
 		if (this.messageId = value.payload.key) {

 		}
 		if (this.sections = value.payload.val().sections){

 		}
 		console.log("payload sections are: " + this.sections);
 		//console.log("length: " + this.sections.length);
 		if (this.time = value.payload.val().time) {

 		}

 		if (this.sections) {
 			this.displayedSections.push(this.sections[0]);
 		}
 	}

 	get msg(): AngularFireAction<DatabaseSnapshot> {
 		return this._msg;
 	}

 	private _currentActiveSlide: number;
 	get currentActiveSlide(): number {
 		if (this.slides) {
 			return this.slides.getActiveIndex();
 		} else {
 			return 0;
 		}
 	}

 	private todo : FormGroup;
 	valid = true;

 	messageId: string;
 	sectionTitle = ["Your challenge reflection", "How you walked", "Get ready for a new day!"];

 	//todo from server
 	currentQIDs = [0, 0, 0, 0, 0];

 	title : string;
 	content : string;
 	sections : [any];
 	displayedSections = [];
 	progressIndex = 0;
 	time : any;

 	constructor() {
 	}

 	getMonthName(index: number) {
 		return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index-1];
 	}

 	ngOnChanges(changes: any) {
 	}

 	logForm(idx: number){
 		this.slides.slideNext(500, true);

 		//todo: upload answers & update statue to firebase - validate? - push answers one by one (answer = category[index])
 		//console.log("index == " + this.displayedSections.length);
 	}

 	scrollTo(elementId:string) {
 		//let yOffset = document.getElementById(elementId).offsetTop + document.getElementById(elementId).offsetHeight;
 		//this.pageContent.scrollTo(0, yOffset, 4000);
 	}

 	validateForm(idx: number) {
 		if (this.surveys) {
 			var currentSurvey = this.surveys.find(survey => survey.sectionId == idx);
 			console.log("survey length " + this.surveys.first.sectionId + " and id is " + idx);
 			if (currentSurvey) {
 				return currentSurvey.isValid();
 			} else {
 				return false;
 			}
 		} else {
 			return false;
 		}
 	}

 }


