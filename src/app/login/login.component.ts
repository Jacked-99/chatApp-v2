import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginVal = '';
  loginForm: FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
    });
  }
  constructor(private loginService: UserService, private router: Router) {}
  onSubmit() {
    console.log(this.loginForm.value);
    this.loginService.setUser(this.loginForm.value['login']);
    this.router.navigate(['']);
  }
  checkValid(login: any) {
    if (login.invalid && login.touched) {
      return 'border-red-500';
    }
    return '';
  }
}
