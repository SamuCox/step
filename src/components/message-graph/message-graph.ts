import { Component, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ViewController } from 'ionic-angular';
import { Health } from '@ionic-native/health';

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
 	steps = [] as number[];
 	dates = [] as string[];


 	@ViewChild('barCanvas') barCanvas;

 	barChart: any;

 	constructor(private viewController: ViewController, private health: Health) {
 		console.log('Hello MessageGraphComponent Component');
    //this.text = 'Hello World';
    this.viewController.didEnter.subscribe(
    	() => { this.initializeStepData();}
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
  			labels: this.dates,
  			datasets: [{
  				label: 'Step Count',
  				data: this.steps,
  				backgroundColor: [
  				'rgba(255, 99, 132, 0.2)',
  				'rgba(54, 162, 235, 0.2)',
  				'rgba(255, 206, 86, 0.2)',
  				'rgba(75, 192, 192, 0.2)',
  				'rgba(153, 102, 255, 0.2)',
  				'rgba(255, 159, 64, 0.2)'
  				],
  				borderColor: [
  				'rgba(255,99,132,1)'
  				],
  				borderWidth: 1
  			}]
  		},
  		options: {
  			legend: {
  				display: true,
  				labels: {
  					fontColor: 'rgb(255, 99, 132)'
  				}
  			},
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

  initializeStepData() {
  	//let startDate = new Date(this.section.startTime.year, this.section.startTime.month, this.section.startTime.day);
  	let startDate = new Date(this.section.startTime + ' 00:00');
  	let endDate = new Date(this.section.endTime + ' 00:00');
  	var tempSteps = [] as number[];
  	var tempDates = [] as string[];

  	this.health.requestAuthorization([
  		'steps'
  		])
  	.then(res => {
  		console.log("requested " + res);
  		this.health.queryAggregated({
  		startDate: startDate, // three days ago
  		endDate: endDate, // now
  		dataType: 'steps',
  		bucket: 'day'})
  		.then(res => {
  			console.log("what!!");
  			res.forEach(function (value) {
  				console.log("what!! " + parseInt(value.value));
  				tempSteps.push(parseInt(value.value));
  				tempDates.push(value.startDate.getDate() + "");
  				console.log(value.value);
  			})

				/*
				for(var property in res[1]) {
					console.log(property + "=" + res[1][property]);
					this.step = res[1].value;
				}*/
				this.steps = tempSteps;
				this.steps.push(10000);
				this.dates = tempDates;
				this.dates.push("");
				console.log("aaa" + this.steps[0]);
				this.initializeGraph();
				console.log(startDate);
				console.log(endDate);
			})
  		.catch(e => {console.log("steps err " + e)})
  		.catch(e => console.log("e1"+e));
  	}
  	);

  	
  }

}
