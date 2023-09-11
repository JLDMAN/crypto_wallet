import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedDataService } from '../service/shareddata.service';
@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})

export class TradeComponent implements OnInit {

  transaction = new FormGroup({
    sellCoin: new FormControl(),
    sellVolume: new FormControl(0),
    buyCoin: new FormControl(),
    buyVolume: new FormControl(0)
  })

  // user retrieved from login-injection
  receivedUser: string | null;
  receivedEmail: string | null;
  // bind values recieved
  coinId: any[] = [];
  coinAmount: any[] = [];

  currentCoins: String[] = [];
  allCoins: string[] = [];
  allCoinsPrice: number[] = [];
  // how many coins are availble to sell
  availableCoinAmount: number = 0;
  // what are available coins worth
  selectedCoinValue: number = 0;
  // what is cost of wanted coin
  coinToBuyValue: any = 0;
  // how many available coins are neede to buy new coin
  neededCoin: number = 0;
  // neededForSwap: number = 0;
  howmuchMustSell: number = 0;
  howmuchCanBuy: number = 0;
  sellAble: number = 0;
  buyAble: number = 0

  constructor(
    private transactions: TransactionService,
    private sharedDataService: SharedDataService,
  ) {
    this.receivedUser = this.sharedDataService.getUserData();
    this.receivedEmail = this.sharedDataService.getEmailData();
  }

  ngOnInit() {
    this.getPossibleAssets();
  }

  getPossibleAssets() {
    // get crypto coin prices
    // cach results
    if (this.allCoins.length === 0 && this.allCoinsPrice.length === 0) {
      this.transactions.getListOfAllCoins().subscribe(res => {
        for (let i = 0; i <= 9; i++) {
          this.allCoins.push(res[i].id);
          this.allCoinsPrice.push(res[i].current_price);
        }
      });
    } else {
      ;
    }

    const user = this.receivedUser;
    const email = this.receivedEmail;

    if (this.coinId.length === 0 && this.coinAmount.length === 0) {
      // get asset/crypto holding totals
      this.transactions.getListOfAssets(user, email).subscribe((res: any) => {
        for (let i = 0; i < res.transactions.totals.length; i++) {
          const item = res.transactions.totals[i];
          this.coinId.push(item.coin_id);
          this.coinAmount.push(item.net_transactions);
        }
      });
    }
  }

  sellUpdate() {
    // if all inputs are present calculate coin relations
    if (this.transaction.value.buyCoin && this.transaction.value.sellCoin && this.transaction.value.buyVolume) {

      // what coin to buy
      const buyCoin = this.transaction.value.buyCoin;
      // what coin to sell
      const sellCoin = this.transaction.value.sellCoin;

      if (buyCoin !== 'mmm' && sellCoin !== 'mmm') {
        // buy coin positon in api array
        const coinToBUYAPIPosition = this.allCoins.findIndex(item => item === buyCoin);
        // buy coin usd value from array
        const coinToBuyValue = this.allCoinsPrice[coinToBUYAPIPosition];
        console.log("sellUpdate - coin to buy usd value: " + coinToBuyValue)

        // sell coin position in api array
        const coinToSellAPIPosition = this.allCoins.findIndex(item => item === sellCoin);
        // sell coin usd value from array
        const coinToSellValue = this.allCoinsPrice[coinToSellAPIPosition];
        console.log("sellUpdate - coin to sel usd value: " + coinToSellValue)

        // transaction in usd
        // amount wanted from user input
        const buyCoinAmount = this.transaction.value.buyVolume;
        console.log("sellUpdate - to buy coin, needed usd: " + buyCoinAmount);
        // transaction requirements
        this.howmuchMustSell = (buyCoinAmount * coinToBuyValue) / coinToSellValue;
        console.log("sellUpdate - amount needed to make purchase: " + this.howmuchMustSell);
      } else {
        // buy coin positon in api array
        const coinToBUYAPIPosition = this.allCoins.findIndex(item => item === buyCoin);
        // buy coin usd value from array
        const coinToBuyValue = this.allCoinsPrice[coinToBUYAPIPosition];
        // console.log("coin to buy usd value: " + coinToBuyValue)

        // pltform coin = 1sud
        const coinToSellValue = 1;

        // transaction in usd
        // amount wanted from user input
        const buyCoinAmount = this.transaction.value.buyVolume;
        // console.log("to buy coin, needed usd: " + buyCoinAmount);
        // transaction requirements
        this.howmuchMustSell = (buyCoinAmount * coinToBuyValue) / coinToSellValue;
        console.log("sellUpdate - amount needed: " + this.howmuchMustSell);
      }
    } else {
      console.log("sellUpdate - not all inputs recieved")
    }
  }

  buyUpdate() {
    // if all inputs are present calculate coin relations
    if (this.transaction.value.buyCoin && this.transaction.value.sellCoin && this.transaction.value.sellVolume) {

      // what coin to buy
      const buyCoin = this.transaction.value.buyCoin;
      // what coin to sell
      const sellCoin = this.transaction.value.sellCoin;

      if (buyCoin !== 'mmm' && sellCoin !== 'mmm') {
        // sell coin position in api array
        const coinToSellAPIPosition = this.allCoins.findIndex(item => item === sellCoin);
        // sell coin usd value from array
        const coinToSellValue = this.allCoinsPrice[coinToSellAPIPosition];
        console.log("buyUpdate - coin to sel usd value: " + coinToSellValue)

        // buy coin positon in api array
        const coinToBUYAPIPosition = this.allCoins.findIndex(item => item === buyCoin);
        // buy coin usd value from array
        const coinToBuyValue = this.allCoinsPrice[coinToBUYAPIPosition];
        console.log("buyUpdate - coin to buy usd value: " + coinToBuyValue)

        // transaction in usd
        // amount wanted from user input
        const sellCoinAmount = this.transaction.value.sellVolume;
        console.log("buyUpdate - how many coins to sell " + sellCoinAmount);
        // transaction requirements
        this.howmuchCanBuy = (sellCoinAmount * coinToSellValue) / coinToBuyValue;
        console.log("buyUpdate - amount you can get: " + this.howmuchCanBuy);
      } else {
        // buy coin positon in api array
        const coinToBUYAPIPosition = this.allCoins.findIndex(item => item === buyCoin);
        // buy coin usd value from array
        const coinToBuyValue = this.allCoinsPrice[coinToBUYAPIPosition];
        // console.log("coin to buy usd value: " + coinToBuyValue)

        // pltform coin = 1sud
        const coinToSellValue = 1;

        // transaction in usd
        // amount wanted from user input
        const sellCoinAmount = this.transaction.value.sellVolume;
        // console.log("to buy coin, needed usd: " + buyCoinAmount);
        // transaction requirements
        this.howmuchCanBuy = (sellCoinAmount * coinToBuyValue) / coinToSellValue;
        // console.log("amount needed: " + this.howmuchCanBuy);
      }
    } else {
      console.log("buyUpdate - not all inputs recieved")
    }
  }

  showAvailableBalance() {
    this.sellUpdate();
    // which coin will be sold
    const coinToSell = this.transaction.value.sellCoin;
    // where is coin in id array (NOT API)
    // const coinToSellIndex = this.allCoins.findIndex(item => item === coinToSell);
    const coinToSellIndex = this.coinId.findIndex(item => item === coinToSell);
    // get coin monetary value from values array using previous index (NOT API)
    // this.availableCoinAmount = this.allCoinsPrice[coinToSellIndex];
    this.availableCoinAmount = this.coinAmount[coinToSellIndex];
    // coins user owns
    const coinToSellAPIPosition = this.coinId.findIndex(item => item === coinToSell);

    // how much is the tradable coin worth
    if (coinToSell !== 'mmm') {

      this.selectedCoinValue = this.allCoinsPrice[coinToSellAPIPosition];
      console.log("selectedCoinValue" + this.selectedCoinValue)
      // how much of coin is needed to trade
      this.neededCoin = this.coinToBuyValue / this.selectedCoinValue;
    } else {
      this.selectedCoinValue = 1; // local token valued at 1 usd
      // how much of coin is needed to trade
      this.neededCoin = this.coinToBuyValue / this.selectedCoinValue;
    }
  }

  // selling() {
  //   // Selling
  //   const sellCoin = this.transaction.value.sellCoin;
  //   const sellVolume = this.transaction.value.sellVolume;
  //   // selling value
  //   const sellIndex = this.allCoins.findIndex(item => item === sellCoin);

  //   if (sellVolume && sellIndex) {
  //     // Calculate the cost
  //     this.sellAble = sellVolume * this.allCoinsPrice[sellIndex - 1];
  //     // console.log(`Selling cost: ${cost}`);
  //   } else {
  //     console.log(`Invalid sellCoin or missing price data.`);
  //   }
  // }

  // buying() {
  //   // Buying
  //   const buyCoin = this.transaction.value.buyCoin;
  //   const buyVolume = this.transaction.value.buyVolume;
  //   // Buy value
  //   const buyIndex = this.allCoins.findIndex(item => item === buyCoin)

  //   if (buyVolume && buyIndex) {
  //     // Calculate the cost
  //     this.buyAble = buyVolume * this.allCoinsPrice[buyIndex - 1];
  //     // console.log(`Selling cost: ${cost}`);
  //   } else {
  //     console.log(`Invalid sellCoin or missing price data.`);
  //   }
  // }

  // previewTrade() {
  //   this.selling();
  //   this.buying();

  //   if (this.sellAble / this.buyAble >= 1) {
  //     console.log("can execute");
  //   } else {
  //     console.log("can't execute");
  //   }
  // }

  completeTrade() {
  }
}
