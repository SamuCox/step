import { Component, Input } from '@angular/core';

/**
 * Generated class for the MessageGraphComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-graph',
  templateUrl: 'message-graph.html'
})
export class MessageGraphComponent {

  text: string;

  constructor() {
    console.log('Hello MessageGraphComponent Component');
    this.text = 'Hello World';
  }

}
