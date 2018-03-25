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

 	private _section: any;


   @Input() set section(value: any) {
     this._section = value;
     this.initializeGraph();
   }

   get section(): any {
     return this._section;
   }

   steps = [] as number[];
   dates = [] as string[];


   @ViewChild('barCanvas') barCanvas;

   barChart: any;

   constructor(private viewController: ViewController) {
     //this.initializeGraph();
     console.log('Hello MessageGraphComponent Component');
    //this.text = 'Hello World';
    /*
    this.viewController.didEnter.subscribe(
    	() => { console.log("exm??"); this.initializeGraph();}
    	);*/

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

      const maxStepCount = Math.max(...this.section.steps);
      var maxYAxis = maxStepCount > 10000 ? Math.ceil(maxStepCount/1000)*1000 : 10000;

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
          maintainAspectRatio: false,
          legend: {
            display: false,
            labels: {
              fontColor: 'rgb(255, 99, 132)'
            }
          },
          layout :{
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero:true,
                max : maxYAxis,
                stepSize : 5000,
                callback: function(label, index, labels) {
                  return (label == 0)? 0 : label/1000+'k';
                }
              },
              gridLines: {
                display: true
              }
            }]
          }
        }		
      });
    }

/*
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
  */

}
