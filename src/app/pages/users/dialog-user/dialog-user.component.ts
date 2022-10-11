import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss'],
})
export class DialogUserComponent implements OnInit {
  formUser!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogUserComponent>
  ) {
    this.formUser = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.pattern('^[a-z]+@[a-z]+\\.[a-z]{2,3}$'),
        Validators.required,
      ]),
      gender: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      admin: new FormControl(false, []),
    });
  }

  ngOnInit(): void {}
  handleSubmitUser() {
    if (this.formUser.invalid) {
      this.formUser.markAllAsTouched();
      this._snackBar.open('Complete the required fields', '  ', {
        panelClass: ['snackbar--warning'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      return;
    }

    this.usersService
      .AddUser(this.formUser.value)
      .then((resp) => {
        resp &&
          this._snackBar.open('User added successfully', ' ', {
            panelClass: ['snackbar--success'],
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 3000,
          });
      })
      .catch((err) => {
        this._snackBar.open(`${err}`, ' ', {
          panelClass: ['snackbar--error'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
          duration: 3000,
        });
      });
    this.formUser.reset();
    this.dialogRef.close();
  }

  handleCancel(event: Event) {
    event.preventDefault();
    this.dialogRef.close();
  }
}
