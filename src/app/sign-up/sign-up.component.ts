import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Message} from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit{

  messages: Message[] = [];

  signUpForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl('')
  });

  constructor(
    private userService: UserService,
  ){
  }

  ngOnInit(): void{
  }

  submitFormData(){
    const firstName = this.signUpForm.value.firstName;
    const lastName = this.signUpForm.value.lastName;
    const password = this.signUpForm.value.password;
    const email = this.signUpForm.value.email;

    // console.log(firstName, lastName, password, email);

    if ( firstName === '' || lastName === '' || password === '' || email === ''){
      this.messages = [{severity: 'error', summary: 'Error', detail: 'Please fill in all fields'}]
    }else{
      this.userService.registerUser(firstName, lastName, password, email).subscribe(
        (response) => {
          // Handle success (e.g., show a success message)
          console.log('User registered:', response);
          this.messages = [{severity: 'success', summary: 'Success', detail: 'User account created, try logging in'}]
        },
        (error) => {
          // Handle error (e.g., show an error message)
          console.log('Registration failed:', error);
          this.messages = [{severity: 'error', summary: 'Error', detail: 'Email account already used'}]
        }
      )
    }
  }
}
