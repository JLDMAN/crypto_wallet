import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Message} from 'primeng/api';
import { Router } from '@angular/router';

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
    private router: Router  ){
  }

  ngOnInit(): void{
  }

  submitFormData(){
    const password = this.loginUpForm.value.password;
    const email = this.loginUpForm.value.email;

    if ( password === '' || email === ''){
      this.messages = [{severity: 'error', summary: 'Error', detail: 'Please fill in all fields'}]
    }else{
      this.userService.loginUser(email, password).subscribe(
        (response) => {
          // Handle success (e.g., show a success message)
          console.log('User logged in:', response);
          this.messages = [{severity: 'success', summary: 'Success', detail: 'User logged in'}];
          this.router.navigate(['home']);

        },
        (error) => {
          // Handle error (e.g., show an error message)
          console.log('Login failed:', error);
          this.messages = [{severity: 'error', summary: 'Error', detail: 'User not found, check credentials'}];
        }
      )
    }
  }
}
