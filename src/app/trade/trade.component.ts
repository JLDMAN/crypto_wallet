import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})

export class TradeComponent implements OnInit {

  transaction = new FormGroup({
    sellCoin: new FormControl(''),
    sellVolume: new FormControl(0),
    buyCoin: new FormControl(''),
    buyVolume: new FormControl(0)
  })

  constructor(
    private transactions: TransactionService,
  ) {
  }

  currentCoins: String[] = [''];
  allCoins: string[] = [''];
  allCoinsPrice: number[] = [];

  sellAble: number = 0;
  buyAble: number = 0

  ngOnInit() {
    this.getPossibleAssets();
  }

  // getCurrentAssets() {
  //   this.transactions.getListOfAssets().subscribe(res => {
  //     this.currentCoins.push(res.assets);
  //   })
  // }

  getPossibleAssets() {
    this.transactions.getListOfAllCoins().subscribe(res => {
      for (let i = 0; i <= 9; i++) {
        this.currentCoins.push(res[i].id);
        this.allCoins.push(res[i].id);
        this.allCoinsPrice.push(res[i].current_price);
      }
    });
  }

  selling() {
    // Selling
    const sellCoin = this.transaction.value.sellCoin;
    const sellVolume = this.transaction.value.sellVolume;
    // selling value
    const sellIndex = this.allCoins.findIndex(item => item === sellCoin);

    if (sellVolume && sellIndex) {
      // Calculate the cost
      this.sellAble = sellVolume * this.allCoinsPrice[sellIndex - 1];
      // console.log(`Selling cost: ${cost}`);
    } else {
      console.log(`Invalid sellCoin or missing price data.`);
    }
  }

  buying() {
    // Buying
    const buyCoin = this.transaction.value.buyCoin;
    const buyVolume = this.transaction.value.buyVolume;
    // Buy value
    const buyIndex = this.allCoins.findIndex(item => item === buyCoin)

    if (buyVolume && buyIndex) {
      // Calculate the cost
      this.buyAble = buyVolume * this.allCoinsPrice[buyIndex - 1];
      // console.log(`Selling cost: ${cost}`);
    } else {
      console.log(`Invalid sellCoin or missing price data.`);
    }
  }

  previewTrade() {
    this.selling();
    this.buying();

    if (this.sellAble / this.buyAble >= 1) {
      console.log("can execute");
    } else {
      console.log("can't execute");
    }
  }

  completeTrade() {
  }
}
