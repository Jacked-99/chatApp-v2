import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginVal = '';
  loginForm = new FormGroup({
    login: new FormControl('', [Validators.email, Validators.required]),
  });
  onSubmit() {
    console.log(this.loginForm.value);
  }
  checkValid(login: any) {
    if (!login.valid && login.touched) {
      return 'border-red-500';
    }
    return '';
  }
}
