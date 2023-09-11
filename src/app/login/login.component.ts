import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { SharedDataService } from '../service/shareddata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  name: string = "";
  messages: Message[] = [];

  loginUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private sharedDataService: SharedDataService) {
  }

  ngOnInit(): void {
  }

  submitFormData() {
    const password = this.loginUpForm.value.password;
    const email = this.loginUpForm.value.email;

    if (password === '' || email === '') {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Please fill in all fields' }]
    } else {
      this.userService.loginUser(email, password).subscribe(
        (res: any) => {
          // console.log("Login Successful: " + res);
        const user = res.user;
        const email = res.email;

        this.messages = [
          { severity: 'success', summary: 'Success', detail: 'User logged in' },
        ];
        // make user details avialable througout app
        this.sharedDataService.setUserData(user);
        this.sharedDataService.setEmailData(email);
        this.router.navigate(['main']);
        },
        (error) => {
          // console.log("Login Error: " + error);
          console.log("bad login");
            this.messages = [
              { severity: 'error', summary: 'Error', detail: 'User not found'},
            ];
        })
    }
  }
}