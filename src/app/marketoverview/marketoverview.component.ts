import { Component, OnInit } from '@angular/core';
import { coinService } from '../service/coinapi.service';

@Component({
  selector: 'app-marketoverview',
  templateUrl: './marketoverview.component.html',
  styleUrls: ['./marketoverview.component.css']
})
export class MarketoverviewComponent implements OnInit {

  rowData: any[] = [];

  headings: any[] = [
    ('Coin'),
    // ('Marketcap %'),
    ('Logo'),
    ('Price (USD)'),
    ('Price Change %'),
    ('24hr Volume (USD)'),
    ('Market Cap (USD)')
  ];

  constructor(
    private coinservice: coinService
  ) {
  }

  coinData: any[] = [];

  ngOnInit(): void {
    // if(this.rowData){
    // }else{
    this.marketData();
    // }
  }

  marketData() {
    this.coinservice.queryForMarketData().subscribe(res => {
        // Assuming res is an array of objects like the API response
        this.rowData = res.slice(0, 15).map((item: { name: any; image: any; current_price: any; total_volume: any; market_cap: any; price_change_percentage_24h: any }) => ({
            coinName: item.name,
            coinLogo: item.image,
            currentPrice: item.current_price.toFixed(2),
            priceChange: item.price_change_percentage_24h.toFixed(2),
            volume: item.total_volume.toFixed(2),
            marketCap: item.market_cap.toFixed(2),
        }));
        console.log(this.rowData); // Check if data is being loaded
    });
}
}
