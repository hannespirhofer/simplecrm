import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../dialog/add-user/add-user.component';
import { User } from '../../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { UserService } from '../../firebase-services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatCardModule, CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {

  private usersSubscription: Subscription = new Subscription();

  users: User[] = [];

  constructor(public dialog: MatDialog, public userService: UserService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userService.getUserList(); //Call it once so users$ is active
    this.usersSubscription = this.userService.users$.subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.usersSubscription.unsubscribe();
    this.userService.stopUserListListener();
  }

  openDialog(): void {
    this.dialog.open(AddUserComponent)
  }
}
