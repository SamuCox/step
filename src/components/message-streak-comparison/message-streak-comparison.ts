import { Component, Input, ViewChild} from '@angular/core';
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
     console.log("comparisonMode = " + this._section.type);
     this.initializeGraph();
   }

   get section(): any {
     return this._section;
   }

   @ViewChild('barCanvas') barCanvas;

   barChart: any;

   //@ViewChild('cohortCanvas') cohortCanvas;

   //cohortChart: any;

   comparisonMode = 'calendar';
   hasCohortInitialized = false;
   hasShownComparison = false;

   constructor(private viewController: ViewController) {
   }

   initializeBarColors() {
     var colorArray = this.section.steps.map(step =>{ 
       var cObj = [];
       if (step < 5000) {
         cObj.push('rgba(255, 99, 132, 0.3)');
       } else if (step < 7500) {
         cObj.push('rgba(255, 159, 64, 0.3)');
       } else if (step < 10000) {
         cObj.push('rgba(54, 162, 235, 0.3)');
       } else {
         cObj.push('rgba(75, 192, 192, 0.3)');
       }
       return cObj;
     });
     return colorArray;
   }

   initializeGraph() {

     var emptyLabels = [];
     for (var i=0; i<this.section.steps.length; i++) {
       emptyLabels.push("");
     }

     this.loadGraph();
   }

   loadGraph() {
     const maxStepCount = Math.max(...this.section.steps);
     var maxYAxis = maxStepCount > 10000 ? Math.ceil(maxStepCount/1000)*1000 : 10000;
     const colorArray = this.initializeBarColors();

     if (this.barCanvas) {
       this.barChart = new Chart(this.barCanvas.nativeElement, {

         type: 'bar',
         data: {
           labels: this.section.dates,
           datasets: [{
             label: 'Step Count',
             data: this.section.steps,
             backgroundColor: colorArray,
             borderColor: [
             'rgba(255,99,132,1)'
             ],
             borderWidth: 0
           }]
         },
         options: {
           events: [],
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
               top: 20,
               bottom: 0
             }
           },
           scales: {
             xAxes: [{
               gridLines: {
                 display: false,
                 //drawBorder: false,
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
                 display: false,
                 //drawBorder: false,
               }
             }]
           }
         }    
       });
     }
   }

   initializeCohort() {
   }

   selectCalendar() {
     this.barChart.data.datasets.pop();
     this.barChart.data.datasets.push({
       label: 'Line Comparison',
       data: this.section.calendarSteps,
       type: 'line'
     });
     this.barChart.update();
   }

   selectCohort() {
     this.barChart.data.datasets.pop();
     this.barChart.data.datasets.push({
       label: 'Line Comparison',
       data: this.section.cohortSteps,
       type: 'line'
     });
     this.barChart.update();
   }

   showComparison(event) {
     if (event.value && !this.hasShownComparison) {
       console.log("yeee!");
       this.hasShownComparison = true;
       console.log(this.hasShownComparison);
       this.barChart.data.datasets.push({
       label: 'Line Comparison',
       data: this.section.cohortSteps,
       type: 'line'
     });
       this.barChart.update();
       console.log("hmmm");
     } else {
       console.log("nooo!");
     }
     
   }
 }
