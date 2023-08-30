import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(
    private router: Router,
  ){
  }

  ngOnInit(): void {
  }

  loadHoldings(){
    this.router.navigate(["main/holdings"]);
  }

  loadTrade(){
    this.router.navigate(["main/trade"]);
  }

  loadMarkets(){
    this.router.navigate(["main/marketoverview"]);
  }

  loadAbout(){
    this.router.navigate(["main/about"]);
  }

  logout(){
    this.router.navigate(["login"]);
  }
}
