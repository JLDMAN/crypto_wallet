import { Router } from '@angular/router';
import { Component, OnInit, asNativeElements } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from '../service/shareddata.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css'],
  providers: [ConfirmationService, MessageService]
})

export class TradeComponent implements OnInit {

  transaction: FormGroup;

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
  sellAble: number = 0;
  buyAble: number = 0
  // swap check before excecuting
  insufficientFunds: boolean = false;
  checked: boolean = false;
  buyInterface: any;
  sellInterface: any;
  available: any;
  buyCoin: string ='';
  sellCoin: string = '';
  sellCoinAmount: number = 0;
  howmuchCanBuy:  string = '';
  sidebarVisible: boolean = false;
  selectCoins: boolean = false;
  zeroTradeAmount: boolean = false;

  constructor(
    private transactions: TransactionService,
    private sharedDataService: SharedDataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.receivedUser = this.sharedDataService.getUserData();
    this.receivedEmail = this.sharedDataService.getEmailData();
    this.transaction = this.fb.group({
      buyCoin: [null, Validators.required],
      sellCoin: [null, Validators.required],
      buyVolume: [null, Validators.required],
      sellVolume: [null, Validators.required],
      checked: <boolean> false,
    })
  }

  ngOnInit() {
    this.getPossibleAssets();
    this.updateInterface();
    this.getAvailable();
  }

  updateInterface(){
    this.checked = !this.checked;
    this.buyInterface = !this.checked;
    this.sellInterface = this.checked;
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
      // console.log(this.coinId);
      // console.log(this.coinAmount);
    }
  }

  getAvailable(){
    this.available = 0;
      // console.log("coint to sell update triggered")
      const coinToSell = this.transaction.value.sellCoin;
      const coinToSellPosition = this.coinId.findIndex(item => item === coinToSell);
      this.available = this.coinAmount[coinToSellPosition];
  }

  buyUpdate() {
    this.sellCoin = this.transaction.value.sellCoin;
    this.buyCoin = this.transaction.value.buyCoin;
    this.sellCoinAmount = this.transaction.value.sellVolume;

    // if all inputs are present calculate coin relations
    if (this.buyCoin && this.sellCoin && this.sellCoinAmount) {
      // what coin to buy
      const buyCoin = this.transaction.value.buyCoin;
      // buy coin positon in api array
      const coinToBUYAPIPosition = this.allCoins.findIndex(item => item === buyCoin);
      // buy coin usd value from array
      const coinToBuyValue = this.allCoinsPrice[coinToBUYAPIPosition];

      // what coin to sell
      const sellCoin = this.transaction.value.sellCoin;
      // sell coin position in api array
      const coinToSellAPIPosition = this.allCoins.findIndex(item => item === sellCoin);
      // sell coin usd value from array
      const coinToSellValue = this.allCoinsPrice[coinToSellAPIPosition];

      // transaction requirements
      if (this.sellCoinAmount) {
        this.howmuchCanBuy = ((this.sellCoinAmount * coinToSellValue) / coinToBuyValue).toFixed(6);
      }
    }
  }

  confirm(event: Event) {
    // reset err message
    this.insufficientFunds = false;

    if (this.transaction.value.buyCoin  && this.transaction.value.sellCoin ){
      if (this.available < this.sellCoinAmount) {
        this.insufficientFunds = true;
        this.selectCoins = false;
        this.zeroTradeAmount = false;
      } else if(this.sellCoinAmount === 0){
        this.insufficientFunds = false;
        this.selectCoins = false;
        this.zeroTradeAmount = true;
      } else {
        this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Make swap?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            this.swapAssets();
          },
          reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
          }
        });
      }
    }else{
      this.selectCoins = true;
      this.insufficientFunds = false;
      this.zeroTradeAmount = false;
    }
  }

  swapAssets() {
    this.transactions.makeTrade(this.receivedUser, 
      this.receivedEmail, 
      this.buyCoin, 
      this.howmuchCanBuy, 
      this.sellCoin, 
      this.sellCoinAmount).subscribe((res: any) => {
        if(res.status="success"){
          this.getPossibleAssets();
          this.updateInterface();
          this.getAvailable();
          this.sidebarVisible = true;
        }else{
        }
    });
  }

  closePopup(){
  }
}