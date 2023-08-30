import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { HoldingsComponent } from './holdings/holdings.component';
import { TradeComponent } from './trade/trade.component';
import { MarketoverviewComponent } from './marketoverview/marketoverview.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'sign-up', component: SignUpComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'main', component: MainComponent, children:[
    {path: 'holdings', component: HoldingsComponent},
    {path: 'trade', component: TradeComponent},
    {path: 'marketoverview', component: MarketoverviewComponent},
    {path: 'about', component: AboutComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
