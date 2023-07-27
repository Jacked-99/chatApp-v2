import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loggedIn = false;
  constructor(private user: UserService, private route: Router) {}
  ngOnInit(): void {
    this.user.user != '' ? (this.loggedIn = true) : (this.loggedIn = false);
    // if (!this.loggedIn) {
    //   this.route.navigate(['login']);
    // }
  }
}
