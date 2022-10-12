import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UtilsService } from 'src/app/services/utils.service';
import { usersData } from 'src/data/users';
import { DialogUserComponent } from './dialog-user/dialog-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$!: User[];
  dataSource: any = new MatTableDataSource([]);

  displayedColumns: string[] = [
    'fullname',
    'email',
    'gender',
    'birthdate',
    'admin',
    'actions',
  ];
  constructor(
    private dialog: MatDialog,
    private utils: UtilsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.users$ = usersData;
    this.dataSource.data = this.users$;
  }

  addUser() {
    const id = this.utils.guid();
    this.dialog
      .open(DialogUserComponent, {
        width: '50%',
        height: '50%',
      })
      .beforeClosed()
      .subscribe((resp) => {
        this.users$.push({ ...resp, id });
        this.dataSource.data = this.users$;
      });
  }

  deleteUser(index: string) {
    this.users$ = this.users$.filter((element) => element.id !== index);
    this.dataSource.data = this.users$;
    this._snackBar.open('The user was deleted!', '  ', {
      panelClass: ['snackbar--warning'],
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
    });
  }

  editUser(index: string) {
    let userToEdit = this.users$.find((element) => element.id === index);
    this.dialog.open(DialogUserComponent, {
      width: '50%',
      height: '50%',
      data: { userToEdit, action: 'Edit' },
    });
  }
}
