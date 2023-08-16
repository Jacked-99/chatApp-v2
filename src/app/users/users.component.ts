import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Database, object, ref } from '@angular/fire/database';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  dataBase = inject(Database);
  objectSub: Subscription;
  usersStatus = [];

  ngOnInit(): void {
    this.objectSub = object(ref(this.dataBase, '/users/')).subscribe({
      next: (data) => {
        for (let key in data.snapshot.val()) {
          this.usersStatus.push(data.snapshot.val()[key]);
        }
        this.usersStatus.filter((x) => x.online);
        console.log(this.usersStatus);
      },
    });
  }
  ngOnDestroy(): void {
    this.objectSub.unsubscribe();
  }
}
