import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UserService } from '../../firebase-services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Subscription } from 'rxjs';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatFormField,
    MatDatepickerModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    CdkTextareaAutosize,
    TextFieldModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  private subscriptions: Subscription = new Subscription();

  userId: string = '';
  user: User = {} as User;
  loading = false;
  birthDate: Date = new Date();
  isEditMode: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    })
    this.loadUser();
  }

  loadUser() {
    if (this.userId) {
      this.userService.getSingleUser(this.userId);
      this.subscriptions.add(this.userService.user$.subscribe(user => {
        this.user = user;
      }))
    }
  }

  async deleteUser() {
    try {
      await this.userService.deleteUser(this.userId);
      this.router.navigateByUrl('/user');
    } catch (error) {
      console.log('Problem deleting the User document.');
    }
  }

  async saveUser() {
    try {
      await this.userService.updateUser(this.userId, this.user);
      console.log('User updated');
    } catch (error) {
      console.log('Problem updating the User document.');
    }
  }

  async saveNote() {
    await this.saveUser();
    this.isEditMode = false;
  }

  openDialog(): void {
    this.dialog.open(EditUserComponent, {
      data: {
        user: new User(this.userService.userToJSON(this.user)),
        userId: this.userId,
        loading: this.loading
      }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.unsubscribe();
  }
}
