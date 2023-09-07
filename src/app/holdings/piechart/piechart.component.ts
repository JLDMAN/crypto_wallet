import { TransactionService } from '../../service/transaction.service';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../service/shareddata.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent {

  // bind values recieved
  coinId: any[] = [''];
  coinAmount: any[] = [''];
  // use for pie chart
  data: any;
  options: any;
  // user retrieved from login-injection
  receivedUser: string | null;
  receivedEmail: string | null;

  constructor(
    private sharedDataService: SharedDataService,
    private transactionService: TransactionService) {
    this.receivedUser = this.sharedDataService.getUserData();
    this.receivedEmail = this.sharedDataService.getEmailData();
  }

  ngOnInit(): void {
    this.getAssetDistribution();
  }

  getAssetDistribution() {
    // Initialize arrays to store data
    this.coinId = [];
    this.coinAmount = [];

    if (this.receivedUser && this.receivedEmail) {
      this.transactionService.getListOfAssets(this.receivedUser, this.receivedEmail).subscribe((res: any) => {

        for (let i = 0; i < res.transactions.totals.length; i++) {
          const item = res.transactions.totals[i];
          this.coinId.push(item.coin_id);
          this.coinAmount.push(item.net_transactions);
        }

        this.drawPie()
      });
    } else {
      // Handle the case where receivedUser or receivedEmail is not available
    }
  }

  drawPie() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: this.coinId,
      datasets: [
        {
          data: this.coinAmount,
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
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
