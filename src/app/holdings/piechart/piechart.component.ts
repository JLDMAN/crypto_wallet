import { TransactionService } from '../../service/transaction.service';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../service/shareddata.service';
import { FormControl } from '@angular/forms';
import { coinService } from 'src/app/service/coinapi.service';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent {

  // bind user values recieved
  coinId: any[] = [''];
  coinAmount: any[] = [0];
  // get api coin values
  allCoins = [''];
  allCoinsPrice = [0];
  // usd value of coins
  eachCoinWorth = [0];
  // use for pie chart
  data: any;
  options: any;
  // user retrieved from login-injection
  receivedUser: string | null;
  receivedEmail: string | null;

  constructor(
    private sharedDataService: SharedDataService,
    private transactions: TransactionService,
    private coinservice: coinService) {
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
    this.allCoins = [];
    this.allCoinsPrice = [];
    this.eachCoinWorth = [];

    if (this.receivedUser && this.receivedEmail) {
      this.transactions.getListOfAssets(this.receivedUser, this.receivedEmail).subscribe((res: any) => {

        for (let i = 0; i < res.transactions.totals.length; i++) {
          const item = res.transactions.totals[i];
          this.coinId.push(item.coin_id);
          this.coinAmount.push(item.net_transactions);
        }

        this.transactions.getListOfAllCoins().subscribe(res => {
          for (let j = 0; j < res.length; j++) {
            // this.allCoins.push(res[j]);
            this.allCoins.push(res[j].id);
            this.allCoinsPrice.push(res[j].current_price);
          }
        });

        for ( let k = 0; k < this.coinId.length; k ++){
          const coinIndex = this.allCoins.findIndex(this.coinId[k]);
          const coinValue = this.allCoinsPrice[coinIndex];
          this.eachCoinWorth[k] = coinValue * this.coinAmount[k];
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
          data: this.eachCoinWorth,
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
