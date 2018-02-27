import { Component, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ViewController } from 'ionic-angular';

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

 	@Input() public text: string;
 	@Input() public section: any;


 	@ViewChild('barCanvas') barCanvas;

 	barChart: any;

 	constructor(private viewController: ViewController) {
 		console.log('Hello MessageGraphComponent Component');
    //this.text = 'Hello World';
    this.viewController.didEnter.subscribe(
    	() => this.initializeGraph()
    	);
  }

  ionViewDidLoad() {
  	console.log("graph going to load");
  }

  initializeGraph() {
  	console.log("section: " + this.section);
  	console.log("section: " + this.section.content);
  	for(var property in this.section) {
  		console.log(property + "=" + this.section[property]);
  		console.log(this.section.value);
  	}

  	this.barChart = new Chart(this.barCanvas.nativeElement, {

  		type: 'bar',
  		data: {
  			labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  			datasets: [{
  				label: '# of Votes',
  				data: [12, 19, 3, 5, 2, 3],
  				backgroundColor: [
  				'rgba(255, 99, 132, 0.2)',
  				'rgba(54, 162, 235, 0.2)',
  				'rgba(255, 206, 86, 0.2)',
  				'rgba(75, 192, 192, 0.2)',
  				'rgba(153, 102, 255, 0.2)',
  				'rgba(255, 159, 64, 0.2)'
  				],
  				borderColor: [
  				'rgba(255,99,132,1)',
  				'rgba(54, 162, 235, 1)',
  				'rgba(255, 206, 86, 1)',
  				'rgba(75, 192, 192, 1)',
  				'rgba(153, 102, 255, 1)',
  				'rgba(255, 159, 64, 1)'
  				],
  				borderWidth: 1
  			}]
  		},
  		options: {
  			scales: {
  				yAxes: [{
  					ticks: {
  						beginAtZero:true
  					}
  				}]
  			}
  		}		
  	});
  }

}
