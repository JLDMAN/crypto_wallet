// System
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Routes
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { HoldingsComponent } from './holdings/holdings.component';
import { TradeComponent } from './trade/trade.component';
import { MarketoverviewComponent } from './marketoverview/marketoverview.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
// prime ng modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { PiechartComponent } from './holdings/piechart/piechart.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SidebarModule } from 'primeng/sidebar';
import { CoinHoldingsComponent } from './holdings/coin-holdings/coin-holdings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    HoldingsComponent,
    TradeComponent,
    MarketoverviewComponent,
    AboutComponent,
    MainComponent,
    PiechartComponent,
    CoinHoldingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    PasswordModule,
    ConfirmPopupModule,
    MessagesModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    ChartModule,
    InputNumberModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    SidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
