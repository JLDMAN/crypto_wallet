import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coin-holdings',
  templateUrl: './coin-holdings.component.html',
  styleUrls: ['./coin-holdings.component.css']
})
export class CoinHoldingsComponent implements OnInit {

  @Input() coinPrice: any[] | undefined;
  @Input() value: any[] | undefined;
  @Input() img: any[] | undefined;
  @Input() change: any[] | undefined;

  coinData: any = [];

  ngOnInit(): void {
    if( this.coinPrice && this.value && this.img && this.change){
      for (let i = 0; i < this.coinPrice.length; i++) {
        this.coinData.push({
          coinPrice: this.coinPrice[i],
          value: this.value[i].toFixed(2),
          img: this.img[i],
          change: this.change[i].toFixed(2)
        });
      }
    }
  }
}
