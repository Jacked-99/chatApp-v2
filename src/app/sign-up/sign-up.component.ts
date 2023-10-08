import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
    });
  }
  checkValid() {
    const values = [...this.signInForm.value];
    values.forEach((value) => {
      if (value.invalid && value.touched) {
        return 'border-red-500';
      }
      return '';
    });
  }
  onSubmit() {
    const userData = {
      email: this.signInForm.value['email'],
      password: this.signInForm.value['password'],
      userName: this.signInForm.value['userName'],
    };
    this.userService.CreateUser(userData);
  }
}
