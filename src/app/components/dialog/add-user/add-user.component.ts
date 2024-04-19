import { UserService } from './../../../firebase-services/user.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatInputModule,
    MatDialogTitle,
    MatFormFieldModule,
    MatFormField,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  user: User = new User({});
  birthDate: Date = new Date();
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    public userservice: UserService
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async saveUser() {
    this.loading = true;
    this.userservice.addUser(this.user)
      .then(() => {
        console.log('User added.');
        this.closeDialog();
      })
      .catch((e) => {
        console.error('An error happened: ', e);
      })
  }
}
