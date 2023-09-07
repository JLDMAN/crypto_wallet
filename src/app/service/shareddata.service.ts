// shared-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class SharedDataService {
    private userDataSubject = new BehaviorSubject<string | null>(null);
    private emailDataSubject = new BehaviorSubject<string | null>(null);

    public userData$ = this.userDataSubject.asObservable();
    public emailData$ = this.emailDataSubject.asObservable();

    // get user name from login and make callable
    getUserData(): string | null {
        return this.userDataSubject.value;
    }
    // call user name from any component
    setUserData(user: string) {
        this.userDataSubject.next(user);
    }

    // get user email from login and make callable
    getEmailData(): string | null {
        return this.emailDataSubject.value;
    }
    // call user email from any component
    setEmailData(email: string) {
        this.emailDataSubject.next(email);
    }
}