import { TransactionService } from '../../service/transaction.service';
import { Component, OnInit, Input } from '@angular/core';
import { SharedDataService } from '../../service/shareddata.service';
import { coinService } from 'src/app/service/coinapi.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent {

 @Input() coinId: any[] | undefined;
 @Input() eachCoinWorth: any[] | undefined;

 // use for pie chart
 data: any;
 options: any;

 ngOnInit(){
  this.drawPie();
 }

  drawPie() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: this.coinId,
      datasets: [
        {
          data: this.eachCoinWorth,
          backgroundColor: [
            'rgba(255, 159, 64, 0.5)', 
            'rgba(75, 192, 192, 0.5)', 
            'rgba(54, 162, 235, 0.5)', 
            'rgba(153, 102, 255, 0.5)'],
          hoverBackgroundColor: [
            'rgba(255, 159, 64, 0.5)', 
            'rgba(75, 192, 192, 0.5)', 
            'rgba(54, 162, 235, 0.5)', 
            'rgba(153, 102, 255, 0.5)']
        }
      ]
    };

    this.options = {
      cutout: '80%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }
}
