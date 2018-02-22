import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello MessageDetailComponent Component');
    this.text = 'Hello World';
  }

}
