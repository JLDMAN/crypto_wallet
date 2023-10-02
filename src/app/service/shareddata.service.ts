import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class SharedDataService {

    user: string = '';
    email: string = '';

    // call user name from any component
    getUserData(){
        // return this.user;
        return localStorage.getItem('user');
    }
    
    // get user name from login and make callable
    setUserData(user: string) {
        // this.user = user;
        localStorage.setItem('user', user);
    }

    // call user email from any component
    getEmailData(){
        // return this.email;
        return localStorage.getItem('email');
    }

    // get user email from login and make callable
    setEmailData(email: string) {
        // this.email = email;
        localStorage.setItem('email', email);
    }
}