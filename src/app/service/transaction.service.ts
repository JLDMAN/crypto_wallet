import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient,
  ){ 
  }

  getListOfAssets(user: any, email: any): Observable<any>{
    const loggedInUser = { 
      user, email
    };

    return this.http.post<any>(`${this.apiUrl}/checkBalances`, loggedInUser);
  }

  getListOfAllCoins(){
    return this.http.get<any>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false&locale=en');
  }
}
