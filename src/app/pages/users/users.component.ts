import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { DialogUserComponent } from './dialog-user/dialog-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$!: User[];
  displayedColumns: string[] = [
    'fullname',
    'email',
    'gender',
    'birthdate',
    'admin',
    'actions',
  ];
  constructor(private usersServices: UsersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.usersServices
      .GetAllUsers()
      .subscribe((response) => (this.users$ = response));
  }

  addUser() {
    this.dialog.open(DialogUserComponent, {
      width: '50%',
      height: '50%',
    });
  }

  deleteUser(index: string) {
    alert(index);
  }

  editUser(index: string) {
    alert(index);
  }
}
