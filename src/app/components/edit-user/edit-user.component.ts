import { Component, Inject } from '@angular/core';
import { User } from '../../../models/user.class';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UserService } from '../../firebase-services/user.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatProgressBarModule, MatButtonModule, MatDialogContent, MatDialogActions, MatDialogTitle, MatFormFieldModule, MatFormField, CommonModule, FormsModule, MatDatepickerModule, MatInputModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  userId: string = '';
  user: User = {} as User;
  loading = false;
  birthDate: Date = new Date();

  constructor(
    public userservice: UserService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user: User, loading: boolean, userId: string}) {
    this.userId = data.userId;
    this.user = data.user;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.birthDate = new Date(this.user.birthdate);
  }

  async saveUser() {
    this.user.birthdate = this.birthDate.getTime();
    this.loading = true;
    this.userservice.updateUser(this.userId, this.user)
      .then(() => {
        console.log('User updated.');
        this.closeDialog();
      })
      .catch((e) => {
        console.error('An error happened while updating: ', e);
      })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
