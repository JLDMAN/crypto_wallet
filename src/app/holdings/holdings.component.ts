import { TransactionService } from './../service/transaction.service';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../service/shareddata.service';
import { coinService } from '../service/coinapi.service';

@Component({
  selector: 'app-holdings',
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.css']
})
export class HoldingsComponent implements OnInit {

  // bind user values recieved
  coinId: any[] = [''];
  coinAmount: any[] = [0];
  // get api coin values
  allCoinsImg = [''];
  allCoinsPercChange = [''];
  allCoins = [''];
  allCoinsPrice = [0];
  image = [''];
  percentageChange = [''];
  coinPrice = [0];
  // usd value of coins
  eachCoinWorthUSD = [0];
  // user retrieved from login-injection
  receivedUser: string | null;
  receivedEmail: string | null;
  // show data or api limit
  data: boolean = false;
  error: boolean = false;
  //

  constructor(
    private sharedDataService: SharedDataService,
    private transactions: TransactionService,
    private coinservice: coinService) {
    this.receivedUser = this.sharedDataService.getUserData();
    this.receivedEmail = this.sharedDataService.getEmailData();
  }

  ngOnInit(): void {
    this.marketAPIData();
    // this.getAssetDistribution();
  }

  marketAPIData(){
    console.log("api call made from frontend");
    this.coinservice.queryMarketAPI();
  }

  getAssetDistribution() {
    // Initialize arrays to store data
    this.coinId = [];
    this.coinAmount = [];
    this.allCoins = [];
    this.allCoinsPrice = [];
    this.eachCoinWorthUSD = [];
    this.allCoinsImg = [];
    this.allCoinsPercChange = [];
    this.image = [];
    this.percentageChange = [];
    this.coinPrice = [];

    if (this.receivedUser && this.receivedEmail) {
      // get user data from transactions
      this.transactions.getListOfAssets(this.receivedUser, this.receivedEmail).subscribe(
        (res: any) => {
        for (let i = 0; i < res.transactions.totals.length; i++) {
          const item = res.transactions.totals[i];
          this.coinId.push(item.coin_id);
          this.coinAmount.push(item.net_transactions);
        }
        }
      );

      // get all coin data from api
      this.transactions.getListOfAllCoins().subscribe(
        (res) => {
          for (let j = 0; j < res.length; j++) {
            this.allCoins.push(res[j].id);
            this.allCoinsPrice.push(res[j].current_price);
            this.allCoinsImg.push(res[j].image);
            this.allCoinsPercChange.push(res[j].market_cap_change_percentage_24h);
          }

          for (let k = 0; k < this.coinId.length; k++) {
            // get coin position in initial api data then in sub arrays
            const coinToFind = this.coinId[k];
            const coinIndex = this.allCoins.findIndex(coin => coin === coinToFind);
            // coin details send to child components for populating
            this.coinPrice[k] = this.allCoinsPrice[coinIndex];
            this.eachCoinWorthUSD[k] = this.coinPrice[k] * this.coinAmount[k];
            this.image[k] = this.allCoinsImg[coinIndex];
            this.percentageChange[k] = this.allCoinsPercChange[coinIndex];
          }

          this.error = false;
          this.data = true;
        },
        (error) => {
          if (error.status === 0) {
            this.error = true;
            this.data = false;
          }
        }
      );
    } else {
      // Handle the case where receivedUser or receivedEmail is not available
    }
  }
}
