import { Component, Input, NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


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

 	@Input() msg: AngularFireAction<DatabaseSnapshot>;

 	private todo : FormGroup;

  survey = [];

  likert1: number = 5;
  likert2: number = 5;
  likert3: number;
  mcq1: number = 0;

  field1: string = "";

  likert: [number] = [1];

 	text: string;

 	title : string;
 	content : string;
 	sections : [any];
 	time : any;

 	constructor(private formBuilder: FormBuilder) {
 		this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      field1: [this.field1],
      likert1: [this.likert1],
      likert2: [this.likert2],
      mcq1: [this.mcq1]
    });	
 	}

 	ngOnChanges(changes: any) {
 		this.content = this.msg.payload.val().content;
 		console.log("content: " + this.content);
 		this.sections = this.msg.payload.val().sections;
 		console.log("length: " + this.sections.length);
 		this.time = this.msg.payload.val().time;
 	}

 	logForm(){
    console.log(this.todo.value)
  }

 }


