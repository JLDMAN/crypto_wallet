// shared-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class SharedDataService {

    user: any = '';
    email: any = '';

    // call user name from any component
    getUserData(){
        return this.user;
    }
    
    // get user name from login and make callable
    setUserData(user: string) {
        this.user = user;
    }

    // call user email from any component
    getEmailData(){
        return this.email;
    }

    // get user email from login and make callable
    setEmailData(email: string) {
        this.email = email;
    }
}