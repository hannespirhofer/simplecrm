import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../firebase-services/user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId: string = '';
  user: User = {} as User;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    })
    this.loadUser();
  }

  async loadUser() {
    if (this.userId) {
      const user = await this.userService.getSingleUser(this.userId);
      if (user) {
        this.user = user;
      } else {
        console.log('Document not found.');
      }
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
}
