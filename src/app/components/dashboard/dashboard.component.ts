import { UserService } from './../../firebase-services/user.service';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { LiveClockComponent } from '../live-clock/live-clock.component';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, LiveClockComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private userService: UserService) { }

  totalUsers?: Observable<number>;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userService.fetchUserCount();
    this.totalUsers = this.userService.userCount$;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userService.stopServiceListener();
  }

}
