import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$!: User[];
  displayedColumns: string[] = [
    'name',
    'email',
    'gender',
    'birthdate',
    'admin',
  ];
  constructor(private usersServices: UsersService) {}

  ngOnInit(): void {
    this.usersServices
      .GetAllUsers()
      .subscribe((response) => (this.users$ = response));
  }
}
