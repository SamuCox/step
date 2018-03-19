import { Component, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the MessageStreakComparisonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-streak-comparison',
  templateUrl: 'message-streak-comparison.html'
})
export class MessageStreakComparisonComponent {

  text: string;
  private _section: any;


  @Input() set section(value: any) {
  	this._section = value;
  	this.initializeGraph();
  }

  get section(): any {
  	return this._section;
  }

  @ViewChild('barCanvas') barCanvas;

  barChart: any;

  constructor(private viewController: ViewController) {
    this.viewController.didEnter.subscribe(
    	() => { this.initializeGraph();}
    	);
  }

  initializeGraph() {
  	console.log("section: " + this.section);
  	console.log("section: " + this.section.content);
  	for(var property in this.section) {
  		console.log(property + "=" + this.section[property]);
  		console.log(this.section.value);
  	}

  	var emptyLabels = [];
  	for (var i=0; i<this.section.steps.length; i++) {
  		emptyLabels.push("");
  	}

  	this.barChart = new Chart(this.barCanvas.nativeElement, {

  		type: 'bar',
  		data: {
  			labels: this.section.dates,
  			datasets: [{
  				label: 'Step Count',
  				data: this.section.steps,
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

}
