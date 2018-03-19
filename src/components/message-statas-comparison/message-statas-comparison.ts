import { Component, Input, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the MessageStatasComparisonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-statas-comparison',
  templateUrl: 'message-statas-comparison.html'
})
export class MessageStatasComparisonComponent {

  text: string;
  @Input() public section: any;
  

  constructor() {
  	//this.survey = this.section.survey;

    
  }

}
