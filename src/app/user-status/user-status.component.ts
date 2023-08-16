import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { UserStatus } from '../shared/user-status';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css'],
})
export class UserStatusComponent {
  @Input() UserData: UserStatus;
}
