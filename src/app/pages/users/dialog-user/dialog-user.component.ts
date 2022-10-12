import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss'],
})
export class DialogUserComponent implements OnInit {
  formUser!: FormGroup;
  labelDiaog: string = 'Add user';

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private datepipe: DatePipe,
    public dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userToEdit: User; action: string }
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

  ngOnInit(): void {
    this.formUser.patchValue(this.data.userToEdit);
    this.formUser.controls['birthdate'].setValue(
      this.datepipe.transform(this.data.userToEdit.birthdate, 'yyyy-MM-dd')
    );
    this.data.action === 'Edit'
      ? (this.labelDiaog = 'Edit user')
      : (this.labelDiaog = 'Add user');
  }
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

    this.dialogRef.close(this.formUser.value);
    if (this.data.action === 'Edit') {
      this._snackBar.open('User edited successfully', ' ', {
        panelClass: ['snackbar--success'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
    } else {
      this._snackBar.open('User added successfully', ' ', {
        panelClass: ['snackbar--success'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
    }

    this.formUser.reset();
  }

  handleCancel(event: Event) {
    event.preventDefault();
    this.dialogRef.close();
  }
}
